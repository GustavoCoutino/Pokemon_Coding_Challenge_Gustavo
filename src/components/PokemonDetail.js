import React, { useState, useEffect } from "react";
import { Card } from "antd";
import useFetch from "../utils/useFetch";

// Realice el cambio de una arquitectura de clase a una arquitectura de componentes
// funcionales mediante el uso de hooks como useState y useEffect

// Borre el constructor y use estados para manejar la información del pokemon visitado
function PokemonDetail(props) {
  const { match } = props;
  const pokemonName = match.params.id;
  const [pokemon, setPokemon] = useState(null);

  // Primero, cambie el método componentDidMount por useEffect para hacer la llamada al API usando componentes funcionales.
  // Después, hice mi propio hook para hacer la llamada al API
  const { loading, data, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  useEffect(() => {
    if (!loading && data) {
      setPokemon(data);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>The following error occurred: {error}</div>;
  }

  // Esta condicion es necesaria para evitar errores cuando el pokemon no ha sido cargado
  // Si no se tiene esta condición, el componente intentara renderizar el pokemon cuando es igual a null
  // y esto causara un error
  if (!pokemon) {
    return <div>Pokemon data is not available yet.</div>;
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
