"use client";
import { DateProps } from "@/types/flight";
export default function DateInput({ date, setDate }: DateProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <input
      id="dateInput"
      type="date"
      value={date}
      min={new Date().toISOString().split("T")[0]}
      onChange={handleDateChange}
      placeholder="Date"
      className="mt-1 p-2 border rounded"
    />
  );
}
