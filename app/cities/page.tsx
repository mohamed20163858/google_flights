"use client";
import { useState } from "react";

function CityAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  interface Suggestion {
    entityId: string;
    skyId: string;
    flightPlaceType: string;
    localizedName: string;
    country: string;
  }

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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
    console.log(data.data);
    setSuggestions(
      data.data
        .map(
          (entity: {
            navigation: { relevantFlightParams: Suggestion };
            presentation: { subtitle: string };
          }) => {
            return {
              ...entity.navigation.relevantFlightParams,
              country: entity.presentation.subtitle,
            };
          }
        )
        .filter((entity: Suggestion) => entity.flightPlaceType === "AIRPORT")
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.length > 0 &&
          inputValue &&
          suggestions.map((item) => (
            <li key={item.entityId}>
              {item.localizedName}, {item.country}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CityAutocomplete;
