

import React, { useContext, createContext, useState } from "react";

// 찜 목록 전역 상태용 Context
const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.find((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };
  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);

// Favorite 페이지
export default function Favorite() {
  const { favorites } = useFavorite();

  if (favorites.length === 0) return <p>찜한 포켓몬이 없습니다.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {favorites.map((pokemon) => (
        <div
          key={pokemon.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            width: "150px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: "100px", height: "100px" }}
          />
          <h3>{pokemon.name}</h3>
          <p>타입: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}