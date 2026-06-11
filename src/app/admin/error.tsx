"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin area error:", error);
  }, [error]);

  return (
    <div className="p-8 glass-card border border-red-500/30 flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-bold text-red-500">Something went wrong in the Admin Panel!</h2>
      <p className="text-gray-300 font-mono text-sm break-all">{error.message}</p>
      {error.digest && <p className="text-gray-500 text-xs">Digest: {error.digest}</p>}
      <Button onClick={() => reset()} className="bg-red-500/20 text-red-500 hover:bg-red-500/40">
        Try again
      </Button>
    </div>
  );
}
