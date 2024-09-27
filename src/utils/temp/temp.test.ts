import { getTemp } from "./temp.utils";

describe("getTemp function", () => {
  test("should return an empty string for undefined input", () => {
    expect(getTemp(undefined)).toBe("");
  });

  test("should return an empty string for null input", () => {
    expect(getTemp(null)).toBe("");
  });

  test("should return formatted temperature for negative input", () => {
    expect(getTemp(-100)).toBe("-10°C"); // -100 / 10 = -10
    expect(getTemp(-250)).toBe("-25°C"); // -250 / 10 = -25
  });

  test("should round temperatures correctly", () => {
    expect(getTemp(255)).toBe("26°C"); // 255 / 10 = 25.5, rounded to 26
    expect(getTemp(254)).toBe("25°C"); // 254 / 10 = 25.4, rounded to 25
  });
});
