import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
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
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
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
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
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
              isHighlighted: value.isHighlighted,
              likeCount: Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(function ([
                key,
                like
              ]) {
                return like.authorId === user?.id;
              })?.[0]
            };
          }
        );

        setQuestions(parsedQuestions);
        setTitle(databaseRoom.title);
      });

      return () => {
        roomRef.off('value');
      };
    },
    [roomId, user?.id]
  );

  return {
    questions,
    title
  };
}
