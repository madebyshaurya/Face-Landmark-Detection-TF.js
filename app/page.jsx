
"use client";
import Webcam from "react-webcam";
import { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "@/components/utilites";

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize the TensorFlow.js backend
  const initializeBackend = async () => {
    await tf.setBackend("webgl"); // You can also choose "wasm" or "cpu"
    await tf.ready(); // Ensure the backend is fully ready
  };

  // Load Facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load();
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // Detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  useEffect(() => {
    initializeBackend().then(runFacemesh); // Initialize backend before running Facemesh
  });

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
