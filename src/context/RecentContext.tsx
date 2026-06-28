"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "ampario.recent";
const MAX_RECENT = 8;

interface RecentContextValue {
  recent: string[];
  track: (id: string) => void;
}

const RecentContext = createContext<RecentContextValue | undefined>(undefined);

export function RecentProvider({ children }: { children: ReactNode }) {
  const [recent, setRecent] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const track = useCallback((id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <RecentContext.Provider value={{ recent: hydrated ? recent : [], track }}>
      {children}
    </RecentContext.Provider>
  );
}

export function useRecent() {
  const ctx = useContext(RecentContext);
  if (!ctx) throw new Error("useRecent must be used within a RecentProvider");
  return ctx;
}
