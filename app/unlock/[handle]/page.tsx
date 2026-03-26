"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { getCollectionByHandle } from "@/lib/mock-data";
import { isCollectionUnlocked, unlockCollection } from "@/lib/auth";

export default function UnlockPage() {
  const { handle } = useParams<{ handle: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const collection = getCollectionByHandle(handle);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (collection && isCollectionUnlocked(handle)) {
      router.replace(next ?? `/collections/${handle}`);
    }
  }, [handle, collection, router, next]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-white">Store not found</h1>
          <p className="text-[#888888] mt-2">This school store doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === collection!.passcode) {
      unlockCollection(handle);
      router.push(next ?? `/collections/${handle}`);
    } else {
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-20">
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 sm:p-12 w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vgi-logo.png" alt="VGI Prints" className="h-8 w-auto" />
        </div>

        <div className="w-16 h-16 bg-[#1E1E1E] border border-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-[#E85D26]" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-white mb-2">
          {collection.name}
        </h1>
        <p className="text-[#888888] text-sm mb-8">
          This store is passcode-protected. Enter your code to access exclusive gear.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError("");
            }}
            placeholder="Enter passcode"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D26] focus:border-transparent text-center text-lg tracking-widest text-white placeholder:text-[#888888]"
          />

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#E85D26] hover:bg-[#c94d1e] text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            Unlock Store
          </button>
        </form>
      </div>
    </div>
  );
}
