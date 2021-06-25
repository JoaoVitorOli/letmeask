import { ReactNode } from "react";
import { Container } from "./styles";

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({ 
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: QuestionProps) {
  return (
    <Container className={`question ${isAnswered ? "answered" : ""} ${isHighLighted && !isAnswered ? "highlighted" : ""}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>
            {author.name}
          </span>
        </div>
        <div className="div-buttons">
          {children}
        </div>
      </footer>
    </Container>
  );
}