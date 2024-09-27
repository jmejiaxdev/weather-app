import { render, screen, fireEvent } from "@testing-library/react";
import ForecastDates from "./forecast-dates.component";
import { formatDMMM } from "../../utils";

jest.mock("../../utils", () => ({
  formatDMMM: jest.fn(),
}));

describe("ForecastDates Component", () => {
  const mockOnClick = jest.fn();
  const mockForecast = {
    list: [{ dt_txt: "2024-09-25 12:00:00" }, { dt_txt: "2024-09-25 15:00:00" }, { dt_txt: "2024-09-26 12:00:00" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatDMMM as jest.Mock)
      .mockReturnValueOnce("25 Sep")
      .mockReturnValueOnce("25 Sep")
      .mockReturnValueOnce("26 Sep");
  });

  test("renders forecast dates buttons correctly", () => {
    render(<ForecastDates forecast={mockForecast} date="25 Sep" onClick={mockOnClick} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2); // Unique dates: 25 Sep and 26 Sep

    expect(buttons[0]).toHaveTextContent("25 Sep");
    expect(buttons[1]).toHaveTextContent("26 Sep");
  });

  test("calls onClick handler when a button is clicked", () => {
    render(<ForecastDates forecast={mockForecast} date="25 Sep" onClick={mockOnClick} />);

    const button = screen.getByText("25 Sep");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledWith("25 Sep");
  });

  test("does not render buttons if no date is provided", () => {
    render(<ForecastDates forecast={mockForecast} date={undefined} onClick={mockOnClick} />);

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  test("does not call onClick if no onClick function is provided", () => {
    render(<ForecastDates forecast={mockForecast} date="25 Sep" onClick={undefined} />);

    const button = screen.getByText("25 Sep");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
