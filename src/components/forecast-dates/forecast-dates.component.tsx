import { Box, Button } from "@mui/material";
import { useMemo } from "react";
import { ForecastDatesProps } from "./forecast-dates.definitions";
import { formatDMMM } from "../../utils";
import { containerStyles } from "./forecast-dates.styles";

export default function ForecastDates(props: ForecastDatesProps): JSX.Element {
  const { forecast, date, onClick } = props;

  const forecastDates = useMemo(() => {
    if (!date) return;

    const forecastDates = forecast?.list?.map((forecastItem) => formatDMMM(forecastItem.dt_txt));
    return Array.from(new Set(forecastDates));
  }, [date, forecast?.list]);

  const handleButtonClick = (date: string) => () => {
    onClick && onClick(date);
  };

  return (
    <Box sx={containerStyles}>
      {forecastDates?.map((date, index) => (
        <Button key={index} variant="text" onClick={handleButtonClick(date)}>
          {date}
        </Button>
      ))}
    </Box>
  );
}
