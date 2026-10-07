// Weekly hours for Burger & Grill Camucia
const minutes = (h, m = 0) => h * 60 + m;

const STANDARD_DAY = {
  lunch: { open: minutes(12), close: minutes(14) },
  dinner: { open: minutes(18), close: minutes(23) },
};

export const WEEKLY_HOURS = {
  0: STANDARD_DAY,
  1: STANDARD_DAY,
  2: STANDARD_DAY,
  3: STANDARD_DAY,
  4: STANDARD_DAY,
  5: STANDARD_DAY,
  6: STANDARD_DAY,
};

function fmt(totalMin) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// The restaurant runs on Italian time: a visitor whose device is set to another
// time zone must still see the real open/closed status and pickup slots.
const RESTAURANT_TZ = "Europe/Rome";
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function restaurantClock(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: RESTAURANT_TZ,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => (parts.find((p) => p.type === type) || {}).value;
    const day = WEEKDAY_INDEX[get("weekday")];
    const hour = Number(get("hour"));
    const minute = Number(get("minute"));
    if (day === undefined || Number.isNaN(hour) || Number.isNaN(minute)) throw new Error("tz");
    return { day, minutes: hour * 60 + minute };
  } catch (e) {
    // Very old browsers without time-zone support: fall back to device time.
    return { day: now.getDay(), minutes: now.getHours() * 60 + now.getMinutes() };
  }
}

export function computeOpenStatus(now = new Date()) {
  const { day, minutes: cur } = restaurantClock(now);
  const today = WEEKLY_HOURS[day];
  if (!today) return { open: false, nextOpen: null, sameDay: false };

  for (const window of [today.lunch, today.dinner]) {
    if (window && cur >= window.open && cur < window.close) {
      return {
        open: true,
        current: window,
        closesAt: fmt(window.close),
      };
    }
  }

  if (today.lunch && cur < today.lunch.open) {
    return { open: false, nextOpen: fmt(today.lunch.open), sameDay: true };
  }
  if (today.dinner && cur < today.dinner.open) {
    return { open: false, nextOpen: fmt(today.dinner.open), sameDay: true };
  }
  const nextDay = WEEKLY_HOURS[(day + 1) % 7];
  if (nextDay && nextDay.lunch) {
    return { open: false, nextOpen: fmt(nextDay.lunch.open), sameDay: false };
  }
  return { open: false, nextOpen: null, sameDay: false };
}

/**
 * Returns pickup groups by service window, with 30-minute slots.
 * Slots are selectable even when the restaurant is closed (customer plans ahead).
 * Structure:
 *  [
 *    { meal: "lunch", dayOffset: 0, slots: [{ id, label, mins, dayOffset }] },
 *    { meal: "dinner", dayOffset: 0, slots: [...] },
 *  ]
 */
export function getPickupPlan(now = new Date()) {
  const { day, minutes: cur } = restaurantClock(now);
  const today = WEEKLY_HOURS[day];
  if (!today) return { groups: [] };

  const buildSlots = (window, meal, dayOffset) => {
    const slots = [];
    let start = window.open;
    if (dayOffset === 0) {
      // start at least 30 min from now, rounded up to :00 or :30
      const earliest = cur + 30;
      start = Math.max(window.open, Math.ceil(earliest / 30) * 30);
    }
    for (let m = start; m <= window.close - 10; m += 30) {
      slots.push({
        id: `d${dayOffset}-${meal}-${m}`,
        label: fmt(m),
        mins: m,
        meal,
        dayOffset,
      });
    }
    return { meal, dayOffset, slots };
  };

  const groups = [];
  const afterDinner = today.dinner && cur >= today.dinner.close;

  if (!afterDinner) {
    if (today.lunch && cur < today.lunch.close) {
      const g = buildSlots(today.lunch, "lunch", 0);
      if (g.slots.length) groups.push(g);
    }
    if (today.dinner) {
      const g = buildSlots(today.dinner, "dinner", 0);
      if (g.slots.length) groups.push(g);
    }
  }

  // No slot left today (after dinner, or late evening when the last slot is
  // already less than 30 minutes away): offer tomorrow's slots instead.
  if (groups.length === 0) {
    const tomorrow = WEEKLY_HOURS[(day + 1) % 7];
    if (tomorrow) {
      if (tomorrow.lunch) {
        const g = buildSlots(tomorrow.lunch, "lunch", 1);
        if (g.slots.length) groups.push(g);
      }
      if (tomorrow.dinner) {
        const g = buildSlots(tomorrow.dinner, "dinner", 1);
        if (g.slots.length) groups.push(g);
      }
    }
  }

  return { groups };
}
