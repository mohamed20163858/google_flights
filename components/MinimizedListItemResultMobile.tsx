"use client";

import Image from "next/image";
import { SlArrowDown } from "react-icons/sl";
import { FlightInfo } from "@/types/flight";
import { CgArrowLongRight } from "react-icons/cg";

interface MinimizedListItemResultMobileProps {
  flightInfo: FlightInfo;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}
function MinimizedListItemResultMobile({
  flightInfo,
  isExpanded,
  setIsExpanded,
}: MinimizedListItemResultMobileProps) {
  // get departure and arrival time for the whole trip and process info to be in 0 -> 12 am/pm format
  const departureTime = flightInfo.departure.split("T")[1].split(":");
  const arrivalTime = flightInfo.arrival.split("T")[1].split(":");
  const departureDay = +departureTime[0] >= 12 ? "PM" : "AM";
  const arrivalDay = +arrivalTime[0] >= 12 ? "PM" : "AM";
  departureTime[0] = (+departureTime[0] % 12 || 12).toString();
  arrivalTime[0] = (+arrivalTime[0] % 12 || 12).toString();
  // calculate the layover time if there is only 1 stop

  return (
    <li className="flex gap-2 justify-between items-center  w-full p-4 border bg-inherit text-black dark:text-white border-[#dadce0] rounded-lg min-w-[320px] ">
      <div className="flex  gap-2">
        <div>
          <Image
            src={
              flightInfo.logosURL.length > 1
                ? "/multi.png"
                : flightInfo.logosURL[0].logoUrl
            }
            alt="Airport Image"
            width={26} // Set width
            height={26} // Set height
            priority // Ensures it loads immediately
          />
        </div>
        <div>
          <div className="flex">
            <div>
              <p>
                {departureTime[0]}:{departureTime[1]} {departureDay}
              </p>
              <p className="text-[8px] text-gray-400 dark:text-white">
                {flightInfo.segments[0].origin.flightPlaceId}
              </p>
            </div>
            <CgArrowLongRight size={15} className="text-gray-400" />

            <div>
              <p>
                {arrivalTime[0]}:{arrivalTime[1]} {arrivalDay}
              </p>
              <p className="text-[8px] text-gray-400 dark:text-white">
                {
                  flightInfo.segments[flightInfo.segments.length - 1]
                    .destination.flightPlaceId
                }
              </p>
            </div>
          </div>
          <div>
            <p className=" text-[6px] text-gray-400 dark:text-white">
              {flightInfo.stopCount > 0
                ? `${flightInfo.stopCount} stop`
                : "Nonstop"}{" "}
              <span className="inline-block mt-1">.</span>{" "}
              {Math.floor(flightInfo.durationInMinutes / 60)} hr{" "}
              {flightInfo.durationInMinutes % 60} min{" "}
              <span className="inline-block mt-1">.</span>
              {[
                ...new Set(
                  flightInfo.segments.map(
                    (segment) => segment.marketingCarrier.name
                  )
                ),
              ].join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[5px]">
        <div>
          <p>{flightInfo.price}</p>
        </div>
        <div
          className="rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SlArrowDown />
        </div>
      </div>
    </li>
  );
}

export default MinimizedListItemResultMobile;
