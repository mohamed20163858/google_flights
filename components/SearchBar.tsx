// app/components/SearchBar.tsx
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: {
    origin: string;
    destination: string;
    date: string;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({ origin, destination, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md mb-4"
    >
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Search Flights
      </button>
    </form>
  );
}
