export type TicketStatus = "available" | "sold" | "checked-in" | "void";

export interface Ticket {
  id: string;
  section: string;
  row: string;
  seat: string;
  price: number;
  status: TicketStatus;
  purchaseDate?: string;
  checkInTime?: string;
}

export interface VenueStats {
  totalTickets: number;
  soldTickets: number;
  checkedIn: number;
  revenue: number;
}
