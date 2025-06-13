import React, { useState } from "react";
import CharacterCard from "./CharacterCard";

function CharacterSelection({ onSelectionComplete, characters = [] }) {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");


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
      alert("Nama pemain tidak boleh kosong!"); 
      return;
    }
    if (!currentCharacter) {
      alert("Silakan pilih karakter!"); 
      return;
    }

    onSelectionComplete(currentCharacter, playerName);
  };

  return (
    <div className="character-selection-container">
      <div className="carousel-wrapper">
        <button className="nav-button prev" onClick={handlePrevClick}>
          &lt;
        </button>
        <div className="character-display">
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
