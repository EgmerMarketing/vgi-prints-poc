"use client";

const STORAGE_PREFIX = "vgi_unlock_";

export function isCollectionUnlocked(handle: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`${STORAGE_PREFIX}${handle}`) === "true";
}

export function unlockCollection(handle: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_PREFIX}${handle}`, "true");
}
