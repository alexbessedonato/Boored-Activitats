import React from "react";

interface ToggleButtonsProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const types = [
    "social",
    "education",
    "charity",
    "cooking",
    "relaxation",
    "busywork",
  ];

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Fila superior con 4 botones */}
      <div className="flex space-x-2">
        {types.slice(0, 4).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 text-center rounded-full ${
              selectedType === type
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => onTypeChange(selectedType === type ? null : type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Fila inferior con 2 botones */}
      <div className="flex space-x-2">
        {types.slice(4).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 text-center rounded-full ${
              selectedType === type
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => onTypeChange(selectedType === type ? null : type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButtons;
