import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Ticket } from "types/ticket";
import { formatCurrency, formatDate } from "utils/format";
import { TornPaper } from "./torn-paper";
import { SafetyPin } from "./safety-pin";

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  return (
    <TornPaper>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[30px] p-0" /> {/* Column for SafetyPin */}
            <TableHead className="font-mono uppercase">Section</TableHead>
            <TableHead className="font-mono uppercase">Row</TableHead>
            <TableHead className="font-mono uppercase">Seat</TableHead>
            <TableHead className="font-mono uppercase">Price</TableHead>
            <TableHead className="font-mono uppercase">Status</TableHead>
            <TableHead className="font-mono uppercase">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="group hover:bg-black/5">
              <TableCell className="w-[30px] p-0">
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <SafetyPin />
                </div>
              </TableCell>
              <TableCell className="font-mono">{ticket.section}</TableCell>
              <TableCell className="font-mono">{ticket.row}</TableCell>
              <TableCell className="font-mono">{ticket.seat}</TableCell>
              <TableCell className="font-mono">
                {formatCurrency(ticket.price)}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center gap-2 rounded-sm border-2 border-black bg-white px-2 py-0.5 font-mono text-sm uppercase ${
                    ticket.status === "available"
                      ? "bg-green-500"
                      : ticket.status === "sold"
                        ? "bg-yellow-500"
                        : ticket.status === "checked-in"
                          ? "bg-blue-500"
                          : "bg-red-500"
                  } `}
                >
                  {ticket.status}
                </span>
              </TableCell>
              <TableCell className="font-mono">
                {ticket.checkInTime
                  ? formatDate(ticket.checkInTime)
                  : ticket.purchaseDate
                    ? formatDate(ticket.purchaseDate)
                    : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TornPaper>
  );
}
