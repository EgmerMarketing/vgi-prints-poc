"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { getCollectionByHandle } from "@/lib/mock-data";
import { isCollectionUnlocked, unlockCollection } from "@/lib/auth";

export default function UnlockPage() {
  const { handle } = useParams<{ handle: string }>();
  const router = useRouter();
  const collection = getCollectionByHandle(handle);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (collection && isCollectionUnlocked(handle)) {
      router.replace(`/collections/${handle}`);
    }
  }, [handle, collection, router]);

  if (!collection) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-[#1A1A1A]">Store not found</h1>
          <p className="text-gray-500 mt-2">This school store doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === collection!.passcode) {
      unlockCollection(handle);
      router.push(`/collections/${handle}`);
    } else {
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
    }
  }

  return (
    <div className="flex items-center justify-center py-20 px-4 bg-[#F5F3EF] min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-6">
          <span className="font-heading text-3xl font-bold tracking-wider text-[#1A1A1A]">
            v<span className="text-[#D35400]">.</span>g
            <span className="text-[#D35400]">.</span>i
          </span>
        </div>

        <div className="w-16 h-16 bg-[#F5F3EF] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-[#D35400]" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">
          {collection.name}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D35400] focus:border-transparent text-center text-lg tracking-widest"
          />

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#D35400] hover:bg-[#b84700] text-white font-bold py-3 rounded-lg transition-colors"
          >
            Unlock Store
          </button>
        </form>
      </div>
    </div>
  );
}
