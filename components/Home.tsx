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
      {flightInfos.length > 0 && <Results flightInfos={flightInfos} />}
      {flightInfos.length === 0 && <div>There is no flights!</div>}
    </div>
  );
}

export default Home;
