import React, { useState, useEffect, useCallback } from "react";
// Catatan: Impor CSS sudah dihapus karena semua gaya digabungkan ke App.css

// --- LANGKAH 1: Impor gambar background Anda di sini ---
// Pastikan PATH INI BENAR sesuai lokasi gambar di proyek Anda.
// Contoh: Jika gambar ada di 'src/Images/main_arena_background.png'
import mainArenaBg from "./Images/Main_ArenaBG.png"; // Ganti dengan nama file dan path Anda

const gameAreaWidth = 900; // Lebar arena game
const gameAreaHeight = 700; // Tinggi arena game
const playerSize = 50; // Ukuran avatar pemain

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

  // Catatan: useEffect untuk pengurangan status over time sekarang dipindahkan ke App.js
  // untuk pengelolaan global yang lebih baik.

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
          // --- LANGKAH 2: Gunakan gambar yang diimpor di sini ---
          backgroundImage: `url(${mainArenaBg})`, // Menyetel gambar background
          backgroundSize: 'cover', // Sesuaikan ini: 'cover', 'contain', atau ukuran px/persen
          backgroundPosition: 'center', // Pusatkan gambar
          backgroundRepeat: 'no-repeat', // Hindari pengulangan gambar
          // Hapus background-color: #e8f5e9; dari App.css jika ada, atau pastikan di-override
        }}
      >
        {/* Avatar pemain */}
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

        {/* Contoh area yang bisa diklik */}
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

      {/* Tombol di layar untuk pergerakan */}
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
