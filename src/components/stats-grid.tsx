import { Activity, Tag, Timer, Wallet } from "lucide-react";
import type { VenueStats } from "types/ticket";
import { formatCurrency } from "utils/format";
import { TornPaper } from "./torn-paper";

interface StatsGridProps {
  stats: VenueStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          label: "Total Tickets",
          value: stats.totalTickets,
          icon: Tag,
        },
        {
          label: "Tickets Sold",
          value: stats.soldTickets,
          icon: Activity,
        },
        {
          label: "Checked In",
          value: stats.checkedIn,
          icon: Timer,
        },
        {
          label: "Revenue",
          value: formatCurrency(stats.revenue),
          icon: Wallet,
        },
      ].map((stat) => (
        <TornPaper key={stat.label}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-sm uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="font-mono text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className="h-5 w-5" />
          </div>
        </TornPaper>
      ))}
    </div>
  );
}
