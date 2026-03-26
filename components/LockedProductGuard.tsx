"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isCollectionUnlocked } from "@/lib/auth";

interface Props {
  lockedByCollection: string | null;
  children: ReactNode;
}

export default function LockedProductGuard({ lockedByCollection, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(!lockedByCollection); // public products show immediately

  useEffect(() => {
    if (!lockedByCollection) return;
    if (isCollectionUnlocked(lockedByCollection)) {
      setAllowed(true);
    } else {
      router.replace(`/unlock/${lockedByCollection}?next=${pathname}`);
      // stay hidden — redirect in progress
    }
  }, [lockedByCollection, router, pathname]);

  if (!allowed) return null; // blank while checking / redirecting

  return <>{children}</>;
}
