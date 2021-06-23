import '../styles/room-code.scss';
import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img alt="Copiar o código da sala" src={copyImg} />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}
