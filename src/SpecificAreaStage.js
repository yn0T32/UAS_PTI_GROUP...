import React, { useState, useEffect, useCallback } from "react";
import beachImage from "./Images/beachimg.png";
import homeImage from "./Images/homeimg.png";
import mountainImage from "./Images/mountainimg.png";
import templeImage from "./Images/templeimg.png";
import lakeImage from "./Images/lakeimg.png";

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

const getRandomFish = () => {
  const rand = Math.random();
  if (rand < 0.6) return "Fish";
  if (rand < 0.85) return "Rare Fish";
  if (rand < 0.95) return "Epic Fish";
  return "Legendary Fish";
};

const areaData = {
  Beach: {
    background: `url(${beachImage})`,
    activityZones: [
      {
        name: "Swimming Spot",
        id: "swim",
        x: 100,
        y: 450,
        width: 150,
        height: 100,
        action: "Berenang (Happiness +10)",
        duration: 2000,
      },
      {
        name: "Coconut Stand",
        id: "coconut",
        x: 450,
        y: 150,
        width: 120,
        height: 80,
        action: "Beli Kelapa (Money -5)",
        duration: 1000,
      },
      {
        name: "Seashell Hunt",
        id: "seashell_hunt",
        x: 400,
        y: 380,
        width: 100,
        height: 70,
        action: "Cari Kerang (Dapat Seashell)",
        duration: 3000,
        itemReward: "Seashell",
      },
      {
        name: "Build Sandcastle",
        id: "sandcastle",
        x: 530,
        y: 400,
        width: 120,
        height: 90,
        action: "Buat Istana Pasir (Happiness +12)",
        duration: 2500,
      },
    ],
  },
  Forest: {
    background: `url(${mountainImage})`,
    activityZones: [
      {
        name: "Berry Bush",
        id: "berry",
        x: 200,
        y: 400,
        width: 80,
        height: 80,
        action: "Kumpulkan Berry (Dapat Wild Berries)",
        duration: 1500,
        itemReward: "Wild Berries",
      },
      {
        name: "Old Tree",
        id: "tree",
        x: 600,
        y: 100,
        width: 100,
        height: 150,
        action: "Istirahat di Pohon (Sleep +15)",
        duration: 2000,
      },
      {
        name: "Hunting Ground",
        id: "hunt",
        x: 50,
        y: 150,
        width: 120,
        height: 100,
        action: "Berburu (Dapat Money Pouch)",
        duration: 3000,
        itemReward: "Money Pouch",
      },
      {
        name: "Hidden Cave",
        id: "cave",
        x: 400,
        y: 500,
        width: 90,
        height: 70,
        action: "Jelajahi Gua (Dapat Forest Mushroom)",
        duration: 4000,
        itemReward: "Forest Mushroom",
      },
    ],
  },
  Home: {
    background: `url(${homeImage})`,
    activityZones: [
      {
        name: "Bed",
        id: "bed",
        x: 230,
        y: 100,
        width: 100,
        height: 100,
        action: "Tidur (Sleep +20)",
        duration: 2500,
      },
      {
        name: "Fridge",
        id: "fridge",
        x: 570,
        y: 280,
        width: 80,
        height: 80,
        action: "Makan Snack (Meal +10)",
        duration: 1000,
      },
      {
        name: "Shower",
        id: "shower",
        x: 570,
        y: 100,
        width: 80,
        height: 100,
        action: "Mandi (Cleanliness +20)",
        duration: 2000,
      },
      {
        name: "Work Desk",
        id: "work",
        x: 120,
        y: 380,
        width: 150,
        height: 120,
        action: "Bekerja (Money +20)",
        duration: 3000,
      },
      {
        name: "Clean Laundry",
        id: "laundry",
        x: 350,
        y: 450,
        width: 100,
        height: 80,
        action: "Cuci Baju (Dapat Clean Cloth)",
        duration: 1500,
        itemReward: "Clean Cloth",
      },
      {
        name: "Cooking",
        id: "cooking",
        x: 400,
        y: 150,
        width: 100,
        height: 80,
        action: "Memasak (Dapat Energy Bar, Meal +)",
        duration: 2000,
        itemReward: "Energy Bar",
      },
    ],
  },
  City: {
    background: "url(https://placehold.co/800x600/B2EBF2/000000?text=City+Life)",
    activityZones: [
      {
        name: "Shop",
        id: "shop",
        x: 150,
        y: 100,
        width: 120,
        height: 80,
        action: "Beli Potion",
        duration: 1500,
        itemBuy: "Potion",
      },
      {
        name: "Park",
        id: "park",
        x: 400,
        y: 300,
        width: 150,
        height: 100,
        action: "Bersantai di Taman (Happiness +5)",
        duration: 1500,
      },
      {
        name: "Bank",
        id: "bank",
        x: 600,
        y: 50,
        width: 100,
        height: 70,
        action: "Ambil Uang (Money +30)",
        duration: 1000,
      },
      {
        name: "Blacksmith",
        id: "blacksmith",
        x: 50,
        y: 500,
        width: 120,
        height: 90,
        action: "Beli Perisai",
        duration: 2000,
        itemBuy: "Wooden Shield",
      },
      {
        name: "Street Performer",
        id: "performer",
        x: 280,
        y: 50,
        width: 100,
        height: 70,
        action: "Tonton Pertunjukan (Happiness +8)",
        duration: 1000,
      },
      {
        name: "Tourist Info",
        id: "info",
        x: 500,
        y: 500,
        width: 100,
        height: 70,
        action: "Ambil Peta Kota (Dapat City Map)",
        duration: 500,
        itemReward: "City Map",
      },
    ],
  },
  Lake: {
    background: `url(${lakeImage})`,
    activityZones: [
      {
        name: "Fishing Spot",
        id: "fish",
        x: 100,
        y: 280,
        width: 100,
        height: 80,
        action: "Memancing (Dapat Fish)",
        duration: 3500,
        itemReward: "Fish",
      },
      {
        name: "Boating Dock",
        id: "boat",
        x: 320,
        y: 300,
        width: 120,
        height: 100,
        action: "Naik Perahu (Happiness +15)",
        duration: 2000,
      },
      {
        name: "Rare Fish Spot",
        id: "rare_fish",
        x: 500,
        y: 300,
        width: 110,
        height: 80,
        action: "Cari Ikan Langka (Dapat Ikan Spesial)",
        duration: 4000,
        itemReward: "Random Fish",
      },
      {
        name: "Crystal Shore",
        id: "crystal_shore",
        x: 250,
        y: 50,
        width: 100,
        height: 70,
        action: "Cari Kristal (Dapat Lake Crystal)",
        duration: 2000,
        itemReward: "Lake Crystal",
      },
    ],
  },
  Temple: {
    background: `url(${templeImage})`,
    activityZones: [
      {
        name: "Meditate Zone",
        id: "meditate",
        x: 420,
        y: 150,
        width: 100,
        height: 100,
        action: "Meditasi (Happiness +20, Sleep +5)",
        duration: 2500,
      },
      {
        name: "Altar",
        id: "altar",
        x: 300,
        y: 150,
        width: 80,
        height: 80,
        action: "Persembahan (Money -20)",
        duration: 1000,
      },
      {
        name: "Study Ancient Texts",
        id: "study_texts",
        x: 340,
        y: 300,
        width: 120,
        height: 90,
        action: "Pelajari Teks Kuno (Dapat Ancient Scroll)",
        duration: 3000,
        itemReward: "Ancient Scroll",
      },
      {
        name: "Find Lucky Charm",
        id: "lucky_charm_spot",
        x: 180,
        y: 400,
        width: 100,
        height: 70,
        action: "Temukan Jimat (Dapat Lucky Charm)",
        duration: 2000,
        itemReward: "Lucky Charm",
      },
      {
        name: "Dig for Relics",
        id: "dig_relics",
        x: 600,
        y: 500,
        width: 90,
        height: 70,
        action: "Gali Relik (Dapat Ancient Relic)",
        duration: 4000,
        itemReward: "Ancient Relic",
      },
    ],
  },
  Mountain: {
    background: `url(${mountainImage})`,
    activityZones: [
      {
        name: "Hiking Trail",
        id: "hike",
        x: 150,
        y: 400,
        width: 100,
        height: 200,
        action: "Mendaki (Cleanliness -5, Happiness +10)",
        duration: 2000,
      },
      {
        name: "Summit",
        id: "summit",
        x: 240,
        y: 90,
        width: 80,
        height: 80,
        action: "Nikmati Pemandangan (Happiness +25)",
        duration: 1500,
      },
      {
        name: "Mine Entrance",
        id: "mine",
        x: 350,
        y: 350,
        width: 100,
        height: 70,
        action: "Menambang (Dapat Gold Coin)",
        duration: 3000,
        itemReward: "Gold Coin",
      },
      {
        name: "Secret Peak",
        id: "secret_peak",
        x: 385,
        y: 160,
        width: 90,
        height: 70,
        action: "Puncak Rahasia (Dapat Mystery Box)",
        duration: 4500,
        itemReward: "Mystery Box",
      },
      {
        name: "Gather Herbs",
        id: "gather_herbs",
        x: 550,
        y: 450,
        width: 100,
        height: 70,
        action: "Kumpulkan Herbal (Dapat Mountain Herb)",
        duration: 2500,
        itemReward: "Mountain Herb",
      },
    ],
  },
};

const gameAreaWidth = 800;
const gameAreaHeight = 600;
const playerSize = 50;

function SpecificAreaStage({
  playerData,
  areaName,
  onGoBack,
  onUpdatePlayerStats,
  timeMultiplier,
  setTimeMultiplier,
  itemData: appItemData,
  handleUseItem,
}) {
  const currentArea = areaData[areaName];
  const initialPlayerPosition = playerData?.stats?.position || { x: 0, y: 0 };
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(
    initialPlayerPosition
  );
  const [activeZone, setActiveZone] = useState(null);
  const [isActivityActive, setIsActivityActive] = useState(false);
  const [activityProgress, setActivityProgress] = useState(0);

  if (!currentArea) {
    return (
      <div className="specific-area-stage-wrapper">
        <p>Maaf, area ini tidak ditemukan. Silakan kembali ke arena utama.</p>
        <button onClick={() => onGoBack()}>Kembali ke Arena Utama</button>
      </div>
    );
  }

  const updatePlayerPosition = useCallback(
    (newX, newY) => {
      if (!isActivityActive) {
        const boundedX = Math.max(0, Math.min(newX, gameAreaWidth - playerSize));
        const boundedY = Math.max(0, Math.min(newY, gameAreaHeight - playerSize));
        setPlayerCurrentPosition({ x: boundedX, y: boundedY });
      }
    },
    [isActivityActive]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isActivityActive) {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerCurrentPosition, updatePlayerPosition, isActivityActive]);

  useEffect(() => {
    const checkCollision = () => {
      if (!isActivityActive) {
        let collidedZone = null;
        if (currentArea.activityZones) {
          for (const zone of currentArea.activityZones) {
            const playerRight = playerCurrentPosition.x + playerSize;
            const playerBottom = playerCurrentPosition.y + playerSize;
            const zoneRight = zone.x + zone.width;
            const zoneBottom = zone.y + zone.height;

            if (
              playerRight > zone.x &&
              playerCurrentPosition.x < zoneRight &&
              playerBottom > zone.y &&
              playerCurrentPosition.y < zoneBottom
            ) {
              collidedZone = zone;
              break;
            }
          }
        }
        setActiveZone(collidedZone);
      } else {
        setActiveZone(null);
      }
    };

    checkCollision();
  }, [playerCurrentPosition, currentArea, isActivityActive]);

  const handlePerformActivity = () => {
    if (activeZone && !isActivityActive) {
      setIsActivityActive(true);
      setActivityProgress(0);

      const activityDuration = activeZone.duration || 1000;
      const actualDuration = activityDuration / timeMultiplier;

      const progressInterval = setInterval(() => {
        setActivityProgress((prev) => {
          return Math.min(100, prev + 100 / (actualDuration / 100));
        });
      }, 100);

      setTimeout(() => {
        clearInterval(progressInterval);
        setActivityProgress(100);
        setIsActivityActive(false);

        let newStats = { ...playerData.stats };
        let itemResult = null;
        let messageText = activeZone.action;

        switch (activeZone.id) {
          case "swim":
            newStats.happiness = Math.min(100, newStats.happiness + 10);
            break;
          case "coconut":
            newStats.money = Math.max(0, newStats.money - 5);
            break;
          case "berry":
            newStats.meal = Math.min(100, newStats.meal + 5);
            break;
          case "tree":
            newStats.sleep = Math.min(100, newStats.sleep + 15);
            break;
          case "bed":
            newStats.sleep = Math.min(100, newStats.sleep + 20);
            break;
          case "fridge":
            newStats.meal = Math.min(100, newStats.meal + 10);
            break;
          case "shower":
            newStats.cleanliness = Math.min(100, newStats.cleanliness + 20);
            break;
          case "work":
            newStats.money = (newStats.money || 0) + 20;
            break;
          case "bank":
            newStats.money = (newStats.money || 0) + 30;
            break;
          case "sandcastle":
            newStats.happiness = Math.min(100, newStats.happiness + 12);
            break;
          case "performer":
            newStats.happiness = Math.min(100, newStats.happiness + 8);
            break;
          case "hike":
            newStats.cleanliness = Math.max(0, newStats.cleanliness - 5);
            newStats.happiness = Math.min(100, newStats.happiness + 10);
            break;
          case "summit":
            newStats.happiness = Math.min(100, newStats.happiness + 25);
            break;
          case "boat":
            newStats.happiness = Math.min(100, newStats.happiness + 15);
            break;
          case "meditate":
            newStats.happiness = Math.min(100, newStats.happiness + 20);
            newStats.sleep = Math.min(100, newStats.sleep + 5);
            break;
          case "altar":
            newStats.money = Math.max(0, newStats.money - 20);
            break;
          case "seashell_hunt":
            itemResult = "Seashell";
            break;
          case "hunt":
            itemResult = "Money Pouch";
            break;
          case "cave":
            itemResult = "Ancient Scroll";
            break;
          case "fish":
            itemResult = "Fish";
            break;
          case "rare_fish":
            itemResult = getRandomFish();
            break;
          case "study_texts":
            itemResult = "Ancient Scroll";
            break;
          case "mine":
            itemResult = "Gold Coin";
            break;
          case "secret_peak":
            itemResult = "Mystery Box";
            break;
          case "laundry":
            itemResult = "Clean Cloth";
            break;
          case "cooking":
            itemResult = "Energy Bar";
            break;
          case "info":
            itemResult = "City Map";
            break;
          case "crystal_shore":
            itemResult = "Lake Crystal";
            break;
          case "lucky_charm_spot":
            itemResult = "Lucky Charm";
            break;
          case "dig_relics":
            itemResult = "Ancient Relic";
            break;
          case "gather_herbs":
            itemResult = "Mountain Herb";
            break;
          case "shop":
            if ((newStats.money || 0) >= appItemData["Potion"].cost) {
              newStats.money = newStats.money - appItemData["Potion"].cost;
              itemResult = "Potion";
            } else {
              alert("Uang tidak cukup untuk membeli Potion!");
              setIsActivityActive(false);
              return;
            }
            break;
          case "blacksmith":
            if ((newStats.money || 0) >= appItemData["Wooden Shield"].cost) {
              newStats.money = newStats.money - appItemData["Wooden Shield"].cost;
              itemResult = "Wooden Shield";
            } else {
              alert("Uang tidak cukup untuk membeli Perisai!");
              setIsActivityActive(false);
              return;
            }
            break;
          default:
            break;
        }

        if (itemResult) {
          newStats.items = newStats.items || {};
          newStats.items[itemResult] = (newStats.items[itemResult] || 0) + 1;
          newStats.score = (newStats.score || 0) + (appItemData[itemResult]?.score || 0);
          messageText = `Anda ${activeZone.action}. Mendapatkan ${itemResult}! Score +${appItemData[itemResult]?.score || 0}.`;
        } else {
          messageText = activeZone.action;
        }

        for (let statKey in newStats) {
          if (
            typeof newStats[statKey] === "number" &&
            statKey !== "money" &&
            statKey !== "score" &&
            statKey !== "lifetime"
          ) {
            newStats[statKey] = Math.min(100, Math.max(0, newStats[statKey]));
          }
        }

        onUpdatePlayerStats(newStats);
        alert(messageText);
      }, actualDuration);
    }
  };

  const toggleFastForward = () => {
    setTimeMultiplier((prev) => (prev === 1 ? 5 : 1));
  };

  return (
    <div className="specific-area-stage-wrapper">
      <div
        className={`game-area ${isActivityActive ? "activity-active" : ""}`}
        style={{
          width: gameAreaWidth,
          height: gameAreaHeight,
          backgroundImage: currentArea?.background,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={playerData.character.image}
          alt={playerData.character.name}
          className={`player-avatar ${isActivityActive ? "activity-animating" : ""}`}
          style={{
            left: playerCurrentPosition.x,
            top: playerCurrentPosition.y,
            width: playerSize,
            height: playerSize,
          }}
        />

        {currentArea.activityZones?.map((zone) => (
          <div
            key={zone.id}
            className={`activity-zone ${activeZone && activeZone.id === zone.id ? "active" : ""}`}
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.width,
              height: zone.height,
            }}
          >
            {zone.name}
          </div>
        ))}

        <button
          className="back-to-main-button"
          onClick={() => onGoBack()}
          disabled={isActivityActive}
        >
          ⬅️ Back to Main Arena
        </button>
      </div>

      {activeZone && !isActivityActive && (
        <div className="activity-button-container">
          <button onClick={handlePerformActivity}>{activeZone.action}</button>
        </div>
      )}

      {isActivityActive && (
        <div className="activity-feedback-container">
          <div className="activity-progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${activityProgress}%` }}
            ></div>
            <span className="progress-text">
              Melakukan Aktivitas... {Math.round(activityProgress)}%
            </span>
          </div>
          <button onClick={toggleFastForward} className="fast-forward-button">
            Fast Forward ({timeMultiplier}x)
          </button>
        </div>
      )}

      <div className="on-screen-controls">
        <button
          onClick={() =>
            updatePlayerPosition(
              playerCurrentPosition.x,
              playerCurrentPosition.y - 20
            )
          }
          disabled={isActivityActive}
        >
          ⬆️
        </button>
        <div>
          <button
            onClick={() =>
              updatePlayerPosition(
                playerCurrentPosition.x - 20,
                playerCurrentPosition.y
              )
            }
            disabled={isActivityActive}
          >
            ⬅️
          </button>
          <button
            onClick={() =>
              updatePlayerPosition(
                playerCurrentPosition.x + 20,
                playerCurrentPosition.y
              )
            }
            disabled={isActivityActive}
          >
            ➡️
          </button>
        </div>
        <button
          onClick={() =>
            updatePlayerPosition(
              playerCurrentPosition.x,
              playerCurrentPosition.y + 20
            )
          }
          disabled={isActivityActive}
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}

export default SpecificAreaStage;