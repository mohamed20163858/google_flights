import Image from "next/image";
import { getTimeDifferenceInMinutes } from "@/utils/timeHelper";
import { v4 as uuidv4 } from "uuid";

import { SlArrowUp } from "react-icons/sl";
import { FlightInfo } from "@/types/flight";
import { formatDate } from "@/utils/timeHelper";
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
  const departureDate = formatDate(flightInfo.departure.split("T")[0]);
  return (
    <li className="flex flex-col w-full items-center">
      <div className="flex gap-2 justify-between items-center max-w-[736px] w-full p-4 border border-[#dadce0] rounded-t-lg">
        <div className="flex gap-[40px] items-center">
          <Image
            src={
              flightInfo.logosURL.length > 1
                ? "/multi.png"
                : flightInfo.logosURL[0].logoUrl
            }
            alt="Airport Image"
            width={40} // Set width
            height={40} // Set height
            priority // Ensures it loads immediately
          />
          <p className="flex gap-2">
            <span>Departure</span> <span className="mt-[-5px]">.</span>{" "}
            <span>{departureDate}</span>
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="button"
            className="border border-[#dadce0] rounded-[16px] text-[#1A73E8] px-[23px] py-[4px]"
          >
            Select flight
          </button>
          <p>{flightInfo.price}</p>
          <div
            className="rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <SlArrowUp />
          </div>
        </div>
      </div>
      <div className=" max-w-[736px] w-full  border border-[#dadce0] pt-6 mb-4 ">
        {flightInfo.segments.map((segment, idx) => {
          const url = flightInfo.logosURL.find(
            (logo) => logo.alternateId === segment.marketingCarrier.alternateId
          )?.logoUrl;
          // get departure and arrival time for the whole trip and process info to be in 0 -> 12 am/pm format
          const departureTime = segment.departure.split("T")[1].split(":");
          const arrivalTime = segment.arrival.split("T")[1].split(":");
          const departureDay = +departureTime[0] >= 12 ? "PM" : "AM";
          const arrivalDay = +arrivalTime[0] >= 12 ? "PM" : "AM";
          departureTime[0] = (+departureTime[0] % 12 || 12).toString();
          arrivalTime[0] = (+arrivalTime[0] % 12 || 12).toString();
          // calculate the layover time

          const LayoverTime =
            idx < flightInfo.segments.length - 1
              ? getTimeDifferenceInMinutes(
                  flightInfo.segments[idx + 1].departure,
                  flightInfo.segments[idx].arrival
                )
              : 0;
          return (
            <div key={uuidv4()} className="flex mt-4 pl-4 gap-4">
              <div className="flex justify-between items-center gap-[40px] h-[76px]">
                <div className="w-[40px] h-[40px]">
                  {flightInfo.logosURL.length > 1 && (
                    <Image
                      src={url || "/multi.png"}
                      alt="Airport Image"
                      width={40} // Set width
                      height={40} // Set height
                      priority // Ensures it loads immediately
                    />
                  )}
                </div>
                <div className="grow self-start">
                  <div className="w-[12px] h-[12px] border-2 border-[#dadce0] rounded-[12px] ml-[-4px]"></div>
                  <div className="border-l-4 border-dotted border-[#dadce0] h-[50px] w-[4px]   "></div>
                  <div className="w-[12px] h-[12px] border-2 border-[#dadce0] rounded-[12px] ml-[-4px]"></div>
                </div>
              </div>
              <div className="flex flex-col grow">
                <div className="flex justify-between ">
                  <div>
                    <p>
                      {" "}
                      {departureTime[0]}:{departureTime[1]} {departureDay} .{" "}
                      {segment.origin.name} {segment.origin.type} (
                      {segment.origin.flightPlaceId})
                    </p>
                    <p>
                      Travel time: {Math.floor(segment.durationInMinutes / 60)}{" "}
                      hr {segment.durationInMinutes % 60} min
                    </p>
                    <p>
                      {arrivalTime[0]}:{arrivalTime[1]} {arrivalDay}.{" "}
                      {segment.destination.name} {segment.destination.type} (
                      {segment.destination.flightPlaceId})
                    </p>
                  </div>

                  <div>
                    <div className="flex gap-2 items-center mr-[40px]">
                      <MdOutlineAirlineSeatLegroomReduced />
                      <p>Below average legroom (31 in)</p>
                    </div>
                    <div className="flex gap-2 items-center mr-[40px]">
                      <FaWifi />
                      <p>Wi-Fi for a fee</p>
                    </div>
                    <div className="flex gap-2 items-center mr-[40px]">
                      <MdOutlineUsb />
                      <p>In-seat USB outlet</p>
                    </div>
                    <div className="flex gap-2 items-center mr-[40px]">
                      <MdOndemandVideo />
                      <p>On-demand video</p>
                    </div>
                  </div>
                </div>
                <p
                  className={`${
                    idx < flightInfo.segments.length - 1
                      ? "border-b border-[#dadce0]"
                      : ""
                  } pt-2 py-6`}
                >
                  {segment.marketingCarrier.name}
                </p>
                {idx < flightInfo.segments.length - 1 && (
                  <p className="border-b border-[#dadce0] py-6">
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
