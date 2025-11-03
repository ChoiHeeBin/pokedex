import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error("포켓몬 데이터 가져오기 실패:", err);
      }
    };
    fetchPokemon();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!pokemon) return <p>포켓몬을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>타입: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>능력치:</p>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}