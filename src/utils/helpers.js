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

// Esta función puede filtrar pokemones por nombre, tipo, o movimientos que tiene
export function filterData(data, filter) {
  // Si el filtro es vacio, regresamos el arreglo original
  if (!filter) return data;
  const lowerCaseFilter = filter.toLowerCase();
  // Si el filtro tiene un query de type:, filtramos por tipo
  if (lowerCaseFilter.includes("type: ")) {
    // Separamos la palabra type del query del usuario con los tipos
    const type = lowerCaseFilter.split("type: ")[1];
    // Iteramos sobre el arreglo de tipos para encontrar todos los pokemones
    // con el tipo requerido por el usuario
    return data.filter((poke) => {
      return poke.type.includes(type);
    });
  } else if (lowerCaseFilter.includes("move: ")) {
    // Separamos la palabra move del query del usuario con los movimientos
    const move = lowerCaseFilter.split("move: ")[1];
    // Iteramos sobre el arreglo de movimientos para encontrar todos los pokemones
    // con el movimiento requerido por el usuario
    return data.filter((poke) => {
      return poke.moves.includes(move);
    });
  }

  // Si ninguna de las primeras condiciones es verdadera, filtramos por nombre
  return data.filter((poke) => {
    return poke.name.toLowerCase().startsWith(lowerCaseFilter);
  });
}
