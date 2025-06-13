import React, { useState, useEffect } from "react";
import CharacterSelection from "./CharacterSelection";
import MainGameArena from "./MainGameArena";
import SpecificAreaStage from "./SpecificAreaStage";
import GameOverScreen from "./GameOverScreen";
import "./App.css";

import Male1 from "./Images/Male1.png";
import Male2 from "./Images/Male2.png";
import Female1 from "./Images/Female1.png";
import Female2 from "./Images/Female2.png";

const characters = [
  { id: 1, image: Male1 },
  { id: 2, image: Male2 },
  { id: 3, image: Female1 },
  { id: 4, image: Female2 },
];

const itemData = {
  Potion: {
    score: 10,
    cost: 10,
    description: "Menyembuhkan sedikit HP (contoh).",
    useEffect: { restoreMeal: 20, restoreHappiness: 5 },
  },
  "Fishing Rod": {
    score: 50,
    cost: 20,
    description: "Digunakan untuk memancing ikan.",
    consumable: false,
  },
  "Rare Gem": {
    score: 100,
    cost: 0,
    description: "Batu mulia yang sangat langka.",
    consumable: false,
  },
  "Ancient Scroll": {
    score: 75,
    cost: 0,
    description: "Gulungan kuno berisi pengetahuan.",
    consumable: false,
  },
  "Wooden Shield": {
    score: 20,
    cost: 15,
    description: "Perisai dasar dari kayu.",
    consumable: false,
  },
  "Gold Coin": {
    score: 5,
    cost: 0,
    description: "Koin emas standar.",
    consumable: false,
  },
  "Wild Berries": {
    score: 5,
    cost: 0,
    description: "Berry liar yang bisa dimakan.",
    useEffect: { restoreMeal: 10 },
  },
  "Clean Cloth": {
    score: 8,
    cost: 2,
    description: "Kain bersih untuk mandi.",
    useEffect: { restoreCleanliness: 25 },
  },
  "Energy Bar": {
    score: 12,
    cost: 8,
    description: "Bar energi cepat.",
    useEffect: { restoreSleep: 15, restoreMeal: 5 },
  },
  "Lucky Charm": {
    score: 30,
    cost: 0,
    description: "Jimat keberuntungan.",
    consumable: false,
  },
  "Mystery Box": {
    score: 200,
    cost: 100,
    description: "Kotak misteri, berikan skor besar!",
    useEffect: { addScore: 200 },
  },
  "Money Pouch": {
    score: 25,
    cost: 0,
    description: "Kantong berisi uang.",
    useEffect: { addMoney: 50 },
  },
  Fish: {
    score: 15,
    cost: 0,
    description: "Ikan biasa.",
    useEffect: { restoreMeal: 15 },
  },
  "Rare Fish": {
    score: 40,
    cost: 0,
    description: "Ikan langka.",
    useEffect: { restoreMeal: 30, restoreHappiness: 5 },
  },
  "Epic Fish": {
    score: 70,
    cost: 0,
    description: "Ikan epik.",
    useEffect: { restoreMeal: 50, restoreHappiness: 10, restoreSleep: 5 },
  },
  "Legendary Fish": {
    score: 150,
    cost: 0,
    description: "Ikan legendaris!",
    useEffect: {
      restoreMeal: 80,
      restoreHappiness: 20,
      restoreSleep: 10,
      restoreCleanliness: 5,
    },
  },
  Seashell: {
    score: 3,
    cost: 0,
    description: "Kerang cantik dari pantai.",
    consumable: false,
  },
  "Forest Mushroom": {
    score: 7,
    cost: 0,
    description: "Jamur dari hutan.",
    useEffect: { restoreMeal: 12 },
  },
  "City Map": {
    score: 10,
    cost: 5,
    description: "Peta kota.",
    consumable: false,
  },
  "Lake Crystal": {
    score: 20,
    cost: 0,
    description: "Kristal bening dari danau.",
    consumable: false,
  },
  "Ancient Relic": {
    score: 90,
    cost: 0,
    description: "Relik kuno dari kuil.",
    consumable: false,
  },
  "Mountain Herb": {
    score: 10,
    cost: 0,
    description: "Herbal pegunungan.",
    useEffect: { restoreCleanliness: 10 },
  },
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("characterSelection");
  const [activeArea, setActiveArea] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [timeMultiplier, setTimeMultiplier] = useState(1);

  const handleSelectionComplete = (selectedCharacter, playerName) => {
    const initialPlayerStats = {
      meal: 100,
      sleep: 100,
      happiness: 100,
      cleanliness: 100,
      money: 100,
      items: {},
      position: { x: 0, y: 0 },
      score: 0,
      lifetime: 0,
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

  const handleUseItem = (itemName) => {
    setPlayerData((prevPlayerData) => {
      if (!prevPlayerData) return prevPlayerData;

      const newStats = { ...prevPlayerData.stats };
      const currentItems = { ...newStats.items };
      const itemToUse = itemData[itemName];

      if (currentItems[itemName] > 0 && itemToUse?.useEffect) {
        if (itemToUse.useEffect.restoreMeal)
          newStats.meal = Math.min(
            100,
            newStats.meal + itemToUse.useEffect.restoreMeal
          );
        if (itemToUse.useEffect.restoreSleep)
          newStats.sleep = Math.min(
            100,
            newStats.sleep + itemToUse.useEffect.restoreSleep
          );
        if (itemToUse.useEffect.restoreHappiness)
          newStats.happiness = Math.min(
            100,
            newStats.happiness + itemToUse.useEffect.restoreHappiness
          );
        if (itemToUse.useEffect.restoreCleanliness)
          newStats.cleanliness = Math.min(
            100,
            newStats.cleanliness + itemToUse.useEffect.restoreCleanliness
          );
        if (itemToUse.useEffect.addMoney)
          newStats.money = (newStats.money || 0) + itemToUse.useEffect.addMoney;
        if (itemToUse.useEffect.addScore)
          newStats.score = (newStats.score || 0) + itemToUse.useEffect.addScore;

        if (itemToUse.consumable !== false) {
          currentItems[itemName] -= 1;
          if (currentItems[itemName] <= 0) {
            delete currentItems[itemName];
          }
        }

        for (let statKey in newStats) {
          if (
            typeof newStats[statKey] === "number" &&
            statKey !== "money" &&
            statKey !== "score" &&
            statKey !== "lifetime"
          ) {
            newStats[statKey] = Math.min(100, newStats[statKey]);
            newStats[statKey] = Math.max(0, newStats[statKey]);
          }
        }

        alert(`Menggunakan ${itemName}! ${itemToUse.description || ""}`);

        return {
          ...prevPlayerData,
          stats: newStats,
          items: currentItems,
        };
      } else if (currentItems[itemName] === 0) {
        alert(`Anda tidak memiliki ${itemName} untuk digunakan.`);
      } else {
        alert(
          `${itemName} tidak bisa digunakan (atau tidak memiliki efek konsumsi).`
        );
      }
      return prevPlayerData;
    });
  };

  useEffect(() => {
    if (!gameStarted || !playerData || currentScreen === "gameOver") return;

    const interval = setInterval(() => {
      setPlayerData((prevPlayerData) => {
        if (!prevPlayerData || !prevPlayerData.stats) return prevPlayerData;

        const newStats = { ...prevPlayerData.stats };

        newStats.meal = Math.max(0, newStats.meal - 0.5 * timeMultiplier);
        newStats.sleep = Math.max(0, newStats.sleep - 0.3 * timeMultiplier);
        newStats.happiness = Math.max(
          0,
          newStats.happiness - 0.2 * timeMultiplier
        );
        newStats.cleanliness = Math.max(
          0,
          newStats.cleanliness - 0.1 * timeMultiplier
        );

        newStats.score = (newStats.score || 0) + 10 * timeMultiplier;
        newStats.lifetime = (newStats.lifetime || 0) + 1 * timeMultiplier;

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
          setGameOverMessage(message);
          setCurrentScreen("gameOver");
          setTimeMultiplier(1);
          return prevPlayerData;
        }

        return {
          ...prevPlayerData,
          stats: newStats,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, playerData, currentScreen, timeMultiplier]);

  const handleRestartGame = () => {
    setGameStarted(false);
    setPlayerData(null);
    setCurrentScreen("characterSelection");
    setActiveArea(null);
    setGameOverMessage("");
    setTimeMultiplier(1);
  };

  const handleDebugDepleteStats = () => {
    if (playerData) {
      setPlayerData((prev) => ({
        ...prev.stats,
        stats: {
          ...prev.stats,
          meal: 0,
          sleep: 0,
          happiness: 0,
          cleanliness: 0,
        },
      }));
    }
  };

  const toggleGlobalFastForward = () => {
    setTimeMultiplier((prev) => (prev === 1 ? 5 : 1));
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
    setTimeMultiplier(1);
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
            timeMultiplier={timeMultiplier}
            setTimeMultiplier={setTimeMultiplier}
            itemData={itemData}
            handleUseItem={handleUseItem}
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
      <h1>Ucup Exploring the Archipelago</h1>

      {gameStarted && playerData && currentScreen !== "gameOver" ? (
        <div className="game-layout">
          <div className="sidebar-stats">
            <h3>
              {playerData.name} - {playerData.character.name}
            </h3>
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

            <p>Money: ${playerData.stats.money}</p>
            <div className="inventory">
              <p>Items:</p>
              {Object.keys(playerData.stats.items || {}).length > 0 ? (
                <ul>
                  {Object.entries(playerData.stats.items).map(
                    ([itemName, quantity]) => (
                      <li key={itemName}>
                        {itemName} ({quantity})
                        {itemData[itemName]?.useEffect && quantity > 0 && (
                          <button
                            onClick={() => handleUseItem(itemName)}
                            className="use-item-button"
                          >
                            Gunakan
                          </button>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>
            <p>Score: {playerData.stats.score}</p>
            <p>Waktu Hidup: {playerData.stats.lifetime} detik</p>
            <button
              onClick={toggleGlobalFastForward}
              className="fast-forward-button-global"
            >
              Fast Forward ({timeMultiplier}x)
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