import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(prop) => prop.theme.color.background};
    color: #29292e;
  }

  body, input, button, textarea {
    font: 400 16px "Roboto", sans-serif
  }
`;
