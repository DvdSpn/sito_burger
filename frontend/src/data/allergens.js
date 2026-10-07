// Allergen definitions — subset relevant to the menu
// Standard EU 14 allergens, only what's applicable
export const ALLERGENS = {
  gluten: { it: "Glutine", en: "Gluten", symbol: "G" },
  lactose: { it: "Latte", en: "Milk", symbol: "L" },
  eggs: { it: "Uova", en: "Eggs", symbol: "U" },
  soy: { it: "Soia", en: "Soy", symbol: "S" },
  mustard: { it: "Senape", en: "Mustard", symbol: "Sn" },
  sesame: { it: "Sesamo", en: "Sesame", symbol: "Se" },
  sulphites: { it: "Solfiti", en: "Sulphites", symbol: "So" },
  nuts: { it: "Frutta a guscio", en: "Tree nuts", symbol: "N" },
  celery: { it: "Sedano", en: "Celery", symbol: "Ce" },
};

export const ALLERGEN_ORDER = [
  "gluten",
  "lactose",
  "eggs",
  "soy",
  "mustard",
  "sesame",
  "sulphites",
  "nuts",
  "celery",
];
