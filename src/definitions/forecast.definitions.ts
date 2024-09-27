import { WeatherClouds, WeatherItem, WeatherMain, WeatherSys, WeatherWind } from "./";

export interface ForecastMain extends WeatherMain {
  temp_kf?: number;
}

export interface ForecastWind extends WeatherWind {
  gust?: number;
}

export interface Precipitation {
  "3h"?: number;
}

export interface ForecastItem {
  dt?: number;
  main?: WeatherMain;
  weather?: WeatherItem[];
  clouds?: WeatherClouds;
  wind?: WeatherWind;
  visibility?: number;
  pop?: number;
  rain?: Precipitation;
  sys?: WeatherSys;
  dt_txt?: string;
}

export interface ForecastData {
  cod?: string;
  message?: number;
  cnt?: number;
  list?: ForecastItem[];
}
