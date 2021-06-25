import cx from 'classnames';
import { ReactNode } from 'react';

import '../styles/question.scss';

type QuestionProps = {
  author: {
    avatar: string;
    name: string;
  };
  children?: ReactNode;
  content: string;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question(props: QuestionProps) {
  const {
    author,
    children,
    content,
    isAnswered = false,
    isHighlighted = false
  } = props;

  return (
    <div
      className={cx('question', {
        answered: isAnswered,
        hightlighted: isHighlighted && !isAnswered
      })}
    >
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
