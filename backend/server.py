from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# === Reviews (Google Places API) ===

class Author(BaseModel):
    displayName: str
    photoUri: Optional[str] = None
    uri: Optional[str] = None


class GoogleReview(BaseModel):
    authorAttribution: Author
    rating: int
    relativeTimeDescription: Optional[str] = None
    text: Optional[str] = None
    language: Optional[str] = None


class ReviewsResponse(BaseModel):
    source: str  # "google" | "fallback"
    rating: Optional[float] = None
    userRatingCount: Optional[int] = None
    displayName: Optional[str] = None
    reviews: List[GoogleReview] = []
    cached: bool = False
    error: Optional[str] = None


_reviews_cache = {"data": None, "expires_at": 0}
_CACHE_TTL = 60 * 60 * 6  # 6 hours


async def _fetch_google_reviews(place_id: str, api_key: str) -> ReviewsResponse:
    """Call Google Places API (New) for a place."""
    url = f"https://places.googleapis.com/v1/places/{place_id}"
    headers = {
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": (
            "displayName,rating,userRatingCount,reviews"
        ),
        "Content-Type": "application/json",
    }
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: requests.get(url, headers=headers, timeout=10),
    )
    if response.status_code != 200:
        return ReviewsResponse(
            source="fallback",
            error=f"Google Places API status {response.status_code}: {response.text[:200]}",
        )
    data = response.json()
    reviews = []
    for r in data.get("reviews", []) or []:
        author = r.get("authorAttribution") or {}
        text_field = r.get("text") or {}
        text_value = text_field.get("text") if isinstance(text_field, dict) else text_field
        reviews.append(
            GoogleReview(
                authorAttribution=Author(
                    displayName=author.get("displayName", "Anonymous"),
                    photoUri=author.get("photoUri"),
                    uri=author.get("uri"),
                ),
                rating=int(r.get("rating") or 0),
                relativeTimeDescription=r.get("relativePublishTimeDescription"),
                text=text_value,
                language=(text_field.get("languageCode") if isinstance(text_field, dict) else None),
            )
        )
    display_name = (data.get("displayName") or {}).get("text")
    return ReviewsResponse(
        source="google",
        rating=data.get("rating"),
        userRatingCount=data.get("userRatingCount"),
        displayName=display_name,
        reviews=reviews,
    )


@api_router.get("/reviews", response_model=ReviewsResponse)
async def get_reviews(place_id: Optional[str] = Query(default=None)):
    """Fetch Google reviews (cached). Falls back gracefully when API key is missing."""
    api_key = os.environ.get("GOOGLE_PLACES_API_KEY", "").strip()
    resolved_place_id = (place_id or os.environ.get("GOOGLE_PLACE_ID", "")).strip()

    # No API key → return fallback marker, frontend will show mock reviews
    if not api_key or not resolved_place_id:
        return ReviewsResponse(
            source="fallback",
            error="GOOGLE_PLACES_API_KEY or place_id not configured",
        )

    now = time.time()
    if _reviews_cache["data"] is not None and _reviews_cache["expires_at"] > now:
        cached_resp: ReviewsResponse = _reviews_cache["data"]
        return cached_resp.model_copy(update={"cached": True})

    result = await _fetch_google_reviews(resolved_place_id, api_key)
    if result.source == "google":
        _reviews_cache["data"] = result
        _reviews_cache["expires_at"] = now + _CACHE_TTL
    return result


# === Existing routes ===

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
