import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./home.page";

// Mock child components
jest.mock("../../components", () => ({
  CitiesComboBox: (props: any) => (
    <div data-testid="cities-combo-box" onClick={() => props.onChange(123)}>
      Mocked CitiesComboBox
    </div>
  ),
  Weather: (props: any) => <div data-testid="weather">Mocked Weather for cityId: {props.cityId}</div>,
  Forecast: (props: any) => <div data-testid="forecast">Mocked Forecast for cityId: {props.cityId}</div>,
}));

describe("Home Component", () => {
  test("renders CitiesComboBox and Weather components initially", () => {
    render(<Home />);

    // Ensure CitiesComboBox is rendered
    expect(screen.getByTestId("cities-combo-box")).toBeInTheDocument();

    // Initially, Weather should be rendered without a cityId
    expect(screen.getByTestId("weather")).toHaveTextContent("Mocked Weather for cityId:");
  });

  test("renders forecast button after selecting a city", () => {
    render(<Home />);

    // Simulate selecting a city in CitiesComboBox
    fireEvent.click(screen.getByTestId("cities-combo-box"));

    // Check that the forecast button is rendered after selecting a city
    expect(screen.getByText(/See forecast/i)).toBeInTheDocument();
  });

  test('toggles forecast display when "See forecast" button is clicked', () => {
    render(<Home />);

    // Simulate selecting a city in CitiesComboBox
    fireEvent.click(screen.getByTestId("cities-combo-box"));

    // Click the "See forecast" button
    fireEvent.click(screen.getByText(/See forecast/i));

    // Ensure the Forecast component is displayed
    expect(screen.getByTestId("forecast")).toBeInTheDocument();

    // Ensure the "Close" button appears when forecast is shown
    expect(screen.getByText(/Close/i)).toBeInTheDocument();

    // Click the "Close" button
    fireEvent.click(screen.getByText(/Close/i));

    // Ensure the Forecast component is hidden after closing
    expect(screen.queryByTestId("forecast")).not.toBeInTheDocument();
  });
});
