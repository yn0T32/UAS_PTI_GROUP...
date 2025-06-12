import React, { useState, useEffect, useCallback } from "react";
// Catatan: Impor CSS sudah dihapus karena semua gaya digabungkan ke App.css

// Definisikan data item beserta skor yang mereka berikan
const itemData = {
  Potion: {
    score: 10,
    cost: 10,
    description: "Menyembuhkan sedikit HP (contoh).",
  },
  "Fishing Rod": {
    score: 50,
    cost: 20,
    description: "Digunakan untuk memancing ikan.",
  },
  "Rare Gem": {
    score: 100,
    cost: 50,
    description: "Batu mulia yang sangat langka.",
  },
  "Ancient Scroll": {
    score: 75,
    cost: 30,
    description: "Gulungan kuno berisi pengetahuan.",
  },
  "Wooden Shield": {
    score: 20,
    cost: 15,
    description: "Perisai dasar dari kayu.",
  },
  "Gold Coin": { score: 5, cost: 1, description: "Koin emas standar." },
  "Wild Berries": {
    score: 5,
    cost: 0,
    description: "Berry liar yang bisa dimakan.",
  },
  "Clean Cloth": { score: 8, cost: 2, description: "Kain bersih untuk mandi." },
};

const areaData = {
  Beach: {
    background:
      "url(https://placehold.co/800x600/FFE0B2/000000?text=Beach+Area)",
    activityZones: [
      {
        name: "Swimming Spot",
        id: "swim",
        x: 100,
        y: 300,
        width: 150,
        height: 100,
        action: "Go for a swim (Happiness +10)",
      },
      {
        name: "Coconut Stand",
        id: "coconut",
        x: 500,
        y: 150,
        width: 120,
        height: 80,
        action: "Buy a Coconut (Money -5)",
      },
      {
        name: "Seashell Hunt",
        id: "seashell",
        x: 250,
        y: 100,
        width: 100,
        height: 70,
        action: "Cari Kerang (Dapat Rare Gem, Score +)",
      }, // Menambah item
      {
        name: "Build Sandcastle",
        id: "sandcastle",
        x: 650,
        y: 400,
        width: 120,
        height: 90,
        action: "Buat Istana Pasir (Happiness +12)",
      },
    ],
  },
  Forest: {
    background:
      "url(https://placehold.co/800x600/C8E6C9/000000?text=Forest+Area)",
    activityZones: [
      {
        name: "Berry Bush",
        id: "berry",
        x: 200,
        y: 400,
        width: 80,
        height: 80,
        action: "Gather berries (Meal +5)",
      },
      {
        name: "Old Tree",
        id: "tree",
        x: 600,
        y: 100,
        width: 100,
        height: 150,
        action: "Rest under tree (Sleep +15)",
      },
      {
        name: "Hunting Ground",
        id: "hunt",
        x: 50,
        y: 150,
        width: 120,
        height: 100,
        action: "Berburu (Dapat Wild Berries, Score +)",
      }, // Menambah item
      {
        name: "Hidden Cave",
        id: "cave",
        x: 400,
        y: 500,
        width: 90,
        height: 70,
        action: "Jelajahi Gua (Dapat Ancient Scroll, Score +)",
      }, // Menambah item
    ],
  },
  Home: {
    background:
      "url(https://placehold.co/800x600/CFD8DC/000000?text=Home+Sweet+Home)",
    activityZones: [
      {
        name: "Bed",
        id: "bed",
        x: 100,
        y: 200,
        width: 100,
        height: 100,
        action: "Sleep (Sleep +20)",
      },
      {
        name: "Fridge",
        id: "fridge",
        x: 300,
        y: 250,
        width: 80,
        height: 80,
        action: "Eat a snack (Meal +10)",
      },
      {
        name: "Shower",
        id: "shower",
        x: 50,
        y: 350,
        width: 80,
        height: 100,
        action: "Mandi (Cleanliness +20)",
      },
      {
        name: "Work Desk",
        id: "work",
        x: 450,
        y: 100,
        width: 150,
        height: 120,
        action: "Bekerja (Money +20)",
      }, // Menambah uang
    ],
  },
  City: {
    background:
      "url(https://placehold.co/800x600/B2EBF2/000000?text=City+Life)",
    activityZones: [
      {
        name: "Shop",
        id: "shop",
        x: 150,
        y: 100,
        width: 120,
        height: 80,
        action: "Buy Potion (Money -10, Item +)",
      }, // Menambah item & score
      {
        name: "Park",
        id: "park",
        x: 400,
        y: 300,
        width: 150,
        height: 100,
        action: "Relax in Park (Happiness +5)",
      },
      {
        name: "Bank",
        id: "bank",
        x: 600,
        y: 50,
        width: 100,
        height: 70,
        action: "Ambil Uang (Money +30)",
      }, // Menambah uang
      {
        name: "Blacksmith",
        id: "blacksmith",
        x: 50,
        y: 500,
        width: 120,
        height: 90,
        action: "Beli Perisai (Dapat Wooden Shield, Money -15, Score +)",
      }, // Menambah item & score
    ],
  },
  Lake: {
    background:
      "url(https://placehold.co/800x600/A7D9EE/000000?text=Lake+Area)",
    activityZones: [
      {
        name: "Fishing Spot",
        id: "fish",
        x: 150,
        y: 450,
        width: 100,
        height: 80,
        action: "Go Fishing (Dapat Fishing Rod, Score +)",
      }, // Menambah item & score
      {
        name: "Boating Dock",
        id: "boat",
        x: 550,
        y: 300,
        width: 120,
        height: 100,
        action: "Go Boating (Happiness +15)",
      },
      {
        name: "Rare Fish Spot",
        id: "rare_fish",
        x: 300,
        y: 100,
        width: 110,
        height: 80,
        action: "Cari Ikan Langka (Dapat Rare Gem, Score +)",
      }, // Menambah item
    ],
  },
  Temple: {
    background:
      "url(https://placehold.co/800x600/F0F4C3/000000?text=Temple+Area)",
    activityZones: [
      {
        name: "Meditate Zone",
        id: "meditate",
        x: 300,
        y: 200,
        width: 100,
        height: 100,
        action: "Meditasi (Happiness +20, Sleep +5)",
      },
      {
        name: "Altar",
        id: "altar",
        x: 600,
        y: 400,
        width: 80,
        height: 80,
        action: "Persembahan (Money -20)",
      },
      {
        name: "Study Ancient Texts",
        id: "study_texts",
        x: 100,
        y: 50,
        width: 120,
        height: 90,
        action: "Pelajari Teks Kuno (Dapat Ancient Scroll, Score +)",
      }, // Menambah item
    ],
  },
  Mountain: {
    background:
      "url(https://placehold.co/800x600/BDBDBD/000000?text=Mountain+Area)",
    activityZones: [
      {
        name: "Hiking Trail",
        id: "hike",
        x: 50,
        y: 100,
        width: 100,
        height: 200,
        action: "Mendaki (Cleanliness -5, Happiness +10)",
      },
      {
        name: "Summit",
        id: "summit",
        x: 700,
        y: 50,
        width: 80,
        height: 80,
        action: "Nikmati Pemandangan (Happiness +25)",
      },
      {
        name: "Mine Entrance",
        id: "mine",
        x: 250,
        y: 450,
        width: 100,
        height: 70,
        action: "Menambang (Dapat Gold Coin, Score +)",
      }, // Menambah item
      {
        name: "Secret Peak",
        id: "secret_peak",
        x: 450,
        y: 250,
        width: 90,
        height: 70,
        action: "Puncak Rahasia (Dapat Rare Gem, Score +)",
      }, // Menambah item
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
}) {
  const currentArea = areaData[areaName];

  const initialPlayerPosition = playerData?.stats?.position || { x: 0, y: 0 };
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(
    initialPlayerPosition
  );
  const [activeZone, setActiveZone] = useState(null);

  if (!currentArea) {
    console.error(
      `Area "${areaName}" tidak ditemukan dalam areaData. Menampilkan fallback UI.`
    );
    return (
      <div className="specific-area-stage-wrapper">
        <p>Maaf, area ini tidak ditemukan. Silakan kembali ke arena utama.</p>
        <button onClick={() => onGoBack()}>Kembali ke Arena Utama</button>
      </div>
    );
  }

  const updatePlayerPosition = useCallback((newX, newY) => {
    const boundedX = Math.max(0, Math.min(newX, gameAreaWidth - playerSize));
    const boundedY = Math.max(0, Math.min(newY, gameAreaHeight - playerSize));
    setPlayerCurrentPosition({ x: boundedX, y: boundedY });
  }, []);

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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerCurrentPosition, updatePlayerPosition]);

  useEffect(() => {
    const checkCollision = () => {
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
    };

    checkCollision();
  }, [playerCurrentPosition, currentArea]);

  const handlePerformActivity = () => {
    if (activeZone) {
      console.log(`Melakukan aktivitas: ${activeZone.action}`);
      let newStats = { ...playerData.stats };
      let itemGained = null; // Untuk menyimpan nama item yang didapat

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
          break; // Mandi
        case "work":
          newStats.money = (newStats.money || 0) + 20;
          break; // Bekerja
        case "bank":
          newStats.money = (newStats.money || 0) + 30;
          break; // Ambil uang dari bank

        // Aktivitas yang memberikan ITEM dan SCORE
        case "shop": // Beli Potion
          if ((newStats.money || 0) >= itemData["Potion"].cost) {
            newStats.money = newStats.money - itemData["Potion"].cost;
            itemGained = "Potion";
          } else {
            alert("Uang tidak cukup untuk membeli Potion!");
            return; // Hentikan aktivitas jika uang tidak cukup
          }
          break;
        case "seashell": // Cari Kerang (dapat Rare Gem)
          itemGained = "Rare Gem";
          break;
        case "hunt": // Berburu (dapat Wild Berries)
          itemGained = "Wild Berries";
          break;
        case "cave": // Jelajahi Gua (dapat Ancient Scroll)
          itemGained = "Ancient Scroll";
          break;
        case "blacksmith": // Beli Perisai (dapat Wooden Shield)
          if ((newStats.money || 0) >= itemData["Wooden Shield"].cost) {
            newStats.money = newStats.money - itemData["Wooden Shield"].cost;
            itemGained = "Wooden Shield";
          } else {
            alert("Uang tidak cukup untuk membeli Perisai!");
            return; // Hentikan aktivitas jika uang tidak cukup
          }
          break;
        case "fish": // Memancing (dapat Fishing Rod)
          itemGained = "Fishing Rod";
          break;
        case "rare_fish": // Cari ikan langka (dapat Rare Gem)
          itemGained = "Rare Gem";
          break;
        case "study_texts": // Pelajari Teks Kuno (dapat Ancient Scroll)
          itemGained = "Ancient Scroll";
          break;
        case "mine": // Menambang (dapat Gold Coin)
          itemGained = "Gold Coin";
          break;
        case "secret_peak": // Puncak Rahasia (dapat Rare Gem)
          itemGained = "Rare Gem";
          break;
        case "sandcastle":
          newStats.happiness = Math.min(100, newStats.happiness + 12);
          break; // Buat Istana Pasir

        default:
          break;
      }

      // Logika penambahan item ke inventaris dan penambahan score
      if (itemGained) {
        // Pastikan newStats.items adalah objek dan inisialisasi jika null/undefined
        newStats.items = newStats.items || {};
        newStats.items[itemGained] = (newStats.items[itemGained] || 0) + 1; // Tambah kuantitas item
        newStats.score =
          (newStats.score || 0) + (itemData[itemGained]?.score || 0); // Tambah score dari item
        alert(
          `Anda mendapatkan ${itemGained}! Score +${
            itemData[itemGained]?.score || 0
          }.`
        );
      }

      // Pastikan semua stat dalam batas 0-100 (kecuali money dan score)
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

      onUpdatePlayerStats(newStats); // Update stats di komponen induk (App.js)
      // Pesan aktivitas bisa digabung jika ada item yang didapat
      if (!itemGained) {
        // Jika tidak ada item yang didapat, tampilkan pesan aktivitas standar
        alert(`${activeZone.action}! Stats diperbarui.`); // Ganti dengan modal/notifikasi kustom
      }
    }
  };

  return (
    <div className="specific-area-stage-wrapper">
      <div
        className="game-area"
        style={{
          width: gameAreaWidth,
          height: gameAreaHeight,
          backgroundImage: currentArea?.background,
          backgroundSize: "cover",
          backgroundPosition: "center",
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

        {currentArea.activityZones?.map((zone) => (
          <div
            key={zone.id}
            className={`activity-zone ${
              activeZone && activeZone.id === zone.id ? "active" : ""
            }`}
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

        <button className="back-to-main-button" onClick={() => onGoBack()}>
          ⬅️ Back to Main Arena
        </button>
      </div>

      {activeZone && (
        <div className="activity-button-container">
          <button onClick={handlePerformActivity}>{activeZone.action}</button>
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
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}

export default SpecificAreaStage;
