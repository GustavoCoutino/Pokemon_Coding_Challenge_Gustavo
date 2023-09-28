import React, { useState, useEffect, useCallback, useMemo } from "react";
import { sortData, filterData } from "../utils/helpers";
import Filter from "./Filter";
import { List, Card } from "antd";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

// Realice el cambio de una arquitectura de clase a una arquitectura de componentes
// funcionales mediante el uso de hooks como useState, useEffect, useCallback y useMemo.
// Borre el constructor y use estados para manejar la data de los pokemones, el filtro, y el sort
function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");

  const [url] = useState(`/pokemon`);
  const res = useFetch(url);
  const { loading, data, error } = res;

  // Primero, cambie el método componentDidMount por useEffect para hacer la llamada al API usando componentes funcionales.
  // Después, hice mi propio hook para hacer la llamada al API
  // El custom hook obtiene el url para mandar el tipo y movimientos del pokemon
  useEffect(() => {
    if (!loading && data) {
      const fetchPokemonDetails = async () => {
        const pokemonDetails = await Promise.all(
          data.results.map(async (poke) => {
            // Esta solicitud es la que regresa el objeto con la informacion entera del pokemon
            const response = await fetch(poke.url);
            if (!response.ok) {
              console.error(`Error al obtener datos de ${poke.name}`);
              return null;
            }
            // Convertimos la respuesta de json a un objeto de javascript
            const pokemonData = await response.json();
            return {
              name: pokemonData.name,
              type: pokemonData.types.map((type) => type.type.name),
              moves: pokemonData.moves.map((move) => move.move.name),
            };
          })
        );
        setPokemon(pokemonDetails.filter((poke) => poke !== null));
      };

      fetchPokemonDetails();
    }
  }, [loading, data]);

  // Cambie el método handleFilterChange para que utilice el hook useCallback
  // para evitar hacer renders innecesarios
  const handleFilterChange = useCallback((filter) => {
    setFilter(filter);
  }, []);

  // Use la función de setFilter para cambiar el estado del filtro
  const handleSortChange = useCallback((sort) => {
    setSort(sort);
  }, []);

  // Cambie el método handleSortChange para que utilice el hook useCallback
  // para evitar hacer renders innecesarios
  const filteredPokemon = useMemo(
    () => filterData(pokemon, filter),
    [pokemon, filter]
  );

  // Use useMemo para evitar hacer renders innecesarios
  // El componente es renderizado unicamente cuando cambia el estado
  // del sort o filtro
  const sortedPokemon = useMemo(
    () => sortData(filteredPokemon, sort),
    [filteredPokemon, sort]
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ocurrió el siguiente error: {error}</div>;
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Filter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <List
        style={{ background: "#f5f5f5", borderRadius: "40px", padding: "20px" }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={(poke) => (
          <List.Item>
            <Link to={`/pokemon/${poke.name}`}>
              <Card
                hoverable
                style={{ borderRadius: "10px", transition: "all 0.3s ease" }}
                cover={
                  <img
                    alt={poke.name}
                    src={
                      "https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"
                    }
                  />
                }
                bodyStyle={{ display: "flex", justifyContent: "center" }}
              >
                <Card.Meta
                  title={poke.name.toUpperCase()}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PokemonList;
