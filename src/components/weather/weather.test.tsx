import { render, screen, waitFor } from "@testing-library/react";
import Weather from "./weather.component";
import { useWeather } from "../../hooks";
import { getTemp } from "../../utils";

jest.mock("../../hooks", () => ({
  useWeather: jest.fn(),
}));

jest.mock("../../utils", () => ({
  getTemp: jest.fn(),
}));

describe("Weather Component", () => {
  const mockWeatherData = {
    weather: [
      {
        main: "Cloudy",
        description: "overcast clouds",
      },
    ],
    main: {
      temp: 293.15,
    },
    wind: {
      speed: 5.5,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders weather data when available", async () => {
    (useWeather as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockWeatherData,
      getData: jest.fn(),
    });
    (getTemp as jest.Mock).mockReturnValue("20°C");

    render(<Weather cityId={123} />);

    await waitFor(() => {
      expect(screen.getByText("Cloudy")).toBeInTheDocument();
    });

    expect(screen.getByText("overcast clouds")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("5.5 m/s")).toBeInTheDocument();
  });

  test("renders nothing if there is no data for the city", async () => {
    (useWeather as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
      getData: jest.fn(),
    });

    render(<Weather cityId={123} />);
    const weatherElement = screen.queryByText(/Weather/i);
    expect(weatherElement).toBeNull();
  });

  test("renders nothing while loading", async () => {
    (useWeather as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
      getData: jest.fn(),
    });

    render(<Weather cityId={123} />);
    const weatherElement = screen.queryByText(/Weather/i);
    expect(weatherElement).toBeNull();
  });

  test("renders nothing if there is an error", async () => {
    (useWeather as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Error fetching weather"),
      data: null,
      getData: jest.fn(),
    });

    render(<Weather cityId={123} />);
    const weatherElement = screen.queryByText(/Weather/i);
    expect(weatherElement).toBeNull();
  });
});
