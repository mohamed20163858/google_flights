"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}
interface PassengerSelectorProps {
  passengers: PassengerCounts;
  setPassengers: (passengers: PassengerCounts) => void;
}
export default function PassengerSelector({
  passengers,
  setPassengers,
}: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [tempPassengers, setTempPassengers] = useState(passengers);

  const handleIncrement = (type: keyof PassengerCounts) => {
    setTempPassengers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type: keyof PassengerCounts) => {
    setTempPassengers((prev) => ({
      ...prev,
      [type]:
        type === "adults" && prev.adults === 1
          ? 1
          : Math.max(0, prev[type] - 1),
    }));
  };

  const handleCancel = () => {
    setTempPassengers(passengers);
    setIsOpen(false);
  };

  const handleDone = () => {
    setPassengers(tempPassengers);
    setIsOpen(false);
  };

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="relative z-20">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex gap-2 items-center outline-none px-4 py-2  hover:bg-[#f1f3f4] dark:hover:bg-[#1c1c1c]  border-[#1a73e8] focus:border-b focus:bg-[#d2e3fc] dark:focus:bg-[#85b1f4] whitespace-nowrap"
      >
        <div className="flex gap-2 items-center">
          <div className="text-gray-500">
            <MdOutlinePersonOutline size={24} />
          </div>

          <div className="text-black dark:text-white">{totalPassengers}</div>
        </div>

        {!isOpen && <FaCaretDown className="ml-2 text-gray-500" />}
        {isOpen && <FaCaretUp className="ml-2 text-[#1a73e8]" />}
        {/* {totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""} */}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-auto min-w-full bg-white dark:bg-[#394457] shadow-lg border rounded-md p-4">
          {(["adults", "children", "infants"] as const).map((type) => (
            <div
              key={uuidv4()}
              className="flex justify-between items-center mb-2"
            >
              <span className="capitalize mr-3">{type}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDecrement(type)}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                    type === "adults" && tempPassengers.adults === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={type === "adults" && tempPassengers.adults === 1}
                >
                  −
                </button>
                <span className="w-6 text-center">{tempPassengers[type]}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement(type)}
                  className="w-8 h-8 flex items-center justify-center border rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
