import { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ThemeSwitch } from "../components/themeSwitch";
import { ThemeContext } from "styled-components";

import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import githubImg from "../assets/images/github.png";

import { Button } from "../components/button";

import { useAuth } from "../hooks/useAuth";

import { PageAuth } from "../styles/pages/auth";
import toast, { Toaster } from "react-hot-toast";
import useWindowDimensions from "../hooks/useWindowDimensions";

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const { title } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  async function handleCreateRoomWithGoogle() {
    await signInWithGoogle();

    history.push("/rooms/new");
  }

  async function handleCreateRoomWithGithub() {
    await signInWithGithub();

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === " ") {
      return;
    }

    if (!roomCode) {
      toast.error("Você precisa preencher com o código da sala.", {
        style: {
          background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
          color: title === "dark" ? "#E3E3E3" : "#29292E",
        },
      });
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Essa sala não existe.", {
        style: {
          background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
          color: title === "dark" ? "#E3E3E3" : "#29292E",
        },
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Essa sala foi encerrada.", {
        style: {
          background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
          color: title === "dark" ? "#E3E3E3" : "#29292E",
        },
      });
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <PageAuth>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <ThemeSwitch />
        <div>
          <Toaster />
        </div>     

        <div className="main-content">
          {width <= 880 && (
            <img
              src={logoDarkImg}
              alt="Letmeask"
            />
          )}
          {width > 880 && (
            <img
              src={title === "dark" ? logoDarkImg : logoImg}
              alt="Letmeask"
            />
          )}
          
          <button onClick={handleCreateRoomWithGithub} className="create-room github">
            <img src={githubImg} alt="Logo do Github" />
            Crie sua sala com o Github
          </button>
          <button onClick={handleCreateRoomWithGoogle} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </PageAuth>
  );
}