import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bg-cart-v1";

// Parse "13,00" or "35,00 / kg" into a number (null for non-numeric-per-unit)
export function parsePrice(price) {
  if (!price) return null;
  if (price.includes("/")) return null; // al kg — non sommabile
  const num = parseFloat(price.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(num) ? num : null;
}

export function formatPrice(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload || [];
    case "ADD": {
      const existing = state.find((i) => i.name === action.item.name);
      if (existing) {
        return state.map((i) =>
          i.name === action.item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...state,
        {
          name: action.item.name,
          price: action.item.price,
          priceNum: parsePrice(action.item.price),
          qty: 1,
          note: "",
        },
      ];
    }
    case "INC":
      return state.map((i) =>
        i.name === action.name ? { ...i, qty: i.qty + 1 } : i
      );
    case "DEC":
      return state
        .map((i) =>
          i.name === action.name ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.name !== action.name);
    case "SET_NOTE":
      return state.map((i) =>
        i.name === action.name ? { ...i, note: action.note } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
    } catch (e) {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const add = useCallback((item) => dispatch({ type: "ADD", item }), []);
  const inc = useCallback((name) => dispatch({ type: "INC", name }), []);
  const dec = useCallback((name) => dispatch({ type: "DEC", name }), []);
  const remove = useCallback((name) => dispatch({ type: "REMOVE", name }), []);
  const setNote = useCallback(
    (name, note) => dispatch({ type: "SET_NOTE", name, note }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );

  const total = useMemo(
    () =>
      items.reduce(
        (s, i) => s + (i.priceNum !== null ? i.priceNum * i.qty : 0),
        0
      ),
    [items]
  );

  const hasKgItems = useMemo(
    () => items.some((i) => i.priceNum === null),
    [items]
  );

  const getQty = useCallback(
    (name) => {
      const f = items.find((i) => i.name === name);
      return f ? f.qty : 0;
    },
    [items]
  );

  const value = useMemo(
    () => ({ items, add, inc, dec, remove, setNote, clear, count, total, hasKgItems, getQty }),
    [items, add, inc, dec, remove, setNote, clear, count, total, hasKgItems, getQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
