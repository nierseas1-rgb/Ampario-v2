"use client";

import { useEffect } from "react";
import { useRecent } from "@/context/RecentContext";

export function TrackView({ id }: { id: string }) {
  const { track } = useRecent();
  useEffect(() => {
    track(id);
  }, [id, track]);
  return null;
}
