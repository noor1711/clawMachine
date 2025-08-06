import Image from "next/image";

const GameBoard = ({ clawPosition, verticalClawPosition, prizes }) => {
  return (
    <div className="game-board">
      {/* The claw container */}
      <div
        className="claw-container"
        style={{ left: `${clawPosition}%`, top: `${verticalClawPosition}%` }}
      >
        <Image src="/claw.png" alt="Claw" layout="fill" objectFit="contain" />
      </div>

      {/* The prizes */}
      {prizes.map((prize) => (
        <div
          key={prize.id}
          className="prize"
          style={{ left: `${prize.x}%`, top: `${prize.y}%` }}
        >
          <Image
            src={prize.image}
            alt="Prize"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ))}

      <style jsx>{`
        .game-board {
          position: relative;
          width: 275px;
          height: 300px;
          border: 5px solid #333;
          border-radius: 5px;
          margin: 20px auto;
          overflow: hidden;
        }
        .claw-container {
          position: absolute;
          width: 100px;
          height: 100px;
          top: 0;
          transform: translateX(-50%);
          transition: left 0.3s ease-in-out;
        }
        .prize {
          position: absolute;
          width: 50px;
          height: 50px;
        }
      `}</style>
    </div>
  );
};

export default GameBoard;
