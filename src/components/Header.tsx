import React from "react";
import booredLogo from "../assets/boored_logo.png"; // Asegúrate de que la ruta es correcta
const Header: React.FC = () => {
  return (
    <header className="w-full bg-white p-4">
      <div className="flex items-center justify-start">
        {/* Asegúrate de eliminar float y ml-0 para que Tailwind gestione correctamente la alineación */}
        <img src={booredLogo} alt="Boored Logo" className="h-12" />
      </div>
    </header>
  );
};
export default Header;
