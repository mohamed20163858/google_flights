"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { CityAutoCompleteTextInputProps, Flight } from "@/types/flight";
import { MdOutlineTripOrigin } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

function CityAutocompleteTextInput({
  placeholder,
  suggestion,
  setSuggestion,
}: CityAutoCompleteTextInputProps) {
  const [inputValue, setInputValue] = useState(
    suggestion?.entityId
      ? `${suggestion.localizedName.split(" ")[0]} ${suggestion.skyId}`
      : ""
  );
  const [suggestions, setSuggestions] = useState<Flight[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState("auto");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    if (suggestion.entityId) {
      setInputValue(`${suggestion.localizedName.split(" ")[0]}`);
    }
  }, [suggestion]);

  // Close suggestions popup if clicking outside the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://sky-scanner3.p.rapidapi.com/flights/auto-complete?query=${encodeURIComponent(
        value
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
        },
      }
    );
    const data = await response.json();
    setSuggestions(
      data.data
        .map(
          (entity: {
            navigation: { relevantFlightParams: Flight };
            presentation: { subtitle: string };
          }) => ({
            ...entity.navigation.relevantFlightParams,
            country: entity.presentation.subtitle,
          })
        )
        .filter((entity: Flight) => entity.flightPlaceType === "AIRPORT")
    );
  };

  const handleSuggestionClick = (suggestion: Flight) => {
    const newValue = `${suggestion.localizedName}, ${suggestion.country}`;
    setInputValue(newValue);
    setSuggestion({ ...suggestion });
    setSuggestions([]); // hide suggestions after selection
    // If mobile modal is open, close it on selection
    if (isMobileModalOpen) {
      setIsMobileModalOpen(false);
    }
  };

  useEffect(() => {
    if (spanRef.current && inputValue) {
      setWidth(`${spanRef.current.offsetWidth + 5}px`); // +5 for slight padding
    } else {
      setWidth("auto");
    }
  }, [inputValue]);

  // On small screens, open the mobile modal on input click
  const handleInputClick = () => {
    if (window.innerWidth < 640) {
      setIsMobileModalOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-[282px] max-h-[56px]">
      <div className="px-4 py-2 border border-gray-400 hover:border-black dark:hover:border-white rounded sm:min-w-[170px] flex gap-2 items-center">
        {placeholder === "Where from ?" && <MdOutlineTripOrigin size={15} />}
        {placeholder === "Where to ?" && <MdOutlineLocationOn size={15} />}
        <div className="flex items-center">
          <span ref={spanRef} className="absolute invisible whitespace-nowrap">
            {inputValue || " "}
          </span>
          <input
            ref={inputRef}
            type="text"
            name="city"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
            style={{ width }}
            className={`outline-none text-black dark:text-white dark:bg-inherit`}
            required
          />
          <p className="hidden sm:block text-[8px] sm:text-[12px] sm:mb-[-5px]">
            {suggestion.skyId}
          </p>
        </div>
      </div>

      {/* Desktop & Tablet Suggestions Dropdown */}
      {suggestions.length > 0 && inputValue && (
        <ul className="hidden sm:block absolute left-0 right-0 top-full bg-white dark:bg-[#394457] text-black dark:text-white z-50 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={uuidv4()}
              onClick={() => handleSuggestionClick(item)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {item.localizedName}, {item.country}
            </li>
          ))}
        </ul>
      )}

      {/* Mobile Full-Screen Modal */}
      {isMobileModalOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-white dark:bg-[#394457] p-4 overflow-y-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="mr-2"
            >
              <MdArrowBack size={15} className="text-black dark:text-white" />
            </button>
            <input
              type="text"
              name="city"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              className="outline-none text-black dark:text-white dark:bg-inherit flex-1 border-b border-gray-400"
            />
          </div>
          <ul className="bg-white dark:bg-[#394457] text-black dark:text-white">
            {suggestions.map((item) => (
              <li
                key={uuidv4()}
                onClick={() => handleSuggestionClick(item)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {item.localizedName}, {item.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CityAutocompleteTextInput;
