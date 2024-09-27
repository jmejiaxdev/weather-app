import { City } from "../../definitions/city.definitions";

export interface CitiesComboBoxProps {
  onChange?: (city?: City["id"]) => void;
}

export type CitiesComboBoxValue = { key: number; label: string } | null;
