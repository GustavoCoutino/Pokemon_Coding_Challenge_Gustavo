import { useState, useEffect, useCallback, useMemo } from "react";
import { sortData, filterData } from "../utils/helpers";
import Filter from "./Filter";
import { List, Card } from "antd";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

// Realice el cambio de una arquitectura de clase a una arquitectura de componentes
// funcionales mediante el uso de hooks como useState, useEffect, useCallback y useMemo.

// Borre el constructor y use estados para manejar la data de los pokemones, el filtro, y el sort
function PokemonList(props) {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");

  // Primero, cambie el método componentDidMount por useEffect para hacer la llamada al API usando componentes funcionales.
  // Después, hice mi propio hook para hacer la llamada al API
  const [url] = useState("https://pokeapi.co/api/v2/pokemon");
  const res = useFetch(url);
  const { loading, data, error } = res;

  useEffect(() => {
    if (!loading && data) {
      setPokemon(data.results);
    }
  }, [loading, data]);

  // Cambie el método handleFilterChange para que utilice el hook useCallback
  // para evitar hacer renders innecesarios
  const handleFilterChange = useCallback((filter) => {
    // Use la función de setFilter para cambiar el estado del filtro
    setFilter(filter);
  }, []);

  // Cambie el método handleSortChange para que utilice el hook useCallback
  // para evitar hacer renders innecesarios
  const handleSortChange = useCallback((sort) => {
    // Use la función de setSort para cambiar el estado del sort
    setSort(sort);
  }, []);

  // Use useMemo para evitar hacer renders innecesarios
  // El componente es renderizado unicamente cuando cambia el estado
  // del sort o filtro
  const filteredPokemon = useMemo(
    () => filterData(pokemon, filter),
    [pokemon, filter]
  );
  const sortedPokemon = useMemo(
    () => sortData(filteredPokemon, sort),
    [filteredPokemon, sort]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>The following error ocurred: {error}</div>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Filter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <List
        style={{ background: "#f5f5f5", borderRadius: "10px", padding: "20px" }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={(poke) => (
          <List.Item>
            {/* La ruta para ver cada pokemon era incorrecto, la corregi usando el atributo de name del objeto poke */}
            {/* que es regresado despues de hacer la llamada al API */}
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