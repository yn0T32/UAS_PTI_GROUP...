import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
// Tidak lagi mengimpor CSS terpisah, semua CSS sekarang di App.css

// Catatan: Array karakter sekarang diteruskan dari App.js sebagai prop.
// Jika tidak ada prop `characters` yang diteruskan, ini akan menggunakan array kosong.
function CharacterSelection({ onSelectionComplete, characters = [] }) {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");

  // Pastikan ada karakter sebelum mencoba mengaksesnya
  const currentCharacter =
    characters.length > 0 ? characters[currentCharacterIndex] : null;

  const handlePrevClick = () => {
    if (characters.length === 0) return;
    setCurrentCharacterIndex((prevIndex) =>
      prevIndex === 0 ? characters.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    if (characters.length === 0) return;
    setCurrentCharacterIndex((prevIndex) =>
      prevIndex === characters.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() === "") {
      alert("Nama pemain tidak boleh kosong!"); // Gunakan modal kustom di aplikasi nyata
      return;
    }
    if (!currentCharacter) {
      alert("Silakan pilih karakter!"); // Gunakan modal kustom di aplikasi nyata
      return;
    }
    // Menggunakan karakter dari prop
    onSelectionComplete(currentCharacter, playerName);
  };

  return (
    <div className="character-selection-container">
      <div className="carousel-wrapper">
        <button className="nav-button prev" onClick={handlePrevClick}>
          &lt;
        </button>
        <div className="character-display">
          {/* Tampilkan CharacterCard hanya jika ada karakter yang tersedia */}
          {currentCharacter ? (
            <CharacterCard character={currentCharacter} />
          ) : (
            <p>Memuat Karakter...</p>
          )}
        </div>
        <button className="nav-button next" onClick={handleNextClick}>
          &gt;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="player-input-form">
        <label htmlFor="playerName">Masukkan Nama Pemain:</label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nama Anda"
          required
        />
        <button type="submit">Mulai Game</button>
      </form>
    </div>
  );
}

export default CharacterSelection;
