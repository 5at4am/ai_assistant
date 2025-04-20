// frontend/src/components/AiResponse.jsx

import React from "react";
import FollowUpChat from "./FollowUpChat";

export default function AiResponse({ result }) {
  if (!result) return null;

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">🤖 AI Analysis Summary</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{result.groq_response}</p>

      <FollowUpChat initialContext={result.groq_response} />
    </div>
  );
}
