"use client";
import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import ControlPanel from "./components/ControlPanel";

const GamePage = () => {
  const [clawPosition, setClawPosition] = useState(10); // 0 to 100 representing percentage across the x-axis
  const [verticalClawPositon, setVerticalClawPosition] = useState(0);
  const [prizes, setPrizes] = useState([]);
  const [gameState, setGameState] = useState("idle"); // 'idle', 'moving', 'dropping'
  const prizeImages = ["/prize1.png", "/prize2.png", "/prize3.png"];
  const [interval, setCurrInterval] = useState();
  const [prizeWon, setPrizeWon] = useState();

  const initialisePrizes = () => {
    const newPrizes = [];
    const numPrizes = 7; // Number of prizes to display

    for (let i = 0; i < numPrizes; i++) {
      newPrizes.push({
        id: i,
        image: prizeImages[Math.floor(Math.random() * prizeImages.length)],
        x: Math.random() * 85 + 5, // Random x position (10% to 90%)
        y: Math.random() * 5 + 85, // Random y position (20% to 80%)
      });
    }
    setPrizes(newPrizes);
  };

  useEffect(() => {
    initialisePrizes();
  }, []);

  useEffect(() => {
    if (gameState == "dropping" && verticalClawPositon >= 80) {
      const prizeId = findClosest();
      setPrizeWon(prizeId);
      clearInterval(interval);
      setCurrInterval(null);
      handleClawRaise();
    } else if (gameState == "raising" && verticalClawPositon <= 10) {
      clearInterval(interval);
      setCurrInterval(null);
      setTimeout(() => {}, 3000);
    }
  }, [gameState, verticalClawPositon]);

  useEffect(() => {
    if (!!prizeWon) {
      const newPrizeObject = [...prizes];
      newPrizeObject[prizeWon].y = verticalClawPositon + 10;
      setPrizes(newPrizeObject);
    }
  }, [prizeWon, verticalClawPositon]);

  const resetGame = useCallback(() => {
    initialisePrizes();
    setPrizeWon();
    setGameState("idle");
  }, []);

  const findDistance = (x1, x2) => {
    return Math.abs(x1 - x2);
  };

  const findClosest = () => {
    let minDis = 100;
    let prizeId = 0;

    prizes.forEach((prize, index) => {
      const dis = findDistance(clawPosition - 15, prize.x);
      if (dis < minDis) {
        prizeId = index;
        minDis = dis;
      }
    });
    if (minDis <= 10) {
      return prizeId;
    }
    return;
  };

  const handleMoveClaw = (direction) => {
    if (gameState !== "idle") return;

    setGameState("moving");
    const step = 3;
    let newPosition = clawPosition;

    if (direction === "left") {
      newPosition = Math.max(0, clawPosition - step);
    } else if (direction === "right") {
      newPosition = Math.min(100, clawPosition + step);
    }

    setClawPosition(newPosition);
    setGameState("idle");
  };

  const handleClawRaise = useCallback(() => {
    if (gameState !== "idle") return;

    setGameState("raising");
    let counter = 80;

    function decrementCounter() {
      counter -= 5;
      setVerticalClawPosition(counter);
    }

    // Start the interval, executing incrementCounter every 1000 milliseconds (1 second)
    const intervalId = setInterval(decrementCounter, 100);
    setCurrInterval(intervalId);
  }, []);

  const handleDropClaw = useCallback(() => {
    if (gameState !== "idle") return;

    setGameState("dropping");
    let counter = 0;

    function incrementCounter() {
      counter += 5;
      setVerticalClawPosition(counter);
    }

    // Start the interval, executing incrementCounter every 1000 milliseconds (1 second)
    const intervalId = setInterval(incrementCounter, 100);
    setCurrInterval(intervalId);
  }, []);

  return (
    <div className="game-container">
      <h1 className="font-pixel text-5xl">Claw Machine Game</h1>
      <div className="vending-machine">
        <GameBoard
          clawPosition={clawPosition}
          verticalClawPosition={verticalClawPositon}
          prizes={prizes}
        />
        <ControlPanel
          onMoveLeft={() => handleMoveClaw("left")}
          onMoveRight={() => handleMoveClaw("right")}
          onDropClaw={handleDropClaw}
          gameState={gameState}
        />
      </div>
      <style jsx>{`
        .game-container {
          text-align: center;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: auto 0;
          background-image: url("/cloudy-background.jpg");
          height: 820px;
        }
        .vending-machine {
          height: 700px;
          width: 700px;
          background-size: cover;
          background-image: url("/background.png");
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 50px 0px 0px;
        }
      `}</style>
    </div>
  );
};

export default GamePage;
