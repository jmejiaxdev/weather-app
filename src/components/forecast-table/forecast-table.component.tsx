import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import { formatDMMM, formatDMMMhA, getTemp } from "../../utils";
import { ForecastTableProps } from "./forecast-table.definitions";

export default function ForecastTable(props: ForecastTableProps): JSX.Element | null {
  const { forecast, date } = props;

  const forecastItems = useMemo(
    () => forecast?.list?.filter((forecastItem) => formatDMMM(forecastItem.dt_txt) === date),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date]
  );

  if (!forecastItems?.length) return null;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Temp</TableCell>
              <TableCell align="right">Min temp&nbsp;(g)</TableCell>
              <TableCell align="right">Max temp&nbsp;(g)</TableCell>
              <TableCell align="right">Wind&nbsp;(g)</TableCell>
              <TableCell align="right">Description&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastItems?.map((forecastItem) => (
              <TableRow key={forecastItem.dt} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {formatDMMMhA(forecastItem?.dt_txt)}
                </TableCell>
                <TableCell align="right">{getTemp(forecastItem.main?.temp)}</TableCell>
                <TableCell align="right">{getTemp(forecastItem.main?.temp_min)}</TableCell>
                <TableCell align="right">{getTemp(forecastItem.main?.temp_max)}</TableCell>
                <TableCell align="right">{forecastItem.wind?.speed && `${forecastItem.wind?.speed} m/sec`}</TableCell>
                <TableCell align="right">{forecastItem?.weather?.length && forecastItem.weather[0].main}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
