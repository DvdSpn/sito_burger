// Weekly hours for Burger & Grill Camucia
// Days: 0=Sun, 1=Mon, ... 6=Sat (JS Date.getDay())
// Each day has optional "lunch" and "dinner" windows in minutes from midnight.
const minutes = (h, m = 0) => h * 60 + m;

// User-confirmed: Pranzo 12:00-14:00 · Cena 18:00-23:00, every day
const STANDARD_DAY = {
  lunch: { open: minutes(12), close: minutes(14) },
  dinner: { open: minutes(18), close: minutes(23) },
};

export const WEEKLY_HOURS = {
  0: STANDARD_DAY, // Sun
  1: STANDARD_DAY, // Mon
  2: STANDARD_DAY, // Tue
  3: STANDARD_DAY, // Wed
  4: STANDARD_DAY, // Thu
  5: STANDARD_DAY, // Fri
  6: STANDARD_DAY, // Sat
};

function fmt(totalMin) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function computeOpenStatus(now = new Date()) {
  const day = now.getDay();
  const cur = now.getHours() * 60 + now.getMinutes();
  const today = WEEKLY_HOURS[day];
  if (!today) return { open: false, nextOpen: null, nextOpenDay: null, current: null };

  // Currently open?
  for (const window of [today.lunch, today.dinner]) {
    if (window && cur >= window.open && cur < window.close) {
      return {
        open: true,
        current: window,
        closesAt: fmt(window.close),
      };
    }
  }

  // Find next opening (today or tomorrow)
  if (today.lunch && cur < today.lunch.open) {
    return { open: false, nextOpen: fmt(today.lunch.open), sameDay: true };
  }
  if (today.dinner && cur < today.dinner.open) {
    return { open: false, nextOpen: fmt(today.dinner.open), sameDay: true };
  }
  // After dinner: next is tomorrow's lunch
  const nextDay = WEEKLY_HOURS[(day + 1) % 7];
  if (nextDay && nextDay.lunch) {
    return {
      open: false,
      nextOpen: fmt(nextDay.lunch.open),
      sameDay: false,
    };
  }
  return { open: false, nextOpen: null };
}

// Generate pickup time slots: "Prima possibile" + every 15min from now+20min until end of current service
export function getPickupSlots(now = new Date()) {
  const slots = [{ id: "asap", label: "__ASAP__", mins: null }];
  const status = computeOpenStatus(now);
  const day = now.getDay();
  const today = WEEKLY_HOURS[day];
  if (!today) return slots;

  const cur = now.getHours() * 60 + now.getMinutes();
  // Determine active window (current or next same-day)
  let window = null;
  if (status.open) window = status.current;
  else if (today.dinner && cur < today.dinner.open && cur >= (today.lunch ? today.lunch.close : 0)) {
    window = today.dinner;
  } else if (today.lunch && cur < today.lunch.open) {
    window = today.lunch;
  } else if (today.dinner && cur < today.dinner.open) {
    window = today.dinner;
  }

  if (!window) return slots;

  const startFrom = Math.max(cur + 20, window.open);
  // round up to next 15min
  const rounded = Math.ceil(startFrom / 15) * 15;
  for (let m = rounded; m <= window.close - 10; m += 15) {
    slots.push({ id: `t-${m}`, label: fmt(m), mins: m });
  }
  return slots;
}
