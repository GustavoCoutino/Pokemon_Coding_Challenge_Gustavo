import { useEffect, useState } from "react";

// Este es la implementación del custom hook para hacer las llamadas al API
// Cambie el parametro de url por endpoint para no repetir el url base y tener
// código más lógico
const useFetch = (endpoint) => {
  const [result, setResult] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setResult({ loading: true, data: null, error: null });

      try {
        const resp = await fetch(`https://pokeapi.co/api/v2${endpoint}`);
        // Esta condicion es para lidiar con casos donde haya una falla de API por un mal request
        if (!resp.ok) {
          console.error(`Request Error! Status: ${resp.status}`);
        }
        const data = await resp.json();
        setResult({ loading: false, data, error: null });
        // Este catch sirve para errores inesperados durante la llamada de la API
      } catch (err) {
        setResult({ loading: false, data: null, error: err.message });
        console.error("API error:", err);
      }
    };

    fetchData();
  }, [endpoint]);

  return result;
};

export default useFetch;
