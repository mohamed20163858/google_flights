export interface Flight {
  entityId: string;
  skyId: string;
  flightPlaceType: string;
  localizedName: string;
  country: string;
}
export interface CityAutoCompleteTextInputProps {
  placeholder: string;
  suggestion: Flight;
  setSuggestion: (suggestion: Flight) => void;
}
export interface SearchFormProps {
  setFlightInfos: (flightInfos: FlightInfo[]) => void;
}
export interface ResultsProps {
  origin: Flight;
  destination: Flight;
  flightInfos: FlightInfo[];
}
export interface DateProps {
  date: string;
  setDate: (date: string) => void;
}
export interface AirportInfo {
  flightPlaceId: string;
  name: string;
  type: string;
  country: string;
}
export interface Segment {
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  origin: AirportInfo;
  destination: AirportInfo;
  marketingCarrier: { name: string; alternateId: string };
}
export interface logo {
  alternateId: string;
  logoUrl: string;
}
export interface carriersProps {
  marketing: logo[];
}
export interface FlightInfo {
  id: string;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  segments: Segment[];
  stopCount: number;
  timeDeltaInDays: number;
  logosURL: logo[];
  carriers: carriersProps;
  price: string;
  score: number;
}
