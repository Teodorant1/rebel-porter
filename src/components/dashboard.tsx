"use client";
import { useTickets } from "@/hooks/use-tickets";
import { StatsGrid } from "@/components/stats-grid";
import { TicketList } from "@/components/ticket-list";
import { SafetyPin } from "@/components/safety-pin";
import { DateRangePicker } from "./date-range-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { api } from "@/trpc/react";
import React from "react";

export default function Dashboard() {
  const { tickets, stats } = useTickets();

  // State for the selected date range

  const [dateRange, setDateRange] = React.useState<
    | {
        from: Date | undefined;
        to: Date | undefined;
      }
    | undefined
  >({
    from: new Date(new Date().setDate(new Date().getDate() - 8)), // 8 days ago
    to: new Date(new Date().setDate(new Date().getDate() + 1)), // today
  });

  const arrivals = api.post.getLatest_check_ins.useQuery({
    from:
      dateRange?.from ?? new Date(new Date().setDate(new Date().getDate() - 8)),
    to: dateRange?.to ?? new Date(),
  });
  const handleDateRangeChange = (
    range: { from: Date | undefined; to: Date | undefined } | undefined,
  ) => {
    setDateRange(range);
    // // Filter tickets based on the selected date range
    // const filteredTickets = tickets.filter((ticket) => {
    //   if (!range?.from || !range?.to || !ticket.purchaseDate) return true;
    //   const ticketDate = parseISO(ticket.purchaseDate);
    //   return isWithinInterval(ticketDate, { start: range.from, end: range.to });
    // });
    // // Update tickets state here (you would typically do this through a state management solution)
    // console.log("Filtered tickets:", filteredTickets);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-neutral-100 to-black/20">
      <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await arrivals.refetch();
        }}
      ></button>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <h1 className="font-mono text-4xl font-black uppercase tracking-tight">
              Venue
              <br />
              Dashboard
            </h1>
            <div className="absolute -right-4 -top-2">
              <SafetyPin />
            </div>
          </div>
          {/* Pass the current date range and the function to handle changes */}
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={handleDateRangeChange}
          />
        </header>

        <StatsGrid stats={stats} />
        {/* <TicketList tickets={tickets} /> */}
        {arrivals.data && <TicketList arrivals={arrivals.data ?? []} />}

        {/* Punk Background Elements */}
        <div
          className="pointer-events-none fixed inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}
