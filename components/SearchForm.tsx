"use client";
import { useEffect, useState } from "react";
import CityAutocompleteTextInput from "./CityAutocompleteTextInput";
import { FaExchangeAlt } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

import { SearchFormProps, FlightInfo, Flight } from "@/types/flight";
// import Date from "./Date";
import CustomDateInput from "./CustomDateInput";
import SimpleDropDownMenu from "./TripSelector";
import FlightClassSelector from "./FlightClassSelector";
import PassengerSelector from "./PassangerSelector";

enum TripType {
  RoundTrip = "Round trip",
  OneWay = "One way",
}
enum FlightClass {
  Economy = "economy",
  PremiumEconomy = "premium_economy",
  Business = "business",
  First = "first",
}
interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}
function SearchForm({
  setFlightInfos,
  isSubmitted,
  setIsSubmitted,
}: SearchFormProps) {
  const [origin, setOrigin] = useState<Flight>({
    entityId: "",
    skyId: "",
    flightPlaceType: "",
    localizedName: "",
    country: "",
  });
  const [destination, setDestination] = useState<Flight>({
    entityId: "",
    skyId: "",
    flightPlaceType: "",
    localizedName: "",
    country: "",
  });
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState<TripType>(TripType.RoundTrip);
  const [selectedClass, setSelectedClass] = useState<FlightClass>(
    FlightClass.Economy
  );
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [rotated, setRotated] = useState(false); //to rotate button

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/flights/getNearByAirports?lat=${lat}&lng=${long}&locale=en-US`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setOrigin({
              skyId: data?.data?.current?.skyId,
              entityId: data?.data?.current?.entityId,
              flightPlaceType: data?.data?.current?.navigation?.entityType,
              localizedName: data?.data?.current?.navigation?.localizedName,
              country: data?.data?.current?.presentation?.subtitle,
            });
          });
      },
      (error) => {
        console.log("Error getting location:", error?.message);
      }
    );
  }, [setOrigin]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/v2/flights/searchFlights?originSkyId=${origin.skyId}&destinationSkyId=${
        destination.skyId
      }&originEntityId=${origin.entityId}&destinationEntityId=${
        destination.entityId
      }&date=${departureDate}&cabinClass=${selectedClass}&adults=${
        passengers.adults
      }&childrens=${passengers.children}&infants=${passengers.infants}${
        tripType === TripType.RoundTrip && `&returnDate=${returnDate}`
      }`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    const newData = await data?.data?.itineraries
      ?.map(
        (entity: {
          legs: FlightInfo[];
          price: { formatted: string };
          score: number;
        }) => {
          return {
            ...entity.legs[0],
            price: entity.price.formatted,
            score: entity.score,
          };
        }
      )
      .map((entity: FlightInfo) => {
        return {
          id: entity.id,
          departure: entity.departure,
          arrival: entity.arrival,
          durationInMinutes: entity.durationInMinutes,
          segments: entity.segments.map((segment) => {
            return {
              departure: segment.departure,
              arrival: segment.arrival,
              durationInMinutes: segment.durationInMinutes,
              flightNumber: segment.flightNumber,
              marketingCarrier: segment.marketingCarrier,
              origin: segment.origin,
              destination: segment.destination,
            };
          }),
          stopCount: entity.stopCount,
          timeDeltaInDays: entity.timeDeltaInDays,
          logosURL: entity.carriers.marketing.map((ele) => {
            return { logoUrl: ele.logoUrl, alternateId: ele.alternateId };
          }),
          price: entity.price,
          score: entity.score,
        };
      });
    console.log(newData);
    setFlightInfos(newData);
    setIsSubmitted(true);
  };
  useEffect(() => {
    const updateResults = async () => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/v2/flights/searchFlights?originSkyId=${
          origin.skyId
        }&destinationSkyId=${destination.skyId}&originEntityId=${
          origin.entityId
        }&destinationEntityId=${
          destination.entityId
        }&date=${departureDate}&cabinClass=${selectedClass}&adults=${
          passengers.adults
        }&childrens=${passengers.children}&infants=${passengers.infants}${
          tripType === TripType.RoundTrip && `&returnDate=${returnDate}`
        }`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_VALUE as string,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const newData = await data?.data?.itineraries
        ?.map(
          (entity: {
            legs: FlightInfo[];
            price: { formatted: string };
            score: number;
          }) => {
            return {
              ...entity.legs[0],
              price: entity.price.formatted,
              score: entity.score,
            };
          }
        )
        .map((entity: FlightInfo) => {
          return {
            id: entity.id,
            departure: entity.departure,
            arrival: entity.arrival,
            durationInMinutes: entity.durationInMinutes,
            segments: entity.segments.map((segment) => {
              return {
                departure: segment.departure,
                arrival: segment.arrival,
                durationInMinutes: segment.durationInMinutes,
                flightNumber: segment.flightNumber,
                marketingCarrier: segment.marketingCarrier,
                origin: segment.origin,
                destination: segment.destination,
              };
            }),
            stopCount: entity.stopCount,
            timeDeltaInDays: entity.timeDeltaInDays,
            logosURL: entity.carriers.marketing.map((ele) => {
              return { logoUrl: ele.logoUrl, alternateId: ele.alternateId };
            }),
            price: entity.price,
            score: entity.score,
          };
        });
      console.log(newData);
      setFlightInfos(newData);
      setIsSubmitted(true);
    };
    if (
      origin.entityId &&
      destination.entityId &&
      isSubmitted &&
      ((tripType === TripType.OneWay && departureDate) ||
        (tripType === TripType.RoundTrip && departureDate && returnDate))
    ) {
      updateResults();
    }
  }, [
    origin.entityId,
    destination.entityId,
    isSubmitted,
    tripType,
    departureDate,
    returnDate,
    origin.skyId,
    destination.skyId,
    passengers.adults,
    passengers.children,
    passengers.infants,
    selectedClass,
    setFlightInfos,
    setIsSubmitted,
  ]);

  return (
    <form
      className={`flex flex-col  gap-4 my-[40px] ${
        !isSubmitted &&
        "mx-[16px] pt-[8px] pb-[48px] px-[16px] rounded-[8px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]"
      }`}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4">
        <SimpleDropDownMenu tripType={tripType} setTripType={setTripType} />
        <PassengerSelector
          passengers={passengers}
          setPassengers={setPassengers}
        />
        <FlightClassSelector
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center">
          <CityAutocompleteTextInput
            placeholder="Where from ?"
            suggestion={origin}
            setSuggestion={setOrigin}
          />
          <button
            type="button"
            className={`relative z-10 flex justify-center items-center w-[30px] h-[30px] border borde-[#dadce0] rounded-[30px] ml-[-12px] bg-white  ${
              origin.skyId && destination.skyId
                ? "hover:bg-[#f1f3f4] "
                : "text-[#dadce0]"
            } `}
            disabled={origin.skyId && destination.skyId ? false : true}
            onClick={() => {
              setOrigin({ ...destination });
              setDestination({ ...origin });
              setRotated(!rotated);
            }}
          >
            <FaExchangeAlt
              className={`transform transition-transform duration-300 ${
                rotated ? "rotate-180" : ""
              }`}
            />
          </button>
          <div className="ml-[-12px]">
            <CityAutocompleteTextInput
              placeholder="Where to ?"
              suggestion={destination}
              setSuggestion={setDestination}
            />
          </div>
        </div>
        <CustomDateInput
          date={departureDate}
          setDate={setDepartureDate}
          placeholder="Departure"
          minDate={new Date().toISOString().split("T")[0]}
        />{" "}
        {tripType === TripType.RoundTrip && (
          <CustomDateInput
            date={returnDate}
            setDate={setReturnDate}
            placeholder="Return"
            minDate={departureDate || new Date().toISOString().split("T")[0]}
            disabled={!departureDate}
          />
        )}
        {/* <Date date={departureDate} setDate={setDepartureDate} />
        {tripType === TripType.RoundTrip && (
          <Date date={returnDate} setDate={setReturnDate} />
        )} */}
      </div>
      {!isSubmitted && (
        <button
          type="submit"
          disabled={
            !(
              origin.entityId &&
              destination.entityId &&
              ((tripType === TripType.OneWay && departureDate) ||
                (tripType === TripType.RoundTrip &&
                  departureDate &&
                  returnDate))
            )
          }
          className={`flex items-center gap-2 w-fit px-4 py-2 ${
            origin.entityId &&
            destination.entityId &&
            ((tripType === TripType.OneWay && departureDate) ||
              (tripType === TripType.RoundTrip && departureDate && returnDate))
              ? "bg-[#1a73e8] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }  self-center rounded-[24px] mb-[-64px] mt-[44px]`}
        >
          <MdSearch size={20} />
          <p>Search</p>
        </button>
      )}
    </form>
  );
}

export default SearchForm;
