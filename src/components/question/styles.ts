import styled from "styled-components";

export const Container = styled.div`
  background: ${(props) => props.theme.color.input};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${(props) => props.theme.color.highLightedBg};
    border: 1px solid #835afd;

    footer .user-info span {
      color: ${(props) => props.theme.color.highLightedText};
    }
  }

  &.answered {
    background: ${(props) => props.theme.color.answeredBg};
  }

  p {
    word-break: break-word;
    color: ${(props) => props.theme.color.text};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    transition: filter 0.2s;

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
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 1rem;
    }

    .div-buttons {

    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }

  @media (max-width: 425px) {
    footer {
      flex-direction: column;
      align-items: flex-start;

      .div-buttons {
        margin-top: 1rem;
        align-self: flex-end;
      }
    }
  }
`;