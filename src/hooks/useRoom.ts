import { useEffect, useState } from 'react';

import { database } from '../services/firebase';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      avatar: string;
      name: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type QuestionType = {
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  id: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(
    function () {
      const roomRef = database.ref(`rooms/${roomId}`);

      roomRef.on('value', function (room) {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions =
          databaseRoom.questions ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(
          function ([key, value]) {
            return {
              author: value.author,
              content: value.content,
              id: key,
              isAnswered: value.isAnswered,
              isHighlighted: value.isHighlighted
            };
          }
        );

        setQuestions(parsedQuestions);
        setTitle(databaseRoom.title);
      });
    },
    [roomId]
  );

  return {
    questions,
    title
  };
}
