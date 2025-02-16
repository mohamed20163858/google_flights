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
  origin: Flight;
  setOrigin: (origin: Flight) => void;
  destination: Flight;
  setDestination: (destination: Flight) => void;
}
export interface ResultsProps {
  origin: Flight;
  destination: Flight;
}
export interface DateProps {
  date: string;
  setDate: (date: string) => void;
}
