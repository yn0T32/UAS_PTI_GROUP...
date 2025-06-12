import React, { useState, useEffect } from "react";
import CharacterSelection from "./CharacterSelection";
import MainGameArena from "./MainGameArena";
import SpecificAreaStage from "./SpecificAreaStage";
import GameOverScreen from "./GameOverScreen";
import "./App.css";

// Impor gambar lokal untuk karakter
// PASTIKAN PATH INI BENAR SESUAI DENGAN STRUKTUR PROYEK ANDA
import Male1 from "./Images/Male1.png";
import Male2 from "./Images/Male2.png";
import Female1 from "./Images/Female1.png";
import Female2 from "./Images/Female2.png";

const characters = [
  { id: 1, name: "Male Warrior", image: Male1 },
  { id: 2, name: "Male Mage", image: Male2 },
  { id: 3, name: "Female Archer", image: Female1 },
  { id: 4, name: "Female Rogue", image: Female2 },
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("characterSelection");
  const [activeArea, setActiveArea] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const handleSelectionComplete = (selectedCharacter, playerName) => {
    const initialPlayerStats = {
      meal: 100,
      sleep: 100,
      happiness: 100,
      cleanliness: 100,
      money: 100,
      items: {}, // Mengubah inisialisasi items menjadi objek kosong
      position: { x: 0, y: 0 },
      score: 0, // Inisialisasi score
      lifetime: 0, // Inisialisasi lifetime (detik)
    };
    setPlayerData({
      character: selectedCharacter,
      name: playerName,
      stats: initialPlayerStats,
    });
    setGameStarted(true);
    setCurrentScreen("mainArena");
  };

  const handleUpdatePlayerStats = (newStats) => {
    setPlayerData((prev) => ({
      ...prev,
      stats: newStats,
    }));
  };

  // Logika Game Over dan Pengurangan Status
  useEffect(() => {
    if (!gameStarted || !playerData || currentScreen === "gameOver") return;

    const interval = setInterval(() => {
      setPlayerData((prevPlayerData) => {
        if (!prevPlayerData || !prevPlayerData.stats) return prevPlayerData;

        const newStats = { ...prevPlayerData.stats };

        newStats.meal = Math.max(0, newStats.meal - 0.5);
        newStats.sleep = Math.max(0, newStats.sleep - 0.3);
        newStats.happiness = Math.max(0, newStats.happiness - 0.2);
        newStats.cleanliness = Math.max(0, newStats.cleanliness - 0.1);

        // Tambahkan score seiring waktu
        newStats.score = (newStats.score || 0) + 10;
        // Tambahkan waktu hidup
        newStats.lifetime = (newStats.lifetime || 0) + 1; // Setiap 1 detik interval, tambah 1 detik lifetime

        // Menentukan pesan Game Over
        let message = "";
        if (
          newStats.meal <= 0 &&
          newStats.sleep <= 0 &&
          newStats.happiness <= 0
        ) {
          message =
            "Anda kehabisan semua energi. Petualangan berakhir di sini!";
        } else if (newStats.meal <= 0) {
          message =
            "Perut keroncongan tak tertahankan! Anda terlalu lapar untuk melanjutkan.";
        } else if (newStats.sleep <= 0) {
          message =
            "Kelopak mata terasa sangat berat! Anda butuh istirahat panjang dan nyenyak.";
        } else if (newStats.happiness <= 0) {
          message =
            "Semangat Anda pupus! Tidak ada lagi kegembiraan di hati Anda.";
        } else if (newStats.cleanliness <= 0) {
          message =
            "Anda sudah terlalu kotor! Lingkungan menolak keberadaan Anda.";
        }

        if (message) {
          // Jika ada pesan, berarti game over
          setGameOverMessage(message);
          setCurrentScreen("gameOver");
          return prevPlayerData; // Kembalikan data lama untuk memastikan interval berhenti di clean-up
        }

        return {
          ...prevPlayerData,
          stats: newStats,
        };
      });
    }, 1000); // Setiap 1 detik

    return () => clearInterval(interval);
  }, [gameStarted, playerData, currentScreen]);

  // Fungsi untuk mereset game
  const handleRestartGame = () => {
    setGameStarted(false);
    setPlayerData(null);
    setCurrentScreen("characterSelection");
    setActiveArea(null);
    setGameOverMessage("");
  };

  // Fungsi debug: Habiskan semua status
  const handleDebugDepleteStats = () => {
    if (playerData) {
      setPlayerData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          meal: 0,
          sleep: 0,
          happiness: 0,
          cleanliness: 0,
          // Uang dan Item tidak dihabiskan oleh tombol debug ini
        },
      }));
      // Pengurangan stat di atas akan memicu useEffect Game Over
    }
  };

  const handleGoToArea = (areaName) => {
    setActiveArea(areaName);
    setCurrentScreen("specificArea");
    setPlayerData((prev) => ({
      ...prev,
      stats: { ...prev.stats, position: { x: 0, y: 0 } },
    }));
  };

  const handleGoBackToMainArena = () => {
    setCurrentScreen("mainArena");
    setActiveArea(null);
    setPlayerData((prev) => ({
      ...prev,
      stats: { ...prev.stats, position: { x: 0, y: 0 } },
    }));
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "characterSelection":
        return (
          <CharacterSelection
            onSelectionComplete={handleSelectionComplete}
            characters={characters}
          />
        );
      case "mainArena":
        return (
          <MainGameArena
            playerData={playerData}
            onGoToArea={handleGoToArea}
            onUpdatePlayerStats={handleUpdatePlayerStats}
          />
        );
      case "specificArea":
        return (
          <SpecificAreaStage
            playerData={playerData}
            areaName={activeArea}
            onGoBack={handleGoBackToMainArena}
            onUpdatePlayerStats={handleUpdatePlayerStats}
          />
        );
      case "gameOver":
        return (
          <GameOverScreen
            message={gameOverMessage}
            playerData={playerData}
            onRestartGame={handleRestartGame}
          />
        );
      default:
        return (
          <CharacterSelection
            onSelectionComplete={handleSelectionComplete}
            characters={characters}
          />
        );
    }
  };

  return (
    <div className="App">
      <h1>
        {currentScreen === "characterSelection"
          ? "Pilih Karaktermu!"
          : currentScreen === "gameOver"
          ? "Game Over!"
          : `Game Time! - ${activeArea || "Main Arena"}`}
      </h1>

      {gameStarted && playerData && currentScreen !== "gameOver" ? (
        <div className="game-layout">
          <div className="sidebar-stats">
            <h3>
              {playerData.name} - {playerData.character.name}
            </h3>
            {/* Status Bar untuk Meal */}
            <div className="stat-bar-container">
              <span className="stat-label">Meal:</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${playerData.stats.meal}%`,
                    backgroundColor: "orange",
                  }}
                ></div>
                <span className="stat-value">
                  {Math.round(playerData.stats.meal)}
                </span>
              </div>
            </div>
            {/* Status Bar untuk Sleep */}
            <div className="stat-bar-container">
              <span className="stat-label">Sleep:</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${playerData.stats.sleep}%`,
                    backgroundColor: "purple",
                  }}
                ></div>
                <span className="stat-value">
                  {Math.round(playerData.stats.sleep)}
                </span>
              </div>
            </div>
            {/* Status Bar untuk Happiness */}
            <div className="stat-bar-container">
              <span className="stat-label">Happiness:</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${playerData.stats.happiness}%`,
                    backgroundColor: "yellowgreen",
                  }}
                ></div>
                <span className="stat-value">
                  {Math.round(playerData.stats.happiness)}
                </span>
              </div>
            </div>
            {/* Status Bar untuk Cleanliness */}
            <div className="stat-bar-container">
              <span className="stat-label">Cleanliness:</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${playerData.stats.cleanliness}%`,
                    backgroundColor: "lightblue",
                  }}
                ></div>
                <span className="stat-value">
                  {Math.round(playerData.stats.cleanliness)}
                </span>
              </div>
            </div>
            {/* Statistik Lainnya (Money, Items) */}
            <p>Money: ${playerData.stats.money}</p>
            {/* Menampilkan item dari objek */}
            <div className="inventory">
              <p>Items:</p>
              {Object.keys(playerData.stats.items || {}).length > 0 ? (
                <ul>
                  {Object.entries(playerData.stats.items).map(
                    ([itemName, quantity]) => (
                      <li key={itemName}>
                        {itemName}: {quantity}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>
            <p>Score: {playerData.stats.score}</p> {/* Menampilkan score */}
            <p>Waktu Hidup: {playerData.stats.lifetime} detik</p>{" "}
            {/* Menampilkan waktu hidup */}
            {/* Tombol Debug */}
            <button onClick={handleDebugDepleteStats} className="debug-button">
              Debug: Habiskan Status
            </button>
          </div>

          <div className="main-content-area">{renderCurrentScreen()}</div>
        </div>
      ) : (
        renderCurrentScreen()
      )}
    </div>
  );
}

export default App;
