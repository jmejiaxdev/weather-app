import { useState } from "react";
import { Env } from "../../config";
import { ForecastData } from "../../definitions";
import { UseForecast } from "./useForecast.definitions";

export default function useForecast(): UseForecast {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = async (cityId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Env.api.url.forecast}?id=${cityId}&appid=${Env.api.appId}`);

      const data = await response.json();

      if (response.ok) {
        setData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError((error as any)?.message);
      console.error("Error fetching forecast data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, getData };
}
