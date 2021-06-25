import { useParams } from "react-router-dom";

import { database } from "../../services/firebase";

import { Container } from "./styles";

interface Props {
  endRoom: boolean;
  close: () => void;
  confirm?: () => void;
  questionId?: string;
}

interface RoomParams {
  id: string;
}

export function ModalConfirm({endRoom, questionId, close, confirm}: Props) {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  async function handleDeleteQuestion(questionId: string | undefined) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    close();
  }

  return (
    <Container>
      {endRoom ? (
        <div className="image">
          <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
      ) : (
        <div className="image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
      )}

      {endRoom ? (
        <h1>Encerrar sala</h1>
      ) : (
        <h1>Excluir pergunta</h1>
      )}
      {endRoom ? (
        <span>Tem certeza que deseja encerrar esta sala?</span>
      ) : (
        <span>Tem certeza que deseja excluir esta pergunta?</span>
      )}

      <div className="div-buttons">
        <button className="button btn-cancel" onClick={close}>Cancelar</button>
        {endRoom ? (
          <button className="button btn-confirm" onClick={confirm}>Sim, encerrar</button>
        ) : (
          <button className="button btn-confirm" onClick={() => handleDeleteQuestion(questionId)}>Sim, excluir</button>
        )}
      </div>
    </Container>
  );
}