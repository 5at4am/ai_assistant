// frontend/src/components/ControlPanel.jsx
import React from "react";

export default function ControlPanel({ onStart, onAnalyze, disabledAnalyze, loading }) {
  return (
    <div className="flex gap-4 mb-6">
      {/* <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
      >
        🎥 Start Capture
      </button> */}
      <button
        onClick={onAnalyze}
        disabled={disabledAnalyze}
        className={`px-6 py-2 rounded shadow text-white ${
          disabledAnalyze || loading
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        📊 Analyze
      </button>
    </div>
  );
}
