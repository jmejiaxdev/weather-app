import { render, screen } from "@testing-library/react";
import ForecastTable from "./forecast-table.component";
import { formatDMMM, formatDMMMhA, getTemp } from "../../utils";

jest.mock("../../utils", () => ({
  formatDMMM: jest.fn(),
  formatDMMMhA: jest.fn(),
  getTemp: jest.fn(),
}));

describe("ForecastTable Component", () => {
  const mockForecast = {
    list: [
      {
        dt: 1,
        dt_txt: "2024-09-26 12:00:00",
        main: {
          temp: 293.15,
          temp_min: 291.15,
          temp_max: 295.15,
        },
        wind: {
          speed: 3.5,
        },
        weather: [
          {
            main: "Cloudy",
          },
        ],
      },
      {
        dt: 2,
        dt_txt: "2024-09-27 12:00:00",
        main: {
          temp: 300.15,
          temp_min: 298.15,
          temp_max: 302.15,
        },
        wind: {
          speed: 4.0,
        },
        weather: [
          {
            main: "Sunny",
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the forecast table for a specific date", () => {
    (formatDMMM as jest.Mock).mockReturnValueOnce("26 Sep");
    (formatDMMMhA as jest.Mock).mockReturnValueOnce("26 Sep 12:00 PM");
    (getTemp as jest.Mock)
      .mockReturnValueOnce("20°C")
      .mockReturnValueOnce("18°C")
      .mockReturnValueOnce("22°C");

    render(<ForecastTable forecast={mockForecast} date="26 Sep" />);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(2); // 1 header row + 1 data row

    expect(screen.getByText("26 Sep 12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText("3.5 m/sec")).toBeInTheDocument();
  });
});
