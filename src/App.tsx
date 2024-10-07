import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Mascot from "./components/Mascot";
import ActivityFetcher from "./components/ActicityFetcher";

function App() {
  const [selectedType, setSelectedType] = useState<string | null>(null); // Empieza sin ningún tipo seleccionado
  const [activity, setActivity] = useState<string>("");

  // Detecta si está en producción o desarrollo para ajustar la URL
  const apiBaseUrl =
    process.env.NODE_ENV === "production"
      ? "https://bored-api.appbrewery.com" // API en producción
      : "/api"; // Proxy local en desarrollo

  // Función para obtener una nueva actividad aleatoria o filtrada
  const fetchActivity = async () => {
    let url = `${apiBaseUrl}/random`; // URL por defecto para actividad aleatoria

    // Si hay un tipo seleccionado, usamos el endpoint de filtro
    if (selectedType) {
      url = `${apiBaseUrl}/filter?type=${selectedType}`; // Cambiamos la URL al endpoint correcto para filtro
    }

    try {
      console.log(`Fetching activity from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching activity: ${response.status}`);
      }
      const data = await response.json();

      // Si es un array (cuando se usa el filtro), seleccionamos una actividad aleatoria
      const activity = Array.isArray(data)
        ? data[Math.floor(Math.random() * data.length)].activity
        : data.activity; // Si no es array, tomamos directamente la actividad

      setActivity(activity);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      setActivity("Error al obtener la actividad");
    }
  };

  // Hacer el fetch inicial cuando cargue la página
  React.useEffect(() => {
    fetchActivity(); // Hacer fetch al cargar la página
  }, []); // Solo se ejecuta al cargar

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fila 1: Header con el logo */}
      <Header />

      {/* Fila 2: Diseño responsive que cambia a una columna en pantallas pequeñas */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_5px_1fr] gap-0 p-4 h-[75vh]">
        {/* Columna izquierda para el componente Mascot */}
        <div className="bg-white px-2 py-4 h-full flex flex-col">
          <Mascot
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            fetchActivity={fetchActivity} // Pasamos la función fetchActivity
          />
        </div>

        {/* Divisor vertical solo visible en pantallas medianas o más grandes */}
        <div className="hidden md:flex justify-center items-center h-full">
          <div className="h-full border-r-4 border-dotted border-black"></div>
        </div>

        {/* Columna derecha para la información de la actividad */}
        <div className="bg-white px-2 py-4 h-full flex flex-col justify-center">
          <ActivityFetcher activity={activity} />{" "}
          {/* Pasamos la actividad obtenida */}
        </div>
      </div>
    </div>
  );
}

export default App;
