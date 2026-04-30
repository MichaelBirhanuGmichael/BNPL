"use client";

import { useEffect, useState } from "react";

const KEY = "mereq_credit_builder_progress";
const EVENT = "mereq-credit-builder-updated";

type CreditBuilderProgress = {
  transactionsCurrent: number;
  volumeCurrent: number;
};

const DEFAULT_PROGRESS: CreditBuilderProgress = {
  transactionsCurrent: 1,
  volumeCurrent: 400,
};

function readProgress(): CreditBuilderProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as CreditBuilderProgress;
    if (typeof parsed.transactionsCurrent !== "number" || typeof parsed.volumeCurrent !== "number") {
      return DEFAULT_PROGRESS;
    }
    return {
      transactionsCurrent: Math.max(0, parsed.transactionsCurrent),
      volumeCurrent: Math.max(0, parsed.volumeCurrent),
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function emitUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT));
}

export function setCreditBuilderProgress(next: CreditBuilderProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emitUpdate();
}

export function markPayInFullCredit(totalPrice: number) {
  const current = readProgress();
  const next: CreditBuilderProgress = {
    transactionsCurrent: Math.min(current.transactionsCurrent + 1, 3),
    volumeCurrent: Math.min(current.volumeCurrent + Math.round(totalPrice), 1000),
  };
  setCreditBuilderProgress(next);
}

export function useCreditBuilderProgress() {
  const [progress, setProgress] = useState<CreditBuilderProgress>(DEFAULT_PROGRESS);

  useEffect(() => {
    setProgress(readProgress());
    const refresh = () => setProgress(readProgress());
    window.addEventListener("storage", refresh);
    window.addEventListener(EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVENT, refresh);
    };
  }, []);

  return progress;
}
