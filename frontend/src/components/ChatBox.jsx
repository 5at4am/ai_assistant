// frontend/src/components/ChatBox.jsx

import React, { useState } from "react";
import useChatWithGroq from "../hooks/useChatWithGroq";

export default function ChatBox({ previousText }) {
  const [userPrompt, setUserPrompt] = useState("");
  const { chatResponse, chatLoading, chatError, sendPromptToGroq } = useChatWithGroq();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    const fullPrompt = `${previousText}\n\nUser: ${userPrompt}`;
    sendPromptToGroq(fullPrompt);
  };

  return (
    <div className="mt-8 p-4 border rounded bg-gray-100">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Ask follow-up..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          disabled={chatLoading}
        >
          Ask
        </button>
      </form>

      {chatLoading && <p className="mt-2 text-sm text-gray-500">Thinking...</p>}
      {chatError && <p className="text-red-500">{chatError}</p>}
      {chatResponse && (
        <div className="mt-4 bg-white p-3 border rounded">
          <strong>AI:</strong> {chatResponse}
        </div>
      )}
    </div>
  );
}
