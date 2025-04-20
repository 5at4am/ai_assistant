// frontend/src/hooks/useScreenCapturer.js
import { useState, useRef } from "react";

export default function useScreenCapturer() {
  const [screenshots, setScreenshots] = useState([]);
  const [captureStatus, setCaptureStatus] = useState(""); 
  const videoRef = useRef(null);

  const startCapture = async () => {
    setCaptureStatus("Requesting screen share...");
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCaptureStatus("Screen share started. Capturing screenshots...");

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const frames = [];

      let frameCount = 0;
      const captureInterval = setInterval(() => {
        if (frameCount >= 6) {
          clearInterval(captureInterval);
          stream.getTracks().forEach((track) => track.stop());
          setScreenshots(frames);
          setCaptureStatus("Screenshots captured.");
          return;
        }

        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        frames.push(imageData);
        frameCount++;
      }, 5000);
    } catch (err) {
      console.error("Error starting screen capture", err);
      setCaptureStatus("Error capturing screen.");
    }
  };

  return { videoRef, screenshots, startCapture, captureStatus };
}
