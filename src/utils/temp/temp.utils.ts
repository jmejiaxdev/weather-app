export function getTemp(temp?: number): string {
  return temp ? `${Math.round(temp / 10)}°C` : "";
}
