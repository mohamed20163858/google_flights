export interface Suggestion {
  entityId: string;
  skyId: string;
  flightPlaceType: string;
  localizedName: string;
  country: string;
}
export interface placeholderProps {
  placeholder: string;
  defaultSuggestion?: Suggestion;
  debounceTime?: number;
}
