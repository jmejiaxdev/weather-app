import { renderHook, act } from "@testing-library/react";
import useWeather from "./useWeather.hook";

jest.mock("../../config", () => ({
  Env: {
    api: {
      url: {
        weather: "https://mock-weather-api.com",
      },
      appId: "mockAppId",
    },
  },
}));

describe("useWeather Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start with initial state", () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should set loading state when fetching data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false); // Ensure it's false after the fetch completes
  });

  it("should fetch weather data successfully", async () => {
    const mockWeatherData = {
      weather: [{ main: "Clear", description: "clear sky" }],
      main: { temp: 300 },
      wind: { speed: 5 },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockWeatherData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error from API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "City not found" }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getData(999);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("City not found");
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network Error");
  });
});
