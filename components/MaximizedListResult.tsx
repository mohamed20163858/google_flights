import Image from "next/image";
import { SlArrowUp } from "react-icons/sl";
import { FlightInfo, Flight } from "@/types/flight";
import { formatDate } from "@/utils/timeHelper";
import { MdOutlineAirlineSeatLegroomReduced } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdOutlineUsb } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";

interface MaximizedListResultProps {
  flightInfo: FlightInfo;
  departureTime: string[];
  arrivalTime: string[];
  departureDay: string;
  arrivalDay: string;
  onlyLayoverTime: number;
  origin: Flight;
  destination: Flight;
}
function MaximizedListResult({
  flightInfo,
  departureTime,
  departureDay,
  arrivalTime,
  arrivalDay,
  origin,
  destination,
  onlyLayoverTime,
}: MaximizedListResultProps) {
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
          <button className="border border-[#dadce0] rounded-[16px] text-[#1A73E8] px-[23px] py-[4px]">
            Select flight
          </button>
          <p>{flightInfo.price}</p>
          <div className="rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center">
            <SlArrowUp />
          </div>
        </div>
      </div>
      <div className=" max-w-[736px] w-full  border border-[#dadce0]  mb-4 ">
        {flightInfo.segments.map((segment) => {
          const url = flightInfo.logosURL.find(
            (logo) => logo.alternateId === segment.marketingCarrier.alternateId
          )?.logoUrl;
          console.log(url);
          return (
            <div key={segment.flightNumber} className="flex py-4 pl-4 gap-4">
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
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
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
                <p className="border-b border-[#dadce0]">bye</p>
                <p className="border-b border-[#dadce0]">hours</p>
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
}

export default MaximizedListResult;
