import { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";

import { Container } from "./styles";

import sunImg from "../../assets/images/sun.png";
import moonImg from "../../assets/images/moon.png";
import { useToggleTheme } from "../../hooks/useToggleTheme";

export function ThemeSwitch() {
  const { toggleTheme } = useToggleTheme();
  const { title } = useContext(ThemeContext)

  return(
    <Container className="div-theme-switch">
      <img src={sunImg} alt="Sun" />
      <Switch
        onChange={toggleTheme}
        checkedIcon={false}
        checked={title === "dark"}
        uncheckedIcon={false}
        handleDiameter={17}
        height={24}
        onColor="#f8f8f8"
        offColor="#1F1F1F"
        onHandleColor="#4F54D4"
        offHandleColor="#4F54D4"
      />
      <img src={moonImg} alt="Moon" />
    </Container>
  );
}