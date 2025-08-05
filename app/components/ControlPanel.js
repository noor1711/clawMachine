import Image from "next/image";

const ControlPanel = ({ onMoveLeft, onMoveRight, onDropClaw, gameState }) => {
  const isMoving = gameState === "moving" || gameState === "dropping";

  return (
    <div className="control-panel">
      <button onClick={onMoveLeft} disabled={isMoving}>
        <Image src="/left_button.png" alt="Left" width={50} height={50} />
      </button>
      <button className="bg-black-50" onClick={onDropClaw} disabled={isMoving}>
        Drop
      </button>
      <button onClick={onMoveRight} disabled={isMoving}>
        <Image src="/right_button.png" alt="Right" width={50} height={50} />
      </button>
      <style jsx>{`
        .control-panel {
          margin-top: 20px;
        }
        button {
          margin: 0 10px;
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
