import { ReactNode } from 'react';

import '../styles/question.scss';

type QuestionProps = {
  author: {
    avatar: string;
    name: string;
  };
  children?: ReactNode;
  content: string;
};

export function Question(props: QuestionProps) {
  const { author, children, content } = props;

  return (
    <div className="question">
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img alt={author.name} src={author.avatar} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
}
