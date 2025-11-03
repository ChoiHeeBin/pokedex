import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();

        // 각 포켓몬 세부 정보 fetch
        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const pokeRes = await fetch(poke.url);
            return await pokeRes.json();
          })
        );

        setPokemonList(detailedPokemon);
        setLoading(false);
      } catch (err) {
        console.error("포켓몬 데이터 가져오기 실패:", err);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.id}
          onClick={() => navigate(`/detail/${pokemon.id}`)}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            width: "150px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            cursor: "pointer", // 클릭 가능 표시
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