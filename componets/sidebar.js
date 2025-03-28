"use client";
import React, { useState } from "react";
import { 
  MdSettings, 
  MdLightbulb,
  MdCode,
  MdDescription,
  MdTranslate,
  MdBarChart,
  MdPalette,
  MdHistory
} from "react-icons/md";

export default function Sidebar() {
  const [temperature, setTemperature] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState("Lev1-d");

  return (
    <div className="w-64 h-full bg-gray-900 text-gray-200 flex flex-col border-r border-gray-700">
      {/* Encabezado */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MdPalette size={20} className="text-blue-400" />
          Herramientas IA
        </h2>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Sección de ejemplos rápidos */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
            <MdLightbulb size={14} />
            Ejemplos Rápidos
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              "¿Qué pasa si me voy en rojo?"
            </button>
            <button className="w-full text-left text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              "¿Puedo girar a la derecha con semáforo en rojo?"
            </button>
            <button className="w-full text-left text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              "¿Qué hacer si me multan sin razón?"
            </button>
          </div>
        </div>

        {/* Sección de configuración */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
            <MdSettings size={14} />
            Configuración
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Modelo de IA</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Lev-1d">Lev1-d</option>
                <option value="Wil-b3">Wilb-3</option>
                <option value="Gr3-y">Gr3-y</option>
                <option value="L1sb-3">L1sb-3</option>
                <option value="41b3-rt">41b3-rt</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Poder de procesamiento</span>
                <span className="font-mono">{temperature.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Bajo</span>
                <span>Alto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de acciones */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
            <MdCode size={14} />
            Acciones
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors justify-center">
              <MdDescription size={16} />
              Exportar
            </button>
            <button className="flex items-center gap-2 text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors justify-center">
              <MdTranslate size={16} />
              Traducir
            </button>
            <button className="flex items-center gap-2 text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors justify-center">
              <MdHistory size={16} />
              Historial
            </button>
            <button className="flex items-center gap-2 text-sm p-3 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors justify-center">
              <MdSettings size={16} />
              Ajustes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src="https://www.ucne.edu/p/images/logoUCNE.png"
            className="size-10 object-contain"
            alt="Logo UCNE"
          />
          <div>
            <p className="text-sm font-medium">UCNE</p>
            <p className="text-xs text-gray-400">Inteligencia Artificial</p>
          </div>
        </div>
      </div>
    </div>
  );
}