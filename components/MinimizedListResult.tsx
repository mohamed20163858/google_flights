import Image from "next/image";
import { SlArrowDown } from "react-icons/sl";
import { FlightInfo, Flight } from "@/types/flight";
interface MinimizedListResultProps {
  flightInfo: FlightInfo;
  departureTime: string[];
  arrivalTime: string[];
  departureDay: string;
  arrivalDay: string;
  onlyLayoverTime: number;
  origin: Flight;
  destination: Flight;
}
function MinimizedListResult({
  flightInfo,
  departureTime,
  departureDay,
  arrivalTime,
  arrivalDay,
  origin,
  destination,
  onlyLayoverTime,
}: MinimizedListResultProps) {
  return (
    <li className="flex gap-2 justify-between items-center max-w-[736px] w-full p-4 border border-[#dadce0] rounded-lg ">
      <div>
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
      </div>
      <div className="flex flex-col">
        <p>
          {departureTime[0]}:{departureTime[1]} {departureDay} -{" "}
          {arrivalTime[0]}:{arrivalTime[1]} {arrivalDay}
        </p>
        <p>
          {[
            ...new Set(
              flightInfo.segments.map(
                (segment) => segment.marketingCarrier.name
              )
            ),
          ].join(", ")}
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          {Math.floor(flightInfo.durationInMinutes / 60)} hr{" "}
          {flightInfo.durationInMinutes % 60} min
        </p>
        <p>
          {origin.skyId}-{destination.skyId}
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          {flightInfo.stopCount > 0
            ? `${flightInfo.stopCount} stop`
            : "Nonstop"}
        </p>
        {flightInfo.stopCount === 1 && (
          <p>
            {Math.floor(onlyLayoverTime / 60)} hrs {onlyLayoverTime % 60} min{" "}
            {flightInfo.segments[0].destination.flightPlaceId}
          </p>
        )}
        {flightInfo.stopCount > 1 && (
          <p>
            {flightInfo.segments
              .map((segment) => segment.destination.flightPlaceId)
              .slice(0, flightInfo.segments.length - 1)
              .join(", ")}
          </p>
        )}
      </div>
      <div>
        <p>{flightInfo.price}</p>
      </div>
      <div className="rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center">
        <SlArrowDown />
      </div>
    </li>
  );
}

export default MinimizedListResult;
