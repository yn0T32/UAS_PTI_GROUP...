import React from "react";
// Tidak lagi mengimpor CSS terpisah, semua CSS sekarang di App.css

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      {/* Menggunakan gambar karakter dari prop */}
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
    </div>
  );
}

export default CharacterCard;
