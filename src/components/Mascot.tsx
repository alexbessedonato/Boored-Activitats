import React from "react";
import mascotImage from "../assets/boored_mascot.png"; // Asegúrate de que la ruta de la imagen es correcta
import ToggleButtons from "./ToggleButtons"; // Importa el componente de botones

interface MascotProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  fetchActivity: () => void; // Añadimos la función para obtener otra actividad
}

const Mascot: React.FC<MascotProps> = ({
  selectedType,
  onTypeChange,
  fetchActivity,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Colocar los botones de toggle encima de la imagen */}
      <ToggleButtons selectedType={selectedType} onTypeChange={onTypeChange} />

      {/* Imagen de la mascota */}
      <img
        src={mascotImage}
        alt="Mascot"
        className="max-h-80 md:max-h-96 w-auto object-contain" // Ajuste para evitar que la imagen se "apriete"
      />

      {/* Texto estilizado con dos líneas y nueva fuente */}
      <div className="text-center text-black font-bold text-3xl leading-tight font-poppins mb-6">
        <h2>TROBA ALGUNA</h2>
        <h2>COSA A FER</h2>
      </div>

      {/* Botón para obtener otra actividad */}
      <button
        onClick={fetchActivity}
        className="mt-8 p-3 px-10 bg-black text-white text-lg rounded-full hover:bg-gray-800"
      >
        Generar
      </button>
    </div>
  );
};

export default Mascot;
