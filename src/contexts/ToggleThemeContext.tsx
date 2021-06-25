import { createContext, ReactNode } from "react";
import { DefaultTheme } from "styled-components";

import usePersistedState from "../hooks/usePersistedState";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";

interface ToggleThemeContextProps {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

interface ToggleThemeProviderProps {
  children: ReactNode
}

export const ToggleThemeContext = createContext({} as ToggleThemeContextProps);

export const ToggleThemeProvider = ({children}: ToggleThemeProviderProps) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", dark);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return(
      <ToggleThemeContext.Provider value={{
        theme,
        toggleTheme
      }}>
          {children}
      </ToggleThemeContext.Provider>
  )
};
