import { useState } from "react";
import type { Ticket, VenueStats } from "types/ticket";

// Define TicketStatus for stricter typing
type TicketStatus = "available" | "sold" | "checked-in" | "void";

const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    section: "A",
    row: "1",
    seat: "101",
    price: 150,
    status: "sold",
    purchaseDate: "2024-01-12T18:30:00",
  },
  {
    id: "2",
    section: "A",
    row: "1",
    seat: "102",
    price: 150,
    status: "checked-in",
    purchaseDate: "2024-01-12T18:30:00",
    checkInTime: "2024-01-12T19:45:00",
  },
  {
    id: "3",
    section: "B",
    row: "2",
    seat: "205",
    price: 120,
    status: "available",
  },
  // Add more mock tickets as needed
];

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  const stats: VenueStats = tickets.reduce(
    (acc, ticket) => {
      const isSold = ticket.status === "sold" || ticket.status === "checked-in";
      return {
        totalTickets: acc.totalTickets + 1,
        soldTickets: acc.soldTickets + (isSold ? 1 : 0),
        checkedIn: acc.checkedIn + (ticket.status === "checked-in" ? 1 : 0),
        revenue: acc.revenue + (isSold ? ticket.price : 0),
      };
    },
    { totalTickets: 0, soldTickets: 0, checkedIn: 0, revenue: 0 },
  );

  return { tickets, stats };
}
