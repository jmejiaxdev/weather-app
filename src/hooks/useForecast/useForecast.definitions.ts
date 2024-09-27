import { ForecastData } from "../../definitions";

export interface UseForecast {
  isLoading: boolean;
  data: ForecastData | null;
  error: string | null;
  getData: (cityId: number) => void;
}
