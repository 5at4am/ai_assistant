import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; //

export default function FollowUpChat({ initialContext }) {
  const [messages, setMessages] = useState([
    { role: "system", content: `Context: ${initialContext}` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const backendBase = "https://ai-assistant-2y5y.onrender.com";
  const chatEndpoint = `${backendBase}/chat`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${initialContext}\n\nFollow-up: ${input}`,
        }),
      });
      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
      <h3 className="text-md font-semibold mb-2">💬 Follow-up Questions</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {messages.slice(1).map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-1 rounded-lg ${
                msg.role === "user" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {msg.role === "assistant" ? (
                // Render the assistant's response as markdown
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          className="flex-1 border px-2 py-1 rounded-l"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
