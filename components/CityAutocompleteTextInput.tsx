"use client";
import { useState, useEffect } from "react";
import { CityAutoCompleteTextInputProps, Flight } from "@/types/flight";

function CityAutocompleteTextInput({
  placeholder,
  suggestion,
  setSuggestion,
}: CityAutoCompleteTextInputProps) {
  const [inputValue, setInputValue] = useState(
    suggestion?.entityId
      ? `${suggestion.localizedName}, ${suggestion.country}`
      : ""
  );
  const [suggestions, setSuggestions] = useState<Flight[]>([]);
  useEffect(() => {
    if (suggestion.entityId) {
      setInputValue(`${suggestion.localizedName}, ${suggestion.country}`);
    }
  }, [suggestion]);

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
      }/flights/searchAirport?query=${encodeURIComponent(value)}`,
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
    <div className="relative max-w-[282px] max-h-[56px]">
      <input
        type="text"
        name="city"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 border rounded w-full"
      />
      {suggestions.length > 0 && inputValue && (
        <ul className="absolute left-0 right-0 top-full bg-white z-50 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.entityId}
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
