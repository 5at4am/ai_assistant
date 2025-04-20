// frontend/src/components/ControlPanel.jsx

import React from "react";

export default function ControlPanel({ onStart, onAnalyze, disabledAnalyze, loading }) {
  return (
    <div className="flex gap-6 mt-6">
      {/* Start Capturing Button */}
      <button
        onClick={onStart}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
      >
        {loading ? (
          <span className="animate-pulse">Capturing...</span>
        ) : (
          "Start Capturing"
        )}
      </button>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={disabledAnalyze}
        className={`w-full py-3 px-6 ${
          disabledAnalyze ? "bg-gray-400" : "bg-gradient-to-r from-green-500 to-yellow-500"
        } text-white rounded-xl font-semibold shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 hover:shadow-xl`}
      >
        {loading ? (
          <span className="animate-pulse">Analyzing...</span>
        ) : (
          "Analyze"
        )}
      </button>
    </div>
  );
}
