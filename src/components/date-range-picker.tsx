/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
  addDays,
  format,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TornPaper } from "./torn-paper";

interface DateRangePickerProps {
  className?: string;
  onDateRangeChange: (range: { from: Date; to: Date } | undefined) => void;
}

export function DateRangePicker({
  className,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
  });

  // Helper function to set specific times
  const setTimeConstraints = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return undefined;

    const from = setHours(setMinutes(setSeconds(range.from, 0), 1), 0); // 00:01 AM
    const to = setHours(setMinutes(setSeconds(range.to, 59), 59), 23); // 23:59 PM

    return { from, to };
  };

  const handleDateChange = (range: DateRange | undefined) => {
    const constrainedRange = setTimeConstraints(range);
    setDate(constrainedRange);
    onDateRangeChange(constrainedRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start border-2 border-black text-left font-mono hover:bg-black hover:text-white",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <TornPaper>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              className="font-mono"
            />
          </TornPaper>
        </PopoverContent>
      </Popover>
    </div>
  );
}