/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
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
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  setDateRange: (
    range: { from: Date | undefined; to: Date | undefined } | undefined,
  ) => void;
}

export function DateRangePicker({
  className,
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  // Helper function to set specific times
  const setTimeConstraints = (range: DateRange | undefined) => {
    // if (!range?.from || !range?.to) return undefined;
    if (!range?.from) return undefined;

    const from = setHours(setMinutes(setSeconds(range.from, 0), 1), 0); // 00:01 AM
    const to = setHours(
      setMinutes(setSeconds(range.to ?? range.from ?? new Date(), 59), 59),
      23,
    ); // 23:59 PM

    return { from, to };
  };

  const handleDateChange = (range: DateRange | undefined) => {
    console.log("dateRange", dateRange);
    console.log("range", range);

    const constrainedRange = setTimeConstraints(range);

    if (constrainedRange?.from === dateRange?.from) {
      setDateRange(undefined);
      // return null;
    }

    // If the constrained range is valid, set the new date range
    if (constrainedRange) {
      setDateRange(constrainedRange);
    } else {
      // Convert null to undefined before passing to setDateRange
      const fallbackRange = dateRange
        ? {
            from: dateRange.from ?? undefined,
            to: dateRange.to ?? undefined,
          }
        : undefined;

      setDateRange(fallbackRange); // Use the existing dateRange as a fallback
    }
  };

  // This ensures that the displayed date range is reset when a new range is selected
  const handleCalendarClose = () => {
    // if (dateRange?.from && dateRange?.to) {
    //   setDateRange({ from: undefined, to: undefined }); // Clear date range on close
    // }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={handleCalendarClose}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start border-2 border-black text-left font-mono hover:bg-black hover:text-white",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
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
              defaultMonth={dateRange?.from}
              selected={dateRange}
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
