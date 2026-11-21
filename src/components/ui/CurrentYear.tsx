"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Shows the current year on the client; the static build uses a fixed fallback (never reads the clock). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
