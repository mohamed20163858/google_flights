import Image from "next/image";
import { getTimeDifferenceInMinutes } from "@/utils/timeHelper";
import { SlArrowDown } from "react-icons/sl";
import { FlightInfo } from "@/types/flight";
interface MinimizedListItemResultProps {
  flightInfo: FlightInfo;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}
function MinimizedListItemResult({
  flightInfo,
  isExpanded,
  setIsExpanded,
}: MinimizedListItemResultProps) {
  // get departure and arrival time for the whole trip and process info to be in 0 -> 12 am/pm format
  const departureTime = flightInfo.departure.split("T")[1].split(":");
  const arrivalTime = flightInfo.arrival.split("T")[1].split(":");
  const departureDay = +departureTime[0] >= 12 ? "PM" : "AM";
  const arrivalDay = +arrivalTime[0] >= 12 ? "PM" : "AM";
  departureTime[0] = (+departureTime[0] % 12 || 12).toString();
  arrivalTime[0] = (+arrivalTime[0] % 12 || 12).toString();
  // calculate the layover time if there is only 1 stop

  const onlyLayoverTime =
    flightInfo.stopCount === 1
      ? getTimeDifferenceInMinutes(
          flightInfo.segments[1].departure,
          flightInfo.segments[0].arrival
        )
      : 0;
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
          {flightInfo.segments[0].origin.flightPlaceId}-
          {
            flightInfo.segments[flightInfo.segments.length - 1].destination
              .flightPlaceId
          }
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
      <div
        className="rounded-full w-[40px] h-[40px] hover:bg-[#f1f3f4] hover:cursor-pointer flex justify-center items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SlArrowDown />
      </div>
    </li>
  );
}

export default MinimizedListItemResult;
