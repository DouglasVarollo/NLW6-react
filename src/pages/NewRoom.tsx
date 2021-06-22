import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img
          alt="ilustração simbolizando perguntas e respostas"
          src={illustrationImg}
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img alt="Letmeask" src={logoImg} />

          <h2>Criar uma nova sala</h2>

          <form>
            <input placeholder="Nome da sala" />
            <Button>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <a href="/">clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
}
