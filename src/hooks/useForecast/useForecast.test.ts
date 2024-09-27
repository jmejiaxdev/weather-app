import { renderHook, act } from "@testing-library/react";
import useForecast from "./useForecast.hook";

// Mock environment config
jest.mock("../../config", () => ({
  Env: {
    api: {
      url: {
        forecast: "https://mock-forecast-api.com",
      },
      appId: "mockAppId",
    },
  },
}));

describe("useForecast Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start with initial state", () => {
    const { result } = renderHook(() => useForecast());

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

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false); // Ensure it's false after fetch completes
  });

  it("should fetch data successfully", async () => {
    const mockData = { list: [{ dt_txt: "2024-09-25 12:00:00" }] };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "City not found" }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.getData(999);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("City not found");
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.getData(123);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network Error");
  });
});
