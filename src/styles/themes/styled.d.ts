import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string,

    color: {
      background: string,
      text: string,
      subText: string,
      input: string;
      shapeColor: string,
      asideBgColor: string,
      answeredBg: string,
      highLightedBg: string,
      highLightedText: string
    }
  }
}
