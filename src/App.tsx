import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Mascot from "./components/Mascot";
import ActivityFetcher from "./components/ActicityFetcher";

function App() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activity, setActivity] = useState<string>("");

  // Detecta si está en producción o desarrollo para ajustar la URL
  const apiBaseUrl =
    process.env.NODE_ENV === "production"
      ? "" // En producción, Vercel manejará la ruta de /api
      : "http://localhost:3000/api"; // En desarrollo, llamamos directamente a nuestro servidor local (ajusta el puerto si es diferente)

  // Función para obtener una nueva actividad aleatoria o filtrada
  const fetchActivity = async () => {
    let url = `${apiBaseUrl}/fetch-activity`; // Usamos nuestra función API

    if (selectedType) {
      url += `?type=${selectedType}`;
    }

    try {
      console.log(`Fetching activity from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching activity: ${response.status}`);
      }
      const data = await response.json();

      const activity = Array.isArray(data)
        ? data[Math.floor(Math.random() * data.length)].activity
        : data.activity;

      setActivity(activity);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      setActivity("Error al obtener la actividad");
    }
  };

  React.useEffect(() => {
    fetchActivity();
  }, []);

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
