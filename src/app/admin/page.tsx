"use client";

import { useState } from "react";
import { BarChart3, Search, Users } from "lucide-react";
import { TornPaper } from "@/components/torn-paper";
import { Input } from "@/components/ui/input";
import { SafetyPin } from "@/components/safety-pin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const USERS = [
  {
    id: "1",
    email: "john@example.com",
    ticketId: "TIX001",
    status: "registered",
  },
  {
    id: "2",
    email: "jane@example.com",
    ticketId: "TIX002",
    status: "checked-in",
  },
  // Add more mock users as needed
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = USERS.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ticketId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-center justify-between">
          <div className="relative">
            <h1 className="font-mono text-3xl font-black uppercase tracking-tight">
              Admin Dashboard
            </h1>
            <div className="absolute -right-4 -top-2">
              <SafetyPin />
            </div>
          </div>
        </header>

        <TornPaper>
          <Tabs defaultValue="attendees" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 gap-4 bg-transparent">
              <TabsTrigger
                value="attendees"
                className="border-2 border-black bg-black font-mono data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <Users className="mr-2 h-4 w-4" />
                Attendees
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="border-2 border-black bg-black font-mono data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attendees" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                <Input
                  placeholder="Search by email or ticket ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="rounded-sm border-2 border-black">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-mono uppercase">
                        Email
                      </TableHead>
                      <TableHead className="font-mono uppercase">
                        Ticket ID
                      </TableHead>
                      <TableHead className="font-mono uppercase">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="group hover:bg-black/5"
                      >
                        <TableCell className="font-mono">
                          {user.email}
                        </TableCell>
                        <TableCell className="font-mono">
                          {user.ticketId}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block rounded-sm border-2 border-black px-2 py-0.5 font-mono text-sm uppercase ${
                              user.status === "registered"
                                ? "bg-yellow-500"
                                : user.status === "checked-in"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                            } `}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="space-y-4">
                <TornPaper>
                  <div className="space-y-2">
                    <h3 className="font-mono text-lg font-bold uppercase">
                      Today&apos;s Stats
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="font-mono text-sm uppercase text-gray-600">
                          Total Check-ins
                        </p>
                        <p className="font-mono text-2xl font-bold">156</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-sm uppercase text-gray-600">
                          Pending
                        </p>
                        <p className="font-mono text-2xl font-bold">43</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-sm uppercase text-gray-600">
                          Issues
                        </p>
                        <p className="font-mono text-2xl font-bold">2</p>
                      </div>
                    </div>
                  </div>
                </TornPaper>
              </div>
            </TabsContent>
          </Tabs>
        </TornPaper>
      </div>
    </div>
  );
}
