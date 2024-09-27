import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useWeather } from "../../hooks";
import { WeatherProps } from "./weather.definitions";
import { getTemp } from "../../utils";
import { containerStyles } from "./weather.styles";

export default function Weather(props: WeatherProps): JSX.Element | null {
  const { cityId } = props;

  const { isLoading, error, data, getData } = useWeather();

  const hasData = cityId && !isLoading && !error && data;

  useEffect(() => {
    (async () => cityId && (await getData(cityId)))();
  }, [cityId]);

  if (!hasData) return null;

  return (
    <Box sx={containerStyles}>
      <Typography variant="body1">{data?.weather?.length && data.weather[0].main}</Typography>
      <Typography variant="body1" gutterBottom>
        {data?.weather?.length && data.weather[0].description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data?.main?.temp && getTemp(data.main.temp)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data?.wind?.speed && `${data?.wind?.speed} m/s`}
      </Typography>
    </Box>
  );
}
