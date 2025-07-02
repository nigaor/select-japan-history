"use client";

import React from "react";

interface EraListProps {
  eras: string[];
  selectedEra: string;
  onSelectEra: (era: string) => void;
}

const EraList: React.FC<EraListProps> = ({
  eras,
  selectedEra,
  onSelectEra,
}) => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-sm border">
      <h2 className="text-lg font-bold text-center mb-4 border-b pb-2">
        時代一覧
      </h2>
      <ul className="space-y-2">
        {eras.map((era) => (
          <li key={era}>
            <button
              onClick={() => onSelectEra(era)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                selectedEra === era
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              {era}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EraList;