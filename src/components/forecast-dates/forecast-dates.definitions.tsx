import { ForecastData } from "../../definitions";

export interface ForecastDatesProps {
  forecast?: ForecastData;
  date?: string;
  onClick?: (date: string) => void;
}
