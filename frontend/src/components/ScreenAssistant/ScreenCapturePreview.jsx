// frontend/src/components/ScreenAssistant/ScreenCapturePreview.jsx

import React, { useState } from "react";

export default function ScreenCapturePreview({ screenshots }) {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  const openModal = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedImage(null); 
  };

  if (!screenshots.length) return null;

  return (
    <div className="mt-6 space-y-8">
      <h2 className="text-lg font-semibold mb-2">🖼️ Captured Screens</h2>

      {/* Grid Layout for Screenshots */}
      <div className="grid grid-cols-3 gap-4">
        {screenshots.map((src, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 shadow bg-white space-y-3 cursor-pointer"
            onClick={() => openModal(src)} 
          >
            <img
              src={src}
              alt={`screenshot-${i}`}
              className="rounded border shadow w-full"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={closeModal} 
        >
          <div
            className="bg-white p-6 rounded-lg max-w-5xl w-4/5 h-4/5 mx-auto transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              className="absolute top-0 right-0 p-2 text-black font-bold"
              onClick={closeModal}
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Popup Screenshot"
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
