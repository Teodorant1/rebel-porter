import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import AuthProvider from "./_components/auth/Provider";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "REBEL-PORTER",
  description: "PORTER-PAGE for VTSNS Blockade",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <AuthProvider>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
