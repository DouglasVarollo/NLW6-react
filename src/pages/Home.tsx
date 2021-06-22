import '../styles/auth.scss';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export function Home() {
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
          <button className="create-room">
            <img alt="Logo do Google" src={googleIconImg} />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input placeholder="Digite o código da sala" />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
