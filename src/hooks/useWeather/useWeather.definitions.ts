import { WeatherData } from "../../definitions";

export interface UseWeather {
  isLoading: boolean;
  data: WeatherData | null;
  error: string | null;
  getData: (cityId: number) => void;
}
