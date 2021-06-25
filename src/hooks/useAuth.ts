import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthenticationContext);

  return value;
}