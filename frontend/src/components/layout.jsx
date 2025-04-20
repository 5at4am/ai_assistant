// frontend/src/components/layout.jsx
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold">AI Screen Assistant</h1>
      </header>
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}