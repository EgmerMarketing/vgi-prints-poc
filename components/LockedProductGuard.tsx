"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isCollectionUnlocked } from "@/lib/auth";

interface Props {
  lockedByCollection: string | null; // collection handle that locks this product, or null if public
}

export default function LockedProductGuard({ lockedByCollection }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!lockedByCollection) return;
    if (!isCollectionUnlocked(lockedByCollection)) {
      router.replace(`/unlock/${lockedByCollection}?next=/products/${window.location.pathname.split("/products/")[1]}`);
    }
  }, [lockedByCollection, router]);

  return null; // renders nothing — just enforces the redirect
}
