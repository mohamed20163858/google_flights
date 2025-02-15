"use client";
import { useEffect } from "react";
import CityAutocompleteTextInput from "./CityAutocompleteTextInput";
import { SearchFormProps } from "@/types/flight";

function SearchForm({
  origin,
  destination,
  setOrigin,
  setDestination,
}: SearchFormProps) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/flights/getNearByAirports?lat=${lat}&lng=${long}&locale=en-US`,
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

  return (
    <div>
      <CityAutocompleteTextInput
        placeholder="Where from ?"
        suggestion={origin}
        setSuggestion={setOrigin}
        // defaultSuggestion={origin}
      />
      <CityAutocompleteTextInput
        placeholder="Where to ?"
        suggestion={destination}
        setSuggestion={setDestination}
      />
    </div>
  );
}

export default SearchForm;
