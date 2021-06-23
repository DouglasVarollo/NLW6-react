import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
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
  }
>;

type Question = {
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  id: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [title, setTitle] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      author: {
        avatar: user.avatar,
        name: user.name
      },
      content: newQuestion,
      isAnswered: false,
      isHighlighted: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

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

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img alt="Letmeask" src={logoImg} />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            onChange={event => setNewQuestion(event.target.value)}
            placeholder="O que você quer perguntar?"
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img alt={user.name} src={user.avatar} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}

            <Button disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </main>
    </div>
  );
}