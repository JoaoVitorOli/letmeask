import styled from "styled-components";

export const PageRoom = styled.div`
  padding-bottom: 2rem;

  header {
    padding: 24px;
    border-bottom: 1px solid #e2e2e2;

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 45px;
        cursor: pointer;
      }

      > div {
        display: flex;
        gap: 16px;

        button {
          height: 40px;
        }
      }
    }
  }

  .div-mobile-ham {
    > div:nth-child(1) {
      z-index: 100;
    }
  }

  .Menu-ham {
    position: fixed;

    display: flex;
    top: 0;
    right: 0;
    
    background: ${(props) => props.theme.color.input};
    padding: 0 2rem;
    height: 100vh;
    border-left: 1px solid ${(props) => props.theme.color.subText};

    .content-menu {
      margin: auto 0;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 0 1rem;
    }
  }

  main {
    max-width: 800px;
    padding: 0 30px;
    margin: auto;

    .room-title{
      margin: 32px 0 24px;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        color: ${(props) => props.theme.color.text};
      }

      span {
        margin-left: 16px;
        background: #e559f9;
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
      }
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 14px;
        border-radius: 8px;
        background: ${(props) => props.theme.color.input};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        color: ${(props) => props.theme.color.text};
        resize: vertical;
        min-height: 130px;
        word-break: break-all;
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 8px;
          }

          span {
            color: ${(props) => props.theme.color.text};
            font-weight: 500;
            font-size: 14px;
          }
        }

        > span {
          font-size:14px;
          color:#737380;
          font-weight: 500;

          button {
            background: transparent;
            border: 0;
            color: #835afd;
            text-decoration: underline;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }

    .question-list {
      margin-top: 32px;
    }
  }

  @media (max-width: 425px) {
    .Menu-ham {
      width: 100vw;
      justify-content: center;
      align-items: center;

      .content-menu {
        margin: auto 0;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }
    }

    main {
      .room-title {
        flex-direction: column;
        align-items: flex-start !important;

        > h1 {
          font-size: 15px !important;
        }

        > span {
          margin: 10px 0 0 0 !important;
        }
      }

      .form-footer {
        align-items: flex-start !important;
        flex-direction: column !important;

        .user-info {
          margin-bottom: 1rem;
        }

        > button {
          align-self: flex-end !important;
        }
      }
    }
  }
`;