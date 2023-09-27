export async function fetchData(endpoint) {
  return fetch(`https://pokeapi.co/api/v2${endpoint}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
