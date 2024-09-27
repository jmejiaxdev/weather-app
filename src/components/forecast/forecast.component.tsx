import { useEffect, useState } from "react";
import { useForecast } from "../../hooks";
import { formatDMMM } from "../../utils";
import { ForecastDates, ForecastTable } from "../../components";
import { ForecastProps } from "./forecast.definitions";

export default function Forecast(props: ForecastProps) {
  const { cityId } = props;

  const { isLoading, error, data, getData } = useForecast();

  const [date, setDate] = useState<string>(formatDMMM(new Date()));

  const hasData = cityId && !isLoading && !error && data;

  const handleButtonClick = (date: string) => {
    setDate(date);
  };

  useEffect(() => {
    (async () => cityId && (await getData(cityId)))();
  }, [cityId]);

  if (!hasData) return null;

  return (
    <>
      <ForecastTable forecast={data} date={date} />
      <ForecastDates forecast={data} date={date} onClick={handleButtonClick} />
    </>
  );
}
