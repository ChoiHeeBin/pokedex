import React, { useState, useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return setResults([]);
    setLoading(true);

    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        const data = await res.json();
        setResults([data]);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="포켓몬 이름 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      {loading && <p>검색 중...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {results.map((pokemon) => (
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
    </div>
  );
}