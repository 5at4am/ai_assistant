// Frontend/src/components/ScreenAssistant/ScreenAssistant.jsx

import React from "react";
import useScreenCapturer from "../../hooks/useScreenCapturer";
import useAnalyzeScreenshots from "../../hooks/useAnalyzeScreenshots";

import ControlPanel from "../ControlPanel";
import ScreenCapturePreview from "./ScreenCapturePreview";
import AiResponse from "../AiResponse";

export default function ScreenAssistant() {
  const { startCapture, screenshots, captureStatus, videoRef } = useScreenCapturer();
  const { analyze, result, loading, error, analyzeStatus } = useAnalyzeScreenshots();

  const handleStart = async () => {
    await startCapture();
  };

  const handleAnalyze = () => {
    if (screenshots.length > 0) {
      analyze(screenshots);
    }
  };

  return (
    <div className="p-6 space-y-6">

<h1 className="text-5xl font-bold text-gray-800 text-center mb-6">
  🧠 AI Screen Assistant
</h1>

      {/* Instructions Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-xl shadow-lg text-white">
        <h2 className="text-xl font-semibold">How to use:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Click "Start Capturing" and select what you want to capture on the screen.</li>
          <li>Once you've captured your screen, Click "Analyze" to get the AI's response.</li>
          <li>Ask follow-up questions to dive deeper into the analysis or get more details.</li>
        </ul>
      </div>

      {/* Controls */}
      <ControlPanel
        onStart={handleStart}
        onAnalyze={handleAnalyze}
        disabledAnalyze={screenshots.length === 0 || loading}
        loading={loading}
      />

      {/* AI result */}
      <AiResponse result={result} />

      {/* Screen recording (invisible) */}
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

      {/* Screenshot previews */}
      <ScreenCapturePreview screenshots={screenshots} />
    </div>
  );
}
