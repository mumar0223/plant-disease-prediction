"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Recognition() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "analyzing" | "success" | "error"
  >("idle");
  const [prediction, setPrediction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setStatus("idle");
      setPrediction(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      const url = URL.createObjectURL(droppedFile);
      setPreviewUrl(url);
      setStatus("idle");
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;

    setStatus("analyzing");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();

      const result = data.prediction;

      setPrediction(result.replace(/___/g, " - ").replace(/_/g, " "));

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-32 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            <>
              <style>{`
@keyframes textGlowCycle {
  0% {
    color:#60a5fa;
    text-shadow:0 0 6px rgba(96,165,250,0.4),0 0 16px rgba(96,165,250,0.3),0 0 32px rgba(96,165,250,0.2);
  }
  25% {
    color:#22d3ee;
    text-shadow:0 0 6px rgba(34,211,238,0.4),0 0 16px rgba(34,211,238,0.3),0 0 32px rgba(34,211,238,0.2);
  }
  50% {
    color:#2dd4bf;
    text-shadow:0 0 6px rgba(45,212,191,0.4),0 0 16px rgba(45,212,191,0.3),0 0 32px rgba(45,212,191,0.2);
  }
  75% {
    color:#c084fc;
    text-shadow:0 0 6px rgba(192,132,252,0.4),0 0 16px rgba(192,132,252,0.3),0 0 32px rgba(192,132,252,0.2);
  }
  100% {
    color:#60a5fa;
    text-shadow:0 0 6px rgba(96,165,250,0.4),0 0 16px rgba(96,165,250,0.3),0 0 32px rgba(96,165,250,0.2);
  }
}
`}</style>
              <span
                className="inline-block leading-none"
                style={{
                  animation: "textGlowCycle 20s ease-in-out infinite",
                }}
              >
                Recognition
              </span>
            </>
          </h1>
          <p className="text-neutral-400 text-lg">
            Upload a clear image of a plant leaf for instant analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-neutral-900/60 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-500/10 border border-neutral-800 p-6 md:p-8 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                1
              </span>
              Upload Image
            </h2>

            <div
              className={`relative z-10 flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 ${
                previewUrl
                  ? "border-blue-500/50 bg-blue-500/5"
                  : "border-neutral-700 hover:border-blue-500/50 hover:bg-white/5 cursor-pointer"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full aspect-square max-h-64 rounded-xl overflow-hidden shadow-lg shadow-black/50 border border-neutral-800">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-neutral-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-neutral-700 group-hover:scale-110 transition-transform duration-500">
                    <UploadCloud className="h-10 w-10 text-blue-400" />
                  </div>
                  <p className="font-medium text-white mb-2 text-lg">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-neutral-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>

            {previewUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreviewUrl(null);
                  setStatus("idle");
                  setPrediction(null);
                }}
                className="relative z-10 mt-6 text-sm font-medium text-neutral-400 hover:text-red-400 transition-colors text-center"
              >
                Clear image
              </button>
            )}
          </div>

          {/* Analysis Section */}
          <div className="bg-neutral-900/60 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/10 border border-neutral-800 p-6 md:p-8 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                2
              </span>
              Analysis
            </h2>

            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {!previewUrl ? (
                <div className="text-center text-neutral-600">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Upload an image to begin analysis</p>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <>
                    <style>{`
@keyframes buttonGlowCycle {
  0% {
    color:#60a5fa;
    border-color:rgba(96,165,250,0.4);
    background:rgba(96,165,250,0.08);
    box-shadow:0 0 12px rgba(96,165,250,0.25);
  }
  25% {
    color:#22d3ee;
    border-color:rgba(34,211,238,0.4);
    background:rgba(34,211,238,0.08);
    box-shadow:0 0 12px rgba(34,211,238,0.25);
  }
  50% {
    color:#2dd4bf;
    border-color:rgba(45,212,191,0.4);
    background:rgba(45,212,191,0.08);
    box-shadow:0 0 12px rgba(45,212,191,0.25);
  }
  75% {
    color:#c084fc;
    border-color:rgba(192,132,252,0.4);
    background:rgba(192,132,252,0.08);
    box-shadow:0 0 12px rgba(192,132,252,0.25);
  }
  100% {
    color:#60a5fa;
    border-color:rgba(96,165,250,0.4);
    background:rgba(96,165,250,0.08);
    box-shadow:0 0 12px rgba(96,165,250,0.25);
  }
}

.glow-cycle-btn {
  /* Use the new name here */
  animation: buttonGlowCycle 20s ease-in-out infinite;
  text-shadow:
    0 0 6px currentColor,
    0 0 16px rgba(255,255,255,0.1);
}
`}</style>

                    <Button
                      onClick={handlePredict}
                      disabled={status === "analyzing"}
                      className="glow-cycle-btn cursor-pointer rounded-full border px-6 py-3 transition-all backdrop-blur-md hover:scale-[1.03]"
                    >
                      {status === "analyzing"
                        ? "Analyzing..."
                        : "Diagnose Plant"}

                      <Loader2
                        className={`h-5 w-5 ml-2 animate-spin ${status === "analyzing" ? "inline-block" : "hidden"}`}
                      />
                    </Button>
                  </>

                  <AnimatePresence mode="wait">
                    {status === "success" && prediction && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full mt-8 p-6 rounded-2xl bg-neutral-800/50 border border-emerald-500/30 text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] border border-emerald-500/30">
                          <CheckCircle className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">
                          Prediction Result
                        </h3>
                        <p className="text-2xl font-black text-white drop-shadow-md">
                          {prediction}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
