import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import Modal from "react-modal";
import Hamburger from 'hamburger-react';

import { Button } from "../components/button";
import { Question } from "../components/question";
import { RoomCode } from "../components/roomCode/RoomCode";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import logoDarkImg from "../assets/images/logo-dark.svg";
import checkImg from "../assets/images/check.svg"
import anwerImg from "../assets/images/answer.svg"

import { PageRoom } from "../styles/pages/room";

import { useRoom } from "../hooks/useRoom";

import { database } from "../services/firebase";
import { ThemeSwitch } from "../components/themeSwitch";
import { ModalConfirm } from "../components/modalConfirm";
import toast, { Toaster } from "react-hot-toast";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const theme = useContext(ThemeContext);
  let subtitle: any;
  const [modalRoomIsOpen, setIsModalRoomOpen] = useState(false);
  const [modalQuestionIsOpen, setIsModalQuestionOpen] = useState(false);
  const [questionIdToBeDeleted, setQuestionIdToBeDeleted] = useState("");
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    toast.success('Sala encerrada com sucesso!', {
      style: {
        background: theme.title === "dark" ? "#2C2C2C" : "#FFFFFF",
        color: theme.title === "dark" ? "#E3E3E3" : "#29292E",
      },
    });
    history.push("/");
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      padding: width <= 558 ? '3rem 0rem' : "3rem 8rem",
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: theme.title === "dark" ? "#1F1F1F" : "#f8f8f8",
      border: "1px solid #f8f8f83d"
    },
    overlay: {
      background: "#1f1f1fcc",
    }
  };

  function openModalRoom() {
    setIsModalRoomOpen(true);
  }

  function openModalQuestion(id: string) {
    setIsModalQuestionOpen(true);
    setQuestionIdToBeDeleted(id);
  }

  async function afterOpenModal() {
    
  }

  function closeModalRoom() {
    setIsModalRoomOpen(false);
  }

  function closeModalQuestion() {
    setIsModalQuestionOpen(false);
  }

  function handleGoBack() {
    history.push(`/rooms/new`);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return(
    <PageRoom>
      <Modal
        isOpen={modalRoomIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalRoom}
        style={customStyles}
        contentLabel="Modal Confirm"
      >
        <ModalConfirm
          endRoom
          close={closeModalRoom}
          confirm={handleEndRoom}
        />
      </Modal>
      
      <Modal
        isOpen={modalQuestionIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalQuestion}
        style={customStyles}
        contentLabel="Modal Confirm"
      >
        <ModalConfirm
          endRoom={false}
          close={closeModalQuestion}
          questionId={questionIdToBeDeleted}
        />
      </Modal>

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

          {width <= 930 ? (
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
                    <Button isOutlined onClick={openModalRoom}>Encerrar sala</Button>
                  </div>
                </div>
              )}
              
            </div>
          ) : (
            <div>
              <ThemeSwitch />
              <RoomCode code={roomId} />
              <Button isOutlined onClick={openModalRoom}>Encerrar sala</Button>
            </div>
          )}
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighLighted={question.isHighLighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Checar pergunta" /> 
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighLightQuestion(question.id)}
                  >
                    <img src={anwerImg} alt="Responder pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => openModalQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" /> 
              </button>
            </Question>
          ))}
        </div>
      </main>
    </PageRoom>
  );
}