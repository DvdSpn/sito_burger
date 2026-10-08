// Weekly hours for Burger & Grill Camucia
const minutes = (h, m = 0) => h * 60 + m;

// Orari reali: lunedì chiuso; martedì–sabato pranzo e cena; domenica solo cena.
const LUNCH = { open: minutes(12), close: minutes(14) };
const DINNER = { open: minutes(18, 30), close: minutes(22, 30) };

// 0 = domenica … 6 = sabato. Un giorno senza finestre è un giorno di chiusura.
export const WEEKLY_HOURS = {
  0: { dinner: DINNER },
  1: {},
  2: { lunch: LUNCH, dinner: DINNER },
  3: { lunch: LUNCH, dinner: DINNER },
  4: { lunch: LUNCH, dinner: DINNER },
  5: { lunch: LUNCH, dinner: DINNER },
  6: { lunch: LUNCH, dinner: DINNER },
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

// Finestre di apertura del giorno, in ordine (pranzo, cena); vuoto se chiuso.
const windowsOf = (day) => {
  const d = WEEKLY_HOURS[day];
  return d ? [d.lunch, d.dinner].filter(Boolean) : [];
};

export function computeOpenStatus(now = new Date()) {
  const { day, minutes: cur } = restaurantClock(now);

  for (const w of windowsOf(day)) {
    if (cur >= w.open && cur < w.close) {
      return { open: true, current: w, closesAt: fmt(w.close) };
    }
  }

  const later = windowsOf(day).find((w) => cur < w.open);
  if (later) {
    return { open: false, nextOpen: fmt(later.open), sameDay: true, dayOffset: 0, nextDay: day };
  }

  // Prossima apertura nei giorni successivi (salta i giorni di chiusura).
  for (let offset = 1; offset <= 7; offset += 1) {
    const d = (day + offset) % 7;
    const first = windowsOf(d)[0];
    if (first) {
      return {
        open: false,
        nextOpen: fmt(first.open),
        sameDay: false,
        dayOffset: offset,
        nextDay: d,
      };
    }
  }
  return { open: false, nextOpen: null, sameDay: false };
}

/** Giorno della settimana (0 = domenica) di oggi + offset, ora di Roma. */
export function weekdayForOffset(offset, now = new Date()) {
  return (restaurantClock(now).day + offset) % 7;
}

/** Righe di orario da mostrare nel sito (Contatti, footer). */
export function hoursLines(t) {
  const range = (w) => `${fmt(w.open)} – ${fmt(w.close)}`;
  return [
    `${t("hours.tueSat")} · ${range(LUNCH)} / ${range(DINNER)}`,
    `${t("hours.sun")} · ${range(DINNER)}`,
    `${t("hours.mon")} · ${t("hours.closed")}`,
  ];
}

/**
 * Returns pickup groups by service window, with 30-minute slots.
 * Slots are selectable even when the restaurant is closed (customer plans ahead).
 * If nothing is left today (or today is a closing day), the next open day is offered.
 * Structure:
 *  [
 *    { meal: "lunch", dayOffset: 0, slots: [{ id, label, mins, dayOffset }] },
 *    { meal: "dinner", dayOffset: 0, slots: [...] },
 *  ]
 */
export function getPickupPlan(now = new Date()) {
  const { day, minutes: cur } = restaurantClock(now);

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

  const groupsFor = (d, dayOffset) => {
    const hours = WEEKLY_HOURS[d];
    if (!hours) return [];
    return [
      ["lunch", hours.lunch],
      ["dinner", hours.dinner],
    ]
      .filter(([, w]) => w)
      .map(([meal, w]) => buildSlots(w, meal, dayOffset))
      .filter((g) => g.slots.length);
  };

  let groups = groupsFor(day, 0);
  for (let offset = 1; groups.length === 0 && offset <= 7; offset += 1) {
    groups = groupsFor((day + offset) % 7, offset);
  }
  return { groups };
}
