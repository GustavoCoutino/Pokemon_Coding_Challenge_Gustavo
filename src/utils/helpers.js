// Esta función puede organizar pokemones por nombre
// de forma ascendente o descendente
export function sortData(data, sort) {
  // Creamos una copia del arreglo original para no modificar la informacion original
  const sortedData = data.slice();

  // Pasamos una callback function al método sort para decirle como ordenar los pokemones
  sortedData.sort((a, b) => {
    // Pasamos los nombres de los pokemones a minusculas para que no haya problemas con el input del usuario
    const pokeA = a.name.toLowerCase();
    const pokeB = b.name.toLowerCase();

    // Si sort === 'name', ordenes de A-Z, si sort === '-name', ordenes de Z-A
    if (sort === "name") {
      if (pokeA < pokeB) return -1;
      if (pokeB < pokeA) return 1;
    } else if (sort === "-name") {
      if (pokeA > pokeB) return -1;
      if (pokeB > pokeA) return 1;
    }
    return 0;
  });
  return sortedData;
}

export function filterData(data, filter) {
  const lowerCaseFilter = filter.toLowerCase();
  return data.filter((poke) => {
    return (
      poke.name.toLowerCase().includes(lowerCaseFilter) ||
      poke.name.toLowerCase().includes(lowerCaseFilter)
    );
  });
}
