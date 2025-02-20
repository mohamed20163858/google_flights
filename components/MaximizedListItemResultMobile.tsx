"use client";

import { getTimeDifferenceInMinutes } from "@/utils/timeHelper";
import { v4 as uuidv4 } from "uuid";
import { SlArrowUp } from "react-icons/sl";
import { FlightInfo } from "@/types/flight";
import { MdOutlineAirlineSeatLegroomReduced } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdOutlineUsb } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";

interface MaximizedListItemResultProps {
  flightInfo: FlightInfo;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

function MaximizedListItemResult({
  flightInfo,
  isExpanded,
  setIsExpanded,
}: MaximizedListItemResultProps) {
  return (
    <li className="flex flex-col w-full border border-[#dadce0] rounded-t-lg">
      <div
        className="self-end rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SlArrowUp />
      </div>
      <div className="flex justify-between px-4 items-center">
        <p>{flightInfo.price}</p>
        <button
          type="button"
          className="border border-[#dadce0] rounded-[16px] text-[#1A73E8] px-[23px] py-[4px]"
        >
          Select flight
        </button>
      </div>
      {/* Flight Segments Details */}
      <div className="w-full border border-[#dadce0] border-t-0 pt-4 mb-4 text-[10px]">
        {flightInfo.segments.map((segment, idx) => {
          // Process times for departure/arrival to 12 hr format
          const departureTime = segment.departure.split("T")[1].split(":");
          const arrivalTime = segment.arrival.split("T")[1].split(":");
          const departureDay = +departureTime[0] >= 12 ? "PM" : "AM";
          const arrivalDay = +arrivalTime[0] >= 12 ? "PM" : "AM";
          departureTime[0] = (+departureTime[0] % 12 || 12).toString();
          arrivalTime[0] = (+arrivalTime[0] % 12 || 12).toString();
          // Calculate layover time if applicable
          const LayoverTime =
            idx < flightInfo.segments.length - 1
              ? getTimeDifferenceInMinutes(
                  flightInfo.segments[idx + 1].departure,
                  flightInfo.segments[idx].arrival
                )
              : 0;
          return (
            <div key={uuidv4()} className="flex flex-col mt-4 pl-4 gap-4">
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 border-2 border-[#dadce0] rounded-full -ml-1"></div>
                      <div className="border-l-2 border-dotted border-[#dadce0] h-12 w-1"></div>
                      <div className="w-3 h-3 border-2 border-[#dadce0] rounded-full -ml-1"></div>
                    </div>
                    <div>
                      <p className="text-black dark:text-white text-[12px]">
                        {departureTime[0]}:{departureTime[1]} {departureDay}
                      </p>
                      <p className="text-black dark:text-white text-[10px]">
                        {segment.origin.name} {segment.origin.type} (
                        {segment.origin.flightPlaceId})
                      </p>
                      <p className="my-2 text-[8px]">
                        Travel time:{" "}
                        {Math.floor(segment.durationInMinutes / 60)} hr{" "}
                        {segment.durationInMinutes % 60} min
                      </p>
                      <p className="max-w-full text-black dark:text-white text-[12px]">
                        {arrivalTime[0]}:{arrivalTime[1]} {arrivalDay}
                      </p>
                      <p className="max-w-full text-black dark:text-white text-[10px]">
                        {segment.destination.name} {segment.destination.type} (
                        {segment.destination.flightPlaceId})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                      <MdOutlineAirlineSeatLegroomReduced size={14} />
                      <p className="text-[12px]">
                        Below average legroom (31 in)
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <FaWifi size={14} />
                      <p className="text-[12px]">Wi-Fi for a fee</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <MdOutlineUsb size={14} />
                      <p className="text-[12px]">In-seat USB outlet</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <MdOndemandVideo size={14} />
                      <p className="text-[12px]">On-demand video</p>
                    </div>
                  </div>
                </div>
                <p
                  className={`${
                    idx < flightInfo.segments.length - 1
                      ? "border-b border-[#dadce0]"
                      : ""
                  } pt-2 py-4`}
                >
                  {segment.marketingCarrier.name}
                </p>
                {idx < flightInfo.segments.length - 1 && (
                  <p className="border-b border-[#dadce0] py-4">
                    {Math.floor(LayoverTime / 60)} hr {LayoverTime % 60} min
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
}

export default MaximizedListItemResult;
