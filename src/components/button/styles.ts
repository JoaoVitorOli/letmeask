import styled from "styled-components";

export const ButtonStyle = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #835afd;
  color: #FFF;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &.outlined {
    background: ${(props) => props.theme.color.input};
    border: 1px solid #835afd;
    color: #835afd;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
    
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
