import { render, screen, fireEvent } from "@testing-library/react";
import CitiesComboBox from "./cities-combo-box.component";
import { CitiesComboBoxProps } from "./cities-combo-box.definitions";

jest.mock("../../config", () => ({
  Cities: [
    { id: 1, name: "Toronto" },
    { id: 2, name: "Vancouver" },
  ],
}));

describe("CitiesComboBox", () => {
  const setup = (props: Partial<CitiesComboBoxProps> = {}) => {
    const defaultProps: CitiesComboBoxProps = {
      onChange: jest.fn(),
      ...props,
    };
    return render(<CitiesComboBox {...defaultProps} />);
  };

  test("renders correctly with the Autocomplete and TextField", () => {
    setup();

    // Check if the Autocomplete renders with the "City" label
    const autocompleteInput = screen.getByLabelText(/City/i);
    expect(autocompleteInput).toBeInTheDocument();

    // Check for the instructional Typography
    const instructionText = screen.getByText(/Please select city to see the forecast/i);
    expect(instructionText).toBeInTheDocument();
  });

  test("calls onChange with correct city id when a city is selected", () => {
    const mockOnChange = jest.fn();
    setup({ onChange: mockOnChange });

    // Find the autocomplete input
    const autocompleteInput = screen.getByLabelText(/City/i);

    // Simulate clicking to open options
    fireEvent.mouseDown(autocompleteInput);

    // Select Toronto
    const torontoOption = screen.getByText("Toronto");
    fireEvent.click(torontoOption);

    // onChange should be called with Toronto's id (1)
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  test("clears the input and calls onChange with undefined when input is cleared", () => {
    const mockOnChange = jest.fn();
    setup({ onChange: mockOnChange });

    // Find the autocomplete input
    const autocompleteInput = screen.getByLabelText(/City/i);

    // Simulate clicking to open options
    fireEvent.mouseDown(autocompleteInput);

    // Select Vancouver
    const vancouverOption = screen.getByText("Vancouver");
    fireEvent.click(vancouverOption);

    // onChange should be called with Vancouver's id (2)
    expect(mockOnChange).toHaveBeenCalledWith(2);

    // Clear the input value
    fireEvent.change(autocompleteInput, { target: { value: "" } });
    fireEvent.input(autocompleteInput, {
      target: { value: "" },
      reason: "clear",
    });

    // onChange should be called with undefined on clearing
    expect(mockOnChange).toHaveBeenCalledWith(undefined);
  });
});
