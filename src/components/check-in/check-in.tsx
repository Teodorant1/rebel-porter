"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { TornPaper } from "@/components/torn-paper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafetyPin } from "@/components/safety-pin";
import { api } from "@/trpc/react";

export default function CheckIn_component() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");
  // const [error, setError] = useState("");
  const utils = api.useUtils();

  const add_student_arrival = api.post.add_student_arrival.useMutation({
    onSuccess: async (e) => {
      if (e?.error === true) {
        setIsError(true);
        setErrorText(e.error_description ?? "an Error occured");
      } else {
        setStatus("success");
      }

      await utils.post.invalidate();
    },
  });

  function handle_add_student_arrival() {
    setStatus("loading");
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const surname = (document.getElementById("surname") as HTMLInputElement)
      .value;
    const major = (document.getElementById("major") as HTMLInputElement).value;
    const year = (document.getElementById("year") as HTMLInputElement).value;
    const index = (document.getElementById("index") as HTMLInputElement).value;

    add_student_arrival.mutate({
      name: name,
      surname: surname,
      major: major,
      year: year,
      index: index,
    });
  }

  // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  // event.preventDefault();
  // setStatus("loading");
  // const formData = new FormData(event.currentTarget);
  // const ticketId = formData.get("ticketId");
  // try {
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   setStatus("success");
  // } catch (err) {
  //   console.log(err);
  //   setStatus("error");
  //   setError("Invalid ticket ID");
  // }
  // }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20 p-4">
        <TornPaper>
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="mt-4 font-mono text-2xl font-black uppercase">
              Check-in Successful!
            </h1>
            <button
              onClick={() => {
                setStatus("idle");
              }}
              className="m-5 bg-black p-5 text-white"
            >
              ADD ANOTHER ONE
            </button>
          </div>
        </TornPaper>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20 p-4">
      <TornPaper>
        <div className="relative w-full max-w-md">
          <div className="absolute -right-2 -top-2">
            <SafetyPin />
          </div>
          <div className="space-y-6">
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
                <Label htmlFor="name" className="font-mono uppercase">
                  name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  className="font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname" className="font-mono uppercase">
                  surname
                </Label>
                <Input
                  id="surname"
                  name="surname"
                  placeholder="Enter surname"
                  className="font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major" className="font-mono uppercase">
                  major
                </Label>
                <Input
                  id="major"
                  name="major"
                  placeholder="Enter major"
                  className="font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="index" className="font-mono uppercase">
                  index
                </Label>
                <Input
                  id="index"
                  name="index"
                  placeholder="Enter index"
                  className="font-mono"
                  required
                />
              </div>{" "}
              <div className="space-y-2">
                <Label htmlFor="year" className="font-mono uppercase">
                  year
                </Label>
                <Input
                  id="year"
                  name="year"
                  placeholder="Enter year"
                  className="font-mono"
                  required
                />
              </div>
              {isError && (
                <button
                  onClick={() => {
                    setIsError(false);
                  }}
                  className="m-5 bg-red-700 p-5 font-mono text-sm text-white"
                >
                  {errorText}
                </button>
              )}
              <Button
                disabled={status === "loading"}
                onClick={() => {
                  handle_add_student_arrival();
                }}
                className="w-full border-2 border-black bg-black font-mono uppercase hover:bg-white hover:text-black disabled:opacity-50"
              >
                {status === "loading" ? "Checking in..." : "Check in"}
              </Button>
            </div>
          </div>
        </div>
      </TornPaper>
    </div>
  );
}
