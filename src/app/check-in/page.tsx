"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { TornPaper } from "@/components/torn-paper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafetyPin } from "@/components/safety-pin";

export default function CheckInPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const ticketId = formData.get("ticketId");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Invalid ticket ID");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20 p-4">
        <TornPaper>
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="mt-4 font-mono text-2xl font-black uppercase">
              Check-in Successful!
            </h1>
            <p className="mt-2 font-mono">You&apos;re all set for the event.</p>
          </div>
        </TornPaper>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20 p-4">
      <TornPaper>
        <div className="relative w-full max-w-md">
          <div className="absolute -right-2 -top-2">
            <SafetyPin />
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="font-mono text-2xl font-black uppercase tracking-tight">
                Self Check-in
              </h1>
              <p className="font-mono text-sm">
                Enter your ticket ID to check in to the event
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticketId" className="font-mono uppercase">
                  Ticket ID
                </Label>
                <Input
                  id="ticketId"
                  name="ticketId"
                  placeholder="Enter your ticket ID"
                  className="font-mono"
                  required
                />
              </div>

              {error && (
                <p className="font-mono text-sm text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full border-2 border-black bg-black font-mono uppercase hover:bg-white hover:text-black disabled:opacity-50"
              >
                {status === "loading" ? "Checking in..." : "Check in"}
              </Button>
            </div>
          </form>
        </div>
      </TornPaper>
    </div>
  );
}
