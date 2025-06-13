import React, { useState, useEffect, useCallback } from "react";
import mainArenaBg from "./Images/Main_ArenaBG.png";

const gameAreaWidth = 900;
const gameAreaHeight = 700;
const playerSize = 50;

function MainGameArena({ playerData, onGoToArea, onUpdatePlayerStats }) {
  const initialPlayerPosition = playerData?.stats?.position || { x: 0, y: 0 };
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(initialPlayerPosition);

  const updatePlayerPosition = useCallback(
    (newX, newY) => {
      const boundedX = Math.max(0, Math.min(newX, gameAreaWidth - playerSize));
      const boundedY = Math.max(0, Math.min(newY, gameAreaHeight - playerSize));
      setPlayerCurrentPosition({ x: boundedX, y: boundedY });
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newX = playerCurrentPosition.x;
      let newY = playerCurrentPosition.y;
      const step = 20;

      switch (event.key) {
        case "ArrowUp":
        case "w":
          newY -= step;
          break;
        case "ArrowDown":
        case "s":
          newY += step;
          break;
        case "ArrowLeft":
        case "a":
          newX -= step;
          break;
        case "ArrowRight":
        case "d":
          newX += step;
          break;
        default:
          return;
      }
      event.preventDefault();
      updatePlayerPosition(newX, newY);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerCurrentPosition, updatePlayerPosition]);

  const handleOnScreenMove = (direction) => {
    let newX = playerCurrentPosition.x;
    let newY = playerCurrentPosition.y;
    const step = 20;

    switch (direction) {
      case "up":
        newY -= step;
        break;
      case "down":
        newY += step;
        break;
      case "left":
        newX -= step;
        break;
      case "right":
        newX += step;
        break;
      default:
        break;
    }
    updatePlayerPosition(newX, newY);
  };

  return (
    <div className="game-arena-wrapper">
      <div
        className="game-area"
        style={{
          width: gameAreaWidth,
          height: gameAreaHeight,
          backgroundImage: `url(${mainArenaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <img
          src={playerData.character.image}
          alt={playerData.character.name}
          className="player-avatar"
          style={{
            left: playerCurrentPosition.x,
            top: playerCurrentPosition.y,
            width: playerSize,
            height: playerSize,
          }}
        />

        <div className="travel-area home" onClick={() => onGoToArea("Home")}>
          Home
        </div>
        <div className="travel-area beach" onClick={() => onGoToArea("Beach")}>
          Beach
        </div>
        <div className="travel-area lake" onClick={() => onGoToArea("Lake")}>
          Lake
        </div>
        <div className="travel-area temple" onClick={() => onGoToArea("Temple")}>
          Temple
        </div>
        <div className="travel-area mountain" onClick={() => onGoToArea("Mountain")}>
          Mountain
        </div>
      </div>
      
      <div className="on-screen-controls">
        <button onClick={() => handleOnScreenMove("up")}>⬆️</button>
        <div>
          <button onClick={() => handleOnScreenMove("left")}>⬅️</button>
          <button onClick={() => handleOnScreenMove("right")}>➡️</button>
        </div>
        <button onClick={() => handleOnScreenMove("down")}>⬇️</button>
      </div>
    </div>
  );
}

export default MainGameArena;