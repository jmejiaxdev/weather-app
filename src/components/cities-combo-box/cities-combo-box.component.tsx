import { Autocomplete, AutocompleteInputChangeReason, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useMemo } from "react";
import { Cities } from "../../config";
import { CitiesComboBoxProps, CitiesComboBoxValue } from "./cities-combo-box.definitions";

export default function CitiesComboBox(props: CitiesComboBoxProps): JSX.Element | null {
  const { onChange } = props;

  const options = useMemo(() => Cities.map((city) => ({ key: city.id, label: city.name })), []);

  const handleChange = (_event: SyntheticEvent, value: CitiesComboBoxValue) => {
    const city = Cities.find((city) => city.id === value?.key);
    onChange && onChange(city?.id);
  };

  const handleInputChange = (_event: SyntheticEvent, _value: string, reason: AutocompleteInputChangeReason) => {
    if (reason === "clear") {
      onChange && onChange();
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label="City" />}
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
      <Typography variant="caption" gutterBottom>
        Please select city to see the forecast
      </Typography>
    </>
  );
}
