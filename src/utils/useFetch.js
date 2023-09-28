import { useEffect, useState } from "react";

// Este es la implementación del custom hook para hacer las llamadas al API
const useFetch = (url) => {
  const [result, setResult] = useState({
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    getData(url);
  }, [url]);

  async function getData(url) {
    try {
      setResult({ loading: true, data: null });
      const resp = await fetch(url);
      // Esta condicion es para lidiar con casos donde haya una falla de API por un mal request
      if (!resp.ok) {
        console.error(`Error en la solicitud! Estado: ${resp.status}`);
      }
      const data = await resp.json();
      setResult({ loading: false, data });
    } catch (e) {
      // Este catch sirve para errores inesperados durante la llamada a la API
      setResult({ loading: false, data: null, error: e.message });
      console.error("Error en la API:", e);
    }
  }

  return result;
};

export default useFetch;
