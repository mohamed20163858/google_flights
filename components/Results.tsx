"use client";

import { FlightInfo } from "@/types/flight";
import ListItemResult from "./ListItemResult";
import { v4 as uuidv4 } from "uuid";

function Results({ flightInfos }: { flightInfos: FlightInfo[] }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ul className="w-full flex flex-col justify-center items-center">
        {flightInfos &&
          flightInfos.map((flightInfo) => {
            return (
              <div
                key={uuidv4()}
                className="w-full flex flex-col justify-center items-center"
              >
                <ListItemResult flightInfo={flightInfo} />
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default Results;
