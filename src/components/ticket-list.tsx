import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import type { Ticket } from "types/ticket";
// import { formatCurrency, formatDate } from "utils/format";
import { TornPaper } from "./torn-paper";
import { SafetyPin } from "./safety-pin";
import { type arrivalType } from "@/server/db/schema";
// interface TicketListProps {
//   tickets: Ticket[];
// }

export function TicketList(props: { arrivals: arrivalType[] }) {
  return (
    <TornPaper>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[30px] p-0" /> {/* Column for SafetyPin */}
            <TableHead className="font-mono uppercase">Full Name</TableHead>
            <TableHead className="font-mono uppercase">Major/Smer</TableHead>
            <TableHead className="font-mono uppercase">Index</TableHead>
            <TableHead className="font-mono uppercase">Year</TableHead>
            <TableHead className="font-mono uppercase">Date</TableHead>
            <TableHead className="font-mono uppercase">Authorizer</TableHead>
          </TableRow>
        </TableHeader>
        {props.arrivals && props.arrivals.length > 0 ? (
          <TableBody>
            {props.arrivals.map((arrival) => (
              <TableRow key={arrival.id} className="group hover:bg-black/5">
                <TableCell className="w-[30px] p-0">
                  <div className="opacity-0 transition-opacity group-hover:opacity-100">
                    <SafetyPin />
                  </div>
                </TableCell>
                <TableCell className="font-mono">
                  {arrival.first_name + " " + arrival.surname}
                </TableCell>
                <TableCell className="font-mono">{arrival.major}</TableCell>
                <TableCell className="font-mono">{arrival.index}</TableCell>
                <TableCell className="font-mono">{arrival.year}</TableCell>
                <TableCell>
                  {arrival.createdAt?.toDateString() ?? "DATE UNAVAILABLE"}
                </TableCell>
                <TableCell className="font-mono">
                  {arrival.authorizer}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow className="m-5 w-full bg-black p-5 text-white">
              <TableCell className="w-full">NO ENTRIES FOUND</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TornPaper>
  );
}
