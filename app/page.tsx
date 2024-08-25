"use client";
import Webcam from "react-webcam";
import { useRef } from "react";

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <main className="flex justify-center items-center h-[100vh]">
      <Webcam
        ref={webcamRef}
        className="absolute left-0 right-0 mx-auto text-center z-[9] w-[640px] h-[480px] rounded-lg shadow-lg"
      />

      <canvas
        ref={canvasRef}
        className="absolute left-0 right-0 mx-auto text-center z-[9] w-[640px] h-[480px] rounded-lg shadow-lg"
      />
    </main>
  );
}
