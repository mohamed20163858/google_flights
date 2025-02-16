"use client";
import Results from "./Results";
import SearchForm from "./SearchForm";
import { Flight, FlightInfo } from "@/types/flight";
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
  const [flightInfos, setFlightInfos] = useState<FlightInfo[]>([]);

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchForm
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        setFlightInfos={setFlightInfos}
        flightInfos={flightInfos}
      />
      <Results
        origin={origin}
        destination={destination}
        flightInfos={flightInfos}
      />
    </div>
  );
}

export default Home;
