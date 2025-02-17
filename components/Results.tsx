import { ResultsProps } from "@/types/flight";
import { getTimeDifferenceInMinutes } from "@/utils/timeHelper";
import MinimizedListResult from "./MinimizedListResult";

function Results({ origin, destination, flightInfos }: ResultsProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ul className="w-full flex flex-col justify-center items-center">
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

            const onlyLayoverTime =
              flightInfo.stopCount === 1
                ? getTimeDifferenceInMinutes(
                    flightInfo.segments[1].departure,
                    flightInfo.segments[0].arrival
                  )
                : 0;

            return (
              <MinimizedListResult
                key={flightInfo.id}
                origin={origin}
                destination={destination}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
                departureDay={departureDay}
                arrivalDay={arrivalDay}
                onlyLayoverTime={onlyLayoverTime}
                flightInfo={flightInfo}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Results;
