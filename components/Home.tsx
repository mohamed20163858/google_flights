"use client";
import Results from "./Results";
import SearchForm from "./SearchForm";
import { FlightInfo } from "@/types/flight";
import { useState } from "react";
function Home() {
  const [flightInfos, setFlightInfos] = useState<FlightInfo[]>([]);

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchForm setFlightInfos={setFlightInfos} />
      <Results flightInfos={flightInfos} />
    </div>
  );
}

export default Home;
