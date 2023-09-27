import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import { Card } from "antd";

// Realice el cambio de una arquitectura de clase a una arquitectura de componentes
// funcionales mediante el uso de hooks como useState y useEffect

// Borre el constructor y use estados para manejar la información del pokemon visitado
function PokemonDetail(props) {
  const [pokemon, setPokemon] = useState(null);

  // Utilice useEffect en vez de componentDidMount para hacer el fetch de los pokemones
  // Use la functión de estado para cambiar el estado del pokemon
  // Tengo que crear un custom hook para hacer el fetch de los pokemones
  useEffect(() => {
    const { match } = props;
    fetchData(`/pokemon/${match.params.id}`)
      .then((data) => setPokemon(data))
      .catch((error) => console.error(error));
  });

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta
          title={pokemon.name}
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
