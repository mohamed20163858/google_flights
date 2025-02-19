"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { formatDate } from "@/utils/timeHelper";

interface CustomDateInputProps {
  date: string;
  setDate: (date: string) => void;
  placeholder?: string;
  minDate?: string;
  disabled?: boolean;
}

export default function CustomDateInput({
  date,
  setDate,
  placeholder = "Select Date",
  minDate,
  disabled = false,
}: CustomDateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarYear, setCalendarYear] = useState<number>(
    new Date().getFullYear()
  );
  const [calendarMonth, setCalendarMonth] = useState<number>(
    new Date().getMonth()
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Close calendar if clicking outside the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update calendar view to match the selected date
  useEffect(() => {
    if (date) {
      const d = new Date(date);
      setCalendarYear(d.getFullYear());
      setCalendarMonth(d.getMonth());
    }
  }, [date]);

  // Adjust the selected date by a given number of days
  const changeDateBy = (days: number) => {
    if (disabled) return;
    const current = date ? new Date(date) : new Date();
    current.setDate(current.getDate() + days);
    if (minDate) {
      const min = new Date(minDate);
      if (current < min) {
        current.setTime(min.getTime());
      }
    }
    // Adjust for timezone offset
    const adjusted = new Date(
      current.getTime() - current.getTimezoneOffset() * 60000
    );
    setDate(adjusted.toISOString().split("T")[0]);
  };

  // Create the calendar grid (with empty cells before the first day)
  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }
    return calendarDays;
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(calendarYear, calendarMonth, day);
    if (minDate) {
      const min = new Date(minDate);
      if (newDate < min) return;
    }
    // Adjust the newDate for timezone offset before formatting
    const adjustedDate = new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000
    );
    setDate(adjustedDate.toISOString().split("T")[0]);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const resetDate = () => {
    setDate("");
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Display area with left/right arrows */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center border hover:border-black rounded-md p-2 bg-white dark:bg-inherit shadow-sm w-44 cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex flex-grow items-center gap-2">
          {placeholder === "Departure" && <MdDateRange size={20} />}
          <div
            className={` text-center ${
              date ? "text-black dark:text-white" : ""
            } select-none whitespace-nowrap mr-2`}
          >
            {date ? formatDate(date) : placeholder}
          </div>
        </div>

        {date && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeDateBy(-1);
              }}
              disabled={disabled}
              className="text-gray-500 hover:text-gray-700 dark:text-white"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeDateBy(1);
              }}
              disabled={disabled}
              className="text-gray-500 hover:text-gray-700 dark:text-white"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute z-30 mt-2 bg-white dark:bg-[#394457]  border rounded-md p-4 w-72">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={prevMonth}
              className="text-gray-500 dark:text-white hover:text-gray-700"
            >
              <FaChevronLeft size={14} />
            </button>
            <div className="text-sm font-semibold">
              {monthNames[calendarMonth]} {calendarYear}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="text-gray-500 hover:text-gray-700 dark:text-white"
            >
              <FaChevronRight size={14} />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-1 text-xs text-center font-semibold text-gray-600 dark:text-white">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays(calendarYear, calendarMonth).map((day, idx) => {
              if (!day) return <div key={idx} />;
              const dayDate = new Date(calendarYear, calendarMonth, day);
              const isSelected =
                date &&
                new Date(date).toDateString() === dayDate.toDateString();
              let isDisabled = false;
              if (minDate) {
                const min = new Date(minDate);
                if (dayDate < min) isDisabled = true;
              }
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  disabled={isDisabled}
                  className={`p-1 text-center rounded-md text-sm ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-700 dark:text-white"
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Reset and Done Buttons */}
          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={resetDate}
              className="px-3 py-1 bg-gray-300 text-gray-700 dark:text-white rounded-md text-sm hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
