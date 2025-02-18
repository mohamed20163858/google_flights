import { useState } from "react";

function SimpleDropDownMenu() {
  const [tripType, setTripType] = useState("Round trip");

  interface HandleChangeEvent {
    target: {
      value: string;
    };
  }

  const handleChange = (event: HandleChangeEvent) => {
    setTripType(event.target.value);
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

export default SimpleDropDownMenu;
