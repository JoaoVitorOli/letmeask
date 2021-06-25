import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 2rem;

  .image {
    width: 54px;
    margin-bottom: 1.75rem;

    svg path {
      stroke: #E73F5D;
    }

    svg {
      width: 100%;
      height: 100%;
      stroke: #E73F5D;
    }
  }

  h1 {
    font: 700 32px "Poppins", sans-serif;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.color.text};
  }

  span {
    color: ${(props) => props.theme.color.subText};
    margin-bottom: 2.75rem;
  }

  .div-buttons {
    display: flex;
    gap: 0.75rem;

    .button {
      padding: 15px 40px;
      border: 0;
      border-radius: 8px;
      cursor: pointer;
      transition: filter 0.2s;

      &.hover {
        filter: brightness(0.8);
      }
    }

    .button.btn-cancel {
      background: ${(props) => props.theme.color.shapeColor};
      color: ${(props) => props.theme.color.text};
    }

    .button.btn-confirm {
      background: #E73F5D;
      color: #f8f8f8;
    }
  }

  @media (max-width: 615px) {
    h1 {
      font-size: 24px; 
    }

    button {
      font-size: 14px; 
      padding: 12px 30px;
    }
  }

  @media (max-width: 589px) {
    h1 {
      font-size: 21px; 
    }

    span {
      font-size: 14px; 
    }

    button {
      font-size: 12px; 
      padding: 10px 15px;
    }
  }

  @media (max-width: 368px) {
    padding: 0 1rem;
  }

  @media (max-width: 323px) {
    padding: 0 0.5rem;
  }
`;