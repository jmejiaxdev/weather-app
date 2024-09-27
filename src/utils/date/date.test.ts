import dayjs from "dayjs";
import { formatDMMMhA, formatDMMM } from "./date.utils"; // Adjust the import path as necessary

describe("Date formatting functions", () => {
  test("formatDMMMhA should format date correctly", () => {
    const inputDate = new Date("2024-09-26T15:00:00");
    const formattedDate = formatDMMMhA(inputDate);
    expect(formattedDate).toBe("26 Sep 3PM");
  });

  test("formatDMMMhA should return current date if no date is provided", () => {
    const currentDate = new Date();
    const formattedDate = formatDMMMhA();
    expect(formattedDate).toBe(dayjs(currentDate).format("D MMM hA")); // Compare with current date formatting
  });

  test("formatDMMM should format date correctly", () => {
    const inputDate = new Date("2024-09-26T00:00:00");
    const formattedDate = formatDMMM(inputDate);
    expect(formattedDate).toBe("26 Sep");
  });

  test("formatDMMM should return current date if no date is provided", () => {
    const currentDate = new Date();
    const formattedDate = formatDMMM();
    expect(formattedDate).toBe(dayjs(currentDate).format("D MMM")); // Compare with current date formatting
  });
});
