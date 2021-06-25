import styled from "styled-components";

export const PageAuth = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 7;

    background: ${(props) => props.theme.color.asideBgColor};
    color: #FFF;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 36px "Poppins", sans-serif;
      line-height: 42px;
      margin-top: 16px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      margin-top: 16px;
      color: #f8f8f8;
    }
  }

  main {
    flex: 8;

    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toast-signed {
    display: flex;
    align-items: center;

    img {
      width: 42px;
      border-radius: 50%;
      margin-right: 16px;
    }

    span {
      color: ${(props) => props.theme.color.text};
    }
  }

  .div-theme-switch {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem 2rem 0 0;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 328px;
    align-items: center;
    text-align: center;

    > img {
      align-self: center;
    }

    h2 {
      font-size: 24px;
      margin: 64px 0 24px;
      font-family: "Poppins", sans-serif;
      color: ${(props) => props.theme.color.text};
    }

    form {
      width: 100%;

      button, input {
        width: 100%;
      }

      input {
        height: 58px;
        border-radius: 8px;
        padding: 0 16px;
        background: ${(props) => props.theme.color.input};
        border: 1px solid #a8a8b3;
        color: ${(props) => props.theme.color.text};
      }

      button {
        margin-top: 16px;
      }
    }
    
    button, input {
      width: 100%;
    }

    p {
      font-size: 14px;
      color: ${(props) => props.theme.color.subText};
      margin-top: 16px;

      a {
        color: #e559f9;
      }
    }
  }

  .create-room {
    margin-top: 24px;
    height: 50px;

    border-radius: 8px;
    font-weight: 500;
    background: #ea4335;
    color: #FFF;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
      margin-right: 8px;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  .create-room.github {
    margin-top: 64px;
    background: rgb(241, 241, 241);
    color: #000;
    border: 2px solid #000;
  }

  .separator {
    font-size: 14px;
    color: #a8a8b3;

    margin: 32px 0;
    display: flex;
    align-items: center;
    width: 100%;

    &::before {
      content: '';
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-right: 16px;
    }

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-left: 16px;
    }
  }

  @media (max-width: 880px) {
    flex-direction: column;

    aside {
      height: 80vh;
      margin-bottom: 3rem;
      padding-top: 10rem;

      img {
        max-width: 220px;
      }

      strong {
        font-size: 32px;
      }

      p {
        font-size: 19px;
      }
    }

    main {
      padding-bottom: 8rem;
    }

    .main-content {
      > img {
        position: absolute;
        top: 0;
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    aside {
      padding: 120px 30px;
    }
  }

  @media (max-width: 550px) {
    aside {
      padding-top: 12rem;
    }

    .main-content {
      > img {
        position: absolute;
        top: 0;
        left: 0;
        margin: 1rem 0 0 30px;
      }
    }
  }

  @media (max-width: 480px) {
    aside {
      padding-bottom: 4rem;

      strong {
        font-size: 28px;
      }

      p {
        font-size: 16px;
        margin-top: 5px;
      }

      strong, p {
        line-height: 1.55rem;
      }
    }
  }

  @media (max-width: 425px) {
    main {
      padding: 0 30px 5rem 30px;
    }

    aside {
      padding-top: 9rem;

      img {
        max-width: 180px;
      }

      strong {
        font-size: 21px;
      }

      p {
        font-size: 14px;
        margin-top: 5px;
      }
    }

    .main-content {
      > img {
        width: 120px;
        /* padding: 10px 0 0 0; */
      }
    }
  }

  @media (max-width: 310px) {
    /* .main-content {
      h2 {
        font-size: 19px;
        margin: 24px 0 24px;
      }

      form {
        width: 100%;

        button, input {
          width: 100%;
        }

        input {
          height: 58px;
          border-radius: 8px;
          padding: 0 16px;
          background: ${(props) => props.theme.color.input};
          border: 1px solid #a8a8b3;
          color: ${(props) => props.theme.color.text};
        }

        button {
          margin-top: 16px;
        }
      }
      
      button, input {
        width: 100%;
      }

      p {
        font-size: 14px;
        color: ${(props) => props.theme.color.subText};
        margin-top: 16px;

        a {
          color: #e559f9;
        }
      }
    } */
  }
`;
