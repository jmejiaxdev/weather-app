import { render, screen, waitFor } from "@testing-library/react";
import { useForecast } from "../../hooks";
import { formatDMMM } from "../../utils";
import Forecast from "./forecast.component";

jest.mock("../../hooks", () => ({
  useForecast: jest.fn(),
}));

jest.mock("../../utils", () => ({
  formatDMMM: jest.fn(),
}));

jest.mock("../../components", () => ({
  ForecastTable: jest.fn(() => <div>Forecast Table</div>),
  ForecastDates: jest.fn(() => <div>Forecast Dates</div>),
}));

describe("Forecast Component", () => {
  const mockGetData = jest.fn();
  const mockUseForecast = {
    isLoading: false,
    error: null,
    data: { list: [] },
    getData: mockGetData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useForecast as jest.Mock).mockReturnValue(mockUseForecast);
    (formatDMMM as jest.Mock).mockReturnValue("26 Sep");
  });

  test("renders null if no data, isLoading, or error", () => {
    (useForecast as jest.Mock).mockReturnValue({
      ...mockUseForecast,
      data: null,
    });

    render(<Forecast cityId={1} />);

    const forecastElement = screen.queryByText(/Forecast/i);
    expect(forecastElement).toBeNull();
  });

  test("calls getData when cityId is provided", async () => {
    render(<Forecast cityId={1} />);

    await waitFor(() => {
      expect(mockGetData).toHaveBeenCalledWith(1);
    });
  });
});
