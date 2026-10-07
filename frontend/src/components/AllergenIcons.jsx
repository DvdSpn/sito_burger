import { ALLERGENS } from "../data/allergens";

// Plain-text allergen list — replaces the old pill+tooltip pattern.
// Rendered inline inside MenuItem.
export default function AllergenIcons({ allergens, lang = "it" }) {
  if (!allergens || allergens.length === 0) return null;
  const labels = allergens
    .map((id) => {
      const meta = ALLERGENS[id];
      if (!meta) return null;
      return meta[lang] || meta.it;
    })
    .filter(Boolean);
  if (labels.length === 0) return null;
  return (
    <span data-testid="allergen-list" className="text-stone-300">
      {labels.join(" · ")}
    </span>
  );
}
