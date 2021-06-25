import { FormEvent, useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import toast, { Toaster } from "react-hot-toast";

import { database } from "../services/firebase";

import { Button } from "../components/button";
import { ThemeSwitch } from "../components/themeSwitch";

import { PageAuth } from "../styles/pages/auth";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import useWindowDimensions from "../hooks/useWindowDimensions";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const { title } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    toast((t) => (
      <div className="toast-signed">
        <img src={user?.avatar} alt={user?.name} />
        <span>Logado com sucesso!</span>
      </div>
    ), {
      style: {
        background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
        color: title === "dark" ? "#E3E3E3" : "#29292E",
      },
    });
  }, []);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === " ") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
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
          <img
            src={title === "light" || width < 880 ? logoDarkImg : logoImg}
            alt="Letmeask"
          />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </PageAuth>
  );
}