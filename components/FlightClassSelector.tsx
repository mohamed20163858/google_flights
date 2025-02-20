"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";

enum FlightClass {
  Economy = "economy",
  PremiumEconomy = "premium_economy",
  Business = "business",
  First = "first",
}

interface FlightClassSelectorProps {
  selectedClass: FlightClass;
  setSelectedClass: (selectedClass: FlightClass) => void;
}

// Mapping API values to display labels
const flightClassLabels: Record<FlightClass, string> = {
  [FlightClass.Economy]: "Economy",
  [FlightClass.PremiumEconomy]: "Premium Economy",
  [FlightClass.Business]: "Business",
  [FlightClass.First]: "First Class",
};

export default function FlightClassSelector({
  selectedClass,
  setSelectedClass,
}: FlightClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (flightClass: FlightClass) => {
    setSelectedClass(flightClass);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative text-black dark:text-white">
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-full flex gap-2 items-center outline-none px-2 sm:px-4 py-2 hover:bg-[#f1f3f4] dark:hover:bg-[#1c1c1c]  border-[#1a73e8] focus:border-b focus:bg-[#d2e3fc] dark:focus:bg-[#85b1f4] whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 items-center">
          <div>{flightClassLabels[selectedClass]}</div>
        </div>

        {!isOpen && <FaCaretDown className="ml-2 text-gray-500" />}
        {isOpen && <FaCaretUp className="ml-2 text-[#1a73e8]" />}
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute left-[-50%] sm:left-0 mt-2 w-auto sm:min-w-full bg-white dark:bg-[#394457] text-black dark:text-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
          {Object.values(FlightClass).map((flightClass) => (
            <li
              key={flightClass}
              onClick={() => handleSelect(flightClass)}
              className={`flex justify-between items-center px-2 py-2 cursor-pointer whitespace-nowrap ${
                flightClass === selectedClass
                  ? "bg-[#d2e3fc] dark:bg-slate-400"
                  : ""
              }`}
            >
              <span className="w-5 h-5 flex justify-center items-center">
                {flightClass === selectedClass && <MdOutlineCheck />}
              </span>
              <span>{flightClassLabels[flightClass]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
