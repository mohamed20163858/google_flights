"use client";
import { useEffect, useState } from "react";
import CityAutocompleteTextInput from "./CityAutocompleteTextInput";
function SearchForm() {
  const [origin, setOrigin] = useState({ originSkyId: "", originEntityId: "" });
  //   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setMounted(true);
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
            console.log(data);
            setOrigin({
              originSkyId: data?.data?.current?.skyId,
              originEntityId: data?.data?.current?.entityId,
            });
          });
      },
      (error) => {
        console.log("Error getting location:", error?.message);
      }
    );
  }, []);
  //   if (!mounted) {
  //     return null; // Don't render until the component has mounted on the client.
  //   }

  if (!origin.originEntityId || !origin.originSkyId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>entityID: {origin.originEntityId}</h1>
      <h1>skyId: {origin.originSkyId}</h1>
      <CityAutocompleteTextInput placeholder="Where from ?" />
    </div>
  );
}

export default SearchForm;
