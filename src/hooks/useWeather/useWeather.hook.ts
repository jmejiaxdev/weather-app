import { useState } from "react";
import { Env } from "../../config";
import { WeatherData } from "../../definitions";
import { UseWeather } from "./useWeather.definitions";

export default function useWeather(): UseWeather {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = async (cityId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Env.api.url.weather}?id=${cityId}&appid=${Env.api.appId}`);

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
