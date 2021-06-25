import { Button } from "./styles";

import copyImg from "../../assets/images/copy.svg";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface RoomCodeProps {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { title } = useContext(ThemeContext);

  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
    
    toast('Código copiado.', {
      position: "top-right",
      icon: '📋',
      style: {
        background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
        color: title === "dark" ? "#E3E3E3" : "#29292E",
      },
    })
  }

  return (
    <>
      <Button onClick={copyRoomCodeToClipBoard}>
        <div>
          <img src={copyImg} alt="Copias o código da sala" />
        </div>
        <span>Sala #{props.code}</span>
      </Button>

      <div>
        <Toaster />
      </div>
    </>
  );
}