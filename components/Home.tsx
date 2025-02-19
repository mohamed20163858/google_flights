"use client";
import LandingImage from "./LandingImage";
import Results from "./Results";
import SearchForm from "./SearchForm";
import { FlightInfo } from "@/types/flight";
import { useState } from "react";
function Home() {
  const [flightInfos, setFlightInfos] = useState<FlightInfo[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      {!isSubmitted && <LandingImage />}
      <SearchForm
        setFlightInfos={setFlightInfos}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      {flightInfos.length > 0 && <Results flightInfos={flightInfos} />}
      {flightInfos.length === 0 && isSubmitted && (
        <div className="mt-[100px]">There is no flights!</div>
      )}
    </div>
  );
}

export default Home;
