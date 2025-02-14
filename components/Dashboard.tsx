// app/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";

interface Flight {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
}

export default function HomePage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async (query: {
    origin: string;
    destination: string;
    date: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      // Build query parameters based on your API requirements
      const params = new URLSearchParams({
        origin: query.origin,
        destination: query.destination,
        date: query.date,
      });

      // Replace with your actual RapidAPI endpoint for the Sky Scrapper
      const response = await fetch(
        `https://api.example.com/sky-scrapper?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
            // "X-RapidAPI-Host": "apiheya-api-sky-scrapper.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const data = await response.json();
      // Assuming the API returns an object with a 'flights' array
      setFlights(data.flights || []);
    } catch (err: unknown) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={searchFlights} />
      {loading && <p>Loading flights...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight) => (
          <div key={flight.id} className="p-4 border rounded shadow">
            <h2 className="font-bold">{flight.airline}</h2>
            <p>
              {flight.departure} &rarr; {flight.arrival}
            </p>
            <p>${flight.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
