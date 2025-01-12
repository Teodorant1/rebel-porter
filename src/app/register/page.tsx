"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TornPaper } from "@/components/torn-paper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafetyPin } from "@/components/safety-pin";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const ticketId = formData.get("ticketId");

    // This is where youd validate against your actual ticket database
    if (!email || !ticketId) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/check-in");
    } catch (err) {
      setError("Invalid ticket information");
    }
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
                Register Ticket
              </h1>
              <p className="font-mono text-sm">
                Enter your ticket details to register for the event
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

              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono uppercase">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="font-mono"
                  required
                />
              </div>

              {error && (
                <p className="font-mono text-sm text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full border-2 border-black bg-black font-mono uppercase hover:bg-white hover:text-black"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </TornPaper>
    </div>
  );
}
