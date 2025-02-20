"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

enum TripType {
  RoundTrip = "Round trip",
  OneWay = "One way",
}

interface TripSelectorProps {
  tripType: TripType;
  setTripType: (tripType: TripType) => void;
}

function TripSelector({ tripType, setTripType }: TripSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedType: TripType) => {
    setTripType(selectedType);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-full flex gap-2 items-center outline-none px-2 sm:px-4 py-2  hover:bg-[#f1f3f4] dark:hover:bg-[#1c1c1c]  border-[#1a73e8] focus:border-b focus:bg-[#d2e3fc] dark:focus:bg-[#85b1f4] sm:min-w-[138px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 items-center">
          <div className="text-gray-500">
            {tripType === TripType.RoundTrip && <FaExchangeAlt />}
            {tripType === TripType.OneWay && <FaArrowRightLong />}
          </div>

          <div className="text-black dark:text-white whitespace-nowrap">
            {tripType}
          </div>
        </div>

        {!isOpen && <FaCaretDown className="ml-2 text-gray-500" />}
        {isOpen && <FaCaretUp className="ml-2 text-[#1a73e8]" />}
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white dark:bg-[#394457] text-black dark:text-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
          {Object.values(TripType).map((type) => (
            <li
              key={type}
              onClick={() => handleSelect(type)}
              className={`flex justify-between items-center px-2 sm:px-4 py-2 cursor-pointer  ${
                type === tripType ? "bg-[#d2e3fc] dark:bg-slate-400 " : ""
              }`}
            >
              <span className="w-5 h-5 flex justify-center items-center">
                {type === tripType && <MdOutlineCheck size={20} />}
              </span>
              <span className="text-black dark:text-white">{type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TripSelector;
