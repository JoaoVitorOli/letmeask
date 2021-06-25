import { FormEvent, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Hamburger from 'hamburger-react';

import { Button } from "../components/button";
import { Question } from "../components/question";
import { RoomCode } from "../components/roomCode/RoomCode";

import logoImg from "../assets/images/logo.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import noQuestionsImg from "../assets/images/no-questions.svg";

import { PageRoom } from "../styles/pages/room";
import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { ThemeSwitch } from "../components/themeSwitch";
import { ThemeContext } from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface RoomParams {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const history = useHistory();
  const [newQuestion, setNewQuestion] = useState("");
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const theme = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === " " || !newQuestion) {
      return;
    }

    if (!user) {
      toast('Você deve estar logado.', {
        icon: '❗️',
        style: {
          background: title === "dark" ? "#2C2C2C" : "#FFFFFF",
          color: title === "dark" ? "#E3E3E3" : "#29292E",
        },
      });

      throw new Error("Você deve estar logado.");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    toast.success('Pergunta enviada com sucesso!')
    setNewQuestion("");
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  function handleGoBack() {
    history.push(`/rooms/new`);
  }

  return(
    <PageRoom>
      <div>
          <Toaster />
      </div>  

      <header>
        <div className="content">
          <img
            src={theme.title === "light" ? logoImg : logoDarkImg}
            alt="Letmeask"
            onClick={handleGoBack}
          />
          {width <= 666 ? (
            <div className="div-mobile-ham">
              <Hamburger
                color={theme.title === "dark" ? "white" : "black"}
                toggle={setIsMenuOpen}
                toggled={isMenuOpen}
              />
              {isMenuOpen && (
                <div className="Menu-ham">
                  <div className="content-menu">
                    <ThemeSwitch /> 
                    <RoomCode code={roomId} />
                  </div>
                </div>
              )}
              
            </div>
          ) : (
            <div>
              <ThemeSwitch /> 
              <RoomCode code={roomId} />
            </div>
          )}
          
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {questions.length === 0 ? (
            <div className="no-questions">
              <img src={noQuestionsImg} alt="Nenhuma pergunta" />
              <h2>Nenhuma pergunta por aqui...</h2>
              <span>Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
            </div>
          ) : (
            questions.map((question) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </Question>
            ))
          )}
        </div>
      </main>
    </PageRoom>
  );
}