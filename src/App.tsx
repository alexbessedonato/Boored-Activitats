import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Mascot from "./components/Mascot";
import ActivityFetcher from "./components/ActicityFetcher";

function App() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activity, setActivity] = useState<string>("");

  // Función para obtener una nueva actividad aleatoria o filtrada
  const fetchActivity = async () => {
    let url = "/api/random"; // Proxy manejará esta petición

    if (selectedType) {
      url = `/api/filter?type=${selectedType}`; // Si hay un tipo seleccionado
    }

    try {
      console.log(`Fetching activity from ${url}...`);
      const response = await fetch(url); // Esta solicitud será redirigida por el proxy
      if (!response.ok) {
        throw new Error(`Error fetching activity: ${response.status}`);
      }

      const data = await response.json();
      console.log("Actividad recibida:", data);

      if (data && data.activity) {
        setActivity(data.activity); // Asegúrate de que la respuesta tenga un campo `activity`
      } else if (Array.isArray(data) && data.length > 0) {
        // Si la respuesta es un array (en caso de filtro), seleccionamos una actividad aleatoria
        const randomIndex = Math.floor(Math.random() * data.length);
        setActivity(data[randomIndex].activity);
      } else {
        setActivity("No se encontró ninguna actividad.");
      }
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      setActivity("Error al obtener la actividad");
    }
  };

  React.useEffect(() => {
    fetchActivity();
  }, []); // Solo se ejecuta al cargar

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_5px_1fr] gap-0 p-4 h-[75vh]">
        <div className="bg-white px-2 py-4 h-full flex flex-col">
          <Mascot
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            fetchActivity={fetchActivity}
          />
        </div>

        <div className="hidden md:flex justify-center items-center h-full">
          <div className="h-full border-r-4 border-dotted border-black"></div>
        </div>

        <div className="bg-white px-2 py-4 h-full flex flex-col justify-center">
          <ActivityFetcher activity={activity} />
        </div>
      </div>
    </div>
  );
}

export default App;
