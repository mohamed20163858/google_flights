import { v4 as uuidv4 } from "uuid";

enum FlightClass {
  Economy = "economy",
  PremiumEconomy = "premium_economy",
  Business = "business",
  First = "first",
}

interface FlightClassSelectorProps {
  selectedClass: FlightClass;
  setSelectedClass: (selectedClass: FlightClass) => void;
}
export default function FlightClassSelector({
  selectedClass,
  setSelectedClass,
}: FlightClassSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value as FlightClass);
  };

  return (
    <select
      id="flightClass"
      value={selectedClass}
      onChange={handleChange}
      className="p-2 border rounded-md"
    >
      {Object.values(FlightClass).map((flightClass) => (
        <option key={uuidv4()} value={flightClass}>
          {flightClass}
        </option>
      ))}
    </select>
  );
}
