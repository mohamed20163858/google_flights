"use client";
import { useEffect, useState } from "react";
import CityAutocompleteTextInput from "./CityAutocompleteTextInput";
import { SearchFormProps } from "@/types/flight";
import Date from "./Date";
function SearchForm({
  origin,
  destination,
  setOrigin,
  setDestination,
}: SearchFormProps) {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/flights/getNearByAirports?lat=${lat}&lng=${long}&locale=en-US`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setOrigin({
              skyId: data?.data?.current?.skyId,
              entityId: data?.data?.current?.entityId,
              flightPlaceType: data?.data?.current?.navigation?.entityType,
              localizedName: data?.data?.current?.navigation?.localizedName,
              country: data?.data?.current?.presentation?.subtitle,
            });
          });
      },
      (error) => {
        console.log("Error getting location:", error?.message);
      }
    );
  }, [setOrigin]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/flights/searchFlights?originSkyId=${origin.skyId}&destinationSkyId=${destination.skyId}&originEntityId=${origin.entityId}&destinationEntityId=${destination.entityId}&date=${departureDate}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <form
      className="flex justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <CityAutocompleteTextInput
        placeholder="Where from ?"
        suggestion={origin}
        setSuggestion={setOrigin}
      />
      <CityAutocompleteTextInput
        placeholder="Where to ?"
        suggestion={destination}
        setSuggestion={setDestination}
      />
      <Date date={departureDate} setDate={setDepartureDate} />
      <Date date={returnDate} setDate={setReturnDate} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
