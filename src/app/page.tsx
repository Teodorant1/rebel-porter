"use client";

import Dashboard from "@/components/dashboard";
import CheckIn_component from "@/components/check-in/check-in";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="h-screen w-screen">
      {session?.user.isAdmin === true ? (
        <>
          <CheckIn_component /> <Dashboard />
        </>
      ) : (
        <Link
          className="m-5 h-full w-full bg-red-600 p-5 text-white"
          href={"/api/auth/signin"}
        >
          ACCESS DENIED, CLICK HERE TO LOGIN
        </Link>
      )}
    </div>
  );
}

export default Page;
