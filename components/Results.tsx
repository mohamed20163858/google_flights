import { ResultsProps } from "@/types/flight";
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
    </div>
  );
}

export default Results;
