import React, { useState, useEffect } from "react";
import { Card } from "antd";
import useFetch from "../utils/useFetch";

// Realice el cambio de una arquitectura de clase a una arquitectura de componentes
// funcionales mediante el uso de hooks como useState y useEffect

// Borre el constructor y use estados para manejar la información del pokemon visitado
function PokemonDetail(props) {
  const { match } = props;
  const pokemonName = match.params.id;
  // Capitalizar el nombre para mejorar el UI
  const capitalizedName =
    pokemonName.charAt(0).toUpperCase() + match.params.id.slice(1);
  const [pokemon, setPokemon] = useState(null);
  const { loading, data, error } = useFetch(`/pokemon/${pokemonName}`);

  // Primero, cambie el método componentDidMount por useEffect para hacer la llamada al API usando componentes funcionales.
  // Después, hice mi propio hook para hacer la llamada al API
  useEffect(() => {
    if (!loading && data) {
      setPokemon(data);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ocurrió el siguiente error: {error}</div>;
  }

  if (!pokemon) {
    return <div>Los datos del Pokémon aún no están disponibles.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <Card
        style={{
          width: "300px",
          backgroundColor: "#f5f5f5",
          border: "2px solid #333",
          borderRadius: "15px",
          padding: "10px",
          textAlign: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
            }}
            alt={pokemon.name}
            src={pokemon.sprites?.front_default}
          />
        </div>
        <Card.Meta
          title={capitalizedName}
          description={
            <>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>
                Type: {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;
