"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

const MAX_COMPARE = 3;
const STORAGE_KEY = "ampario.compare";

interface CompareContextValue {
  items: string[];
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => boolean; // retourne true si ajouté, false si retiré/refusé
  remove: (id: string) => void;
  clear: () => void;
  max: number;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isComparing = useCallback(
    (id: string) => items.includes(id),
    [items]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      let added = false;
      setItems((prev) => {
        if (prev.includes(id)) return prev.filter((i) => i !== id);
        if (prev.length >= MAX_COMPARE) return prev;
        added = true;
        return [...prev, id];
      });
      return added;
    },
    []
  );

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i !== id)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider
      value={{
        items,
        isComparing,
        toggleCompare,
        remove,
        clear,
        max: MAX_COMPARE,
        isFull: items.length >= MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
