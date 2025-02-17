import { ResultsProps } from "@/types/flight";
import Image from "next/image";
import { getTimeDifferenceFormatted } from "@/utils/timeHelper";

function Results({ origin, destination, flightInfos }: ResultsProps) {
  return (
    <div>
      <h1>Results</h1>
      <h2>origin entity id: {origin.entityId}</h2>
      <h2>origin sky id: {origin.skyId}</h2>
      <h2>destination entity id: {destination.entityId}</h2>
      <h2>destination sky id: {destination.skyId}</h2>
      {flightInfos &&
        flightInfos.map((flightInfo) => {
          return (
            <h4 key={flightInfo.id}>
              {flightInfo.segments[0].marketingCarrier.name}
            </h4>
          );
        })}
      <ul>
        {flightInfos &&
          flightInfos.map((flightInfo) => {
            // get departure and arrival time for the whole trip and process info to be in 0 -> 12 am/pm format
            const departureTime = flightInfo.departure.split("T")[1].split(":");
            const arrivalTime = flightInfo.arrival.split("T")[1].split(":");
            const departureDay = +departureTime[0] >= 12 ? "PM" : "AM";
            const arrivalDay = +arrivalTime[0] >= 12 ? "PM" : "AM";
            departureTime[0] = (+departureTime[0] % 12 || 12).toString();
            arrivalTime[0] = (+arrivalTime[0] % 12 || 12).toString();
            // calculate the layover time if there is only 1 stop
            const onlyLayoverTime = getTimeDifferenceFormatted(
              flightInfo.segments[1].departure,
              flightInfo.segments[0].arrival
            );
            return (
              <li key={flightInfo.id} className="flex gap-2">
                <div>
                  <Image
                    src={
                      flightInfo.logosURL.length > 1
                        ? "/multi.png"
                        : flightInfo.logosURL[0]
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
                      {onlyLayoverTime}{" "}
                      {flightInfo.segments[0].destination.flightPlaceId}
                    </p>
                  )}
                </div>
                <div></div>
                <div></div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Results;
