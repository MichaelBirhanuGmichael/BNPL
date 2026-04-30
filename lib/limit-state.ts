"use client";

import { useEffect, useState } from "react";

const LIMIT_KEY = "mereq_available_limit";
const DEFAULT_LIMIT = 1000;
const LIMIT_EVENT = "mereq-limit-updated";

function readLimit(): number {
  if (typeof window === "undefined") return DEFAULT_LIMIT;
  const raw = window.localStorage.getItem(LIMIT_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIMIT;
}

function emitLimitUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LIMIT_EVENT));
}

export function setAvailableLimit(next: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIMIT_KEY, String(next));
  emitLimitUpdate();
}

export function increaseAvailableLimit(delta: number) {
  const current = readLimit();
  const next = current + delta;
  setAvailableLimit(next);
}

export function useAvailableLimit() {
  const [availableLimit, setAvailableLimitState] = useState<number>(DEFAULT_LIMIT);

  useEffect(() => {
    setAvailableLimitState(readLimit());

    const refresh = () => setAvailableLimitState(readLimit());
    window.addEventListener("storage", refresh);
    window.addEventListener(LIMIT_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(LIMIT_EVENT, refresh);
    };
  }, []);

  return availableLimit;
}
