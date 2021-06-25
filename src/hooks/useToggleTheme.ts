import { ToggleThemeContext } from "../contexts/ToggleThemeContext";
import { useContext } from "react";

export function useToggleTheme() {
  const value = useContext(ToggleThemeContext);

  return value;
}