import Image from "next/image";
import { GAME_STATES } from "../page";

const ControlPanel = ({ onMoveLeft, onMoveRight, onDropClaw, gameState }) => {
  const isMoving = gameState != GAME_STATES.IDLE;

  return (
    <div className="control-panel">
      <button onClick={onMoveLeft} disabled={isMoving}>
        <Image src="/left_button.png" alt="Left" width={75} height={75} />
      </button>
      <button className="bg-black-50" onClick={onDropClaw} disabled={isMoving}>
        <Image src="/drop_button.png" alt="Drop" width={75} height={75} />
      </button>
      <button onClick={onMoveRight} disabled={isMoving}>
        <Image src="/right_button.png" alt="Right" width={75} height={75} />
      </button>
      <style jsx>{`
        .control-panel {
          margin-top: 20px;
        }
        button {
          margin: 0 5px;
          background: none;
          border: none;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ControlPanel;
