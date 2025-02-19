"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { CityAutoCompleteTextInputProps, Flight } from "@/types/flight";
import { MdOutlineTripOrigin } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

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

  useEffect(() => {
    if (suggestion.entityId) {
      setInputValue(
        `${suggestion.localizedName.split(" ")[0]} ${suggestion.skyId}`
      );
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
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/v1/flights/searchAirport?query=${encodeURIComponent(value)}`,
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
  };

  return (
    <div ref={containerRef} className="relative max-w-[282px] max-h-[56px]">
      <div className=" px-4 py-2 border hover:border-black rounded w-full flex gap-2 items-center">
        {placeholder === "Where from ?" && <MdOutlineTripOrigin />}
        {placeholder === "Where to ?" && <MdOutlineLocationOn size={20} />}

        <input
          type="text"
          name="city"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className="outline-none "
        />
      </div>

      {suggestions.length > 0 && inputValue && (
        <ul className="absolute left-0 right-0 top-full bg-white z-50 shadow-lg max-h-60 overflow-y-auto">
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
    </div>
  );
}

export default CityAutocompleteTextInput;
