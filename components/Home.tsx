"use client";
import Results from "./Results";
import SearchForm from "./SearchForm";
import { Flight } from "@/types/flight";
import { useState } from "react";
function Home() {
  const [origin, setOrigin] = useState<Flight>({
    entityId: "",
    skyId: "",
    flightPlaceType: "",
    localizedName: "",
    country: "",
  });
  const [destination, setDestination] = useState<Flight>({
    entityId: "",
    skyId: "",
    flightPlaceType: "",
    localizedName: "",
    country: "",
  });
  return (
    <div>
      <SearchForm
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
      />
      <Results origin={origin} destination={destination} />
    </div>
  );
}

export default Home;
