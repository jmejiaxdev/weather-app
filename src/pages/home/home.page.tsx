import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CitiesComboBox, Forecast, Weather } from "../../components";
import { City } from "../../definitions";
import { buttonStyles, containerStyles } from "./home.styles";

export default function Home() {
  const [cityId, setCityId] = useState<City["id"]>();
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const handleCityChange = (cityId?: City["id"]) => {
    setCityId(cityId);

    if (!cityId) setShowForecast(false);
  };

  const handleSeeForecastClick = (showForecast: boolean) => () => {
    setShowForecast(showForecast);
  };

  return (
    <Box sx={containerStyles}>
      <CitiesComboBox onChange={handleCityChange} />
      <Weather cityId={cityId} />
      <Box sx={buttonStyles}>
        {cityId && !showForecast && (
          <Button variant="contained" onClick={handleSeeForecastClick(true)}>
            See forecast
          </Button>
        )}
        {cityId && showForecast && (
          <Button variant="outlined" onClick={handleSeeForecastClick(false)}>
            Close
          </Button>
        )}
      </Box>

      {showForecast && <Forecast cityId={cityId} />}
    </Box>
  );
}
