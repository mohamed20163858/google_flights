enum TripType {
  RoundTrip = "Round trip",
  OneWay = "One way",
}
interface TripSelectorProps {
  tripType: TripType;
  setTripType: (tripType: TripType) => void;
}
function TripSelector({ tripType, setTripType }: TripSelectorProps) {
  interface HandleChangeEvent {
    target: {
      value: string;
    };
  }

  const handleChange = (event: HandleChangeEvent) => {
    setTripType(event.target.value as TripType);
  };

  return (
    <select
      id="tripType"
      value={tripType}
      onChange={handleChange}
      className="p-2 border rounded-md"
    >
      <option value="Round trip">Round trip</option>
      <option value="One way">One way</option>
    </select>
  );
}

export default TripSelector;
