"use client";

import Link from "next/link";
import { CheckCircle2, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import { AnimatedGlowTextBadge } from "@/components/custom-ui/animated-glow-text-badge";
import { ModeCard } from "@/components/custom-ui/mode-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-white/20 overflow-x-hidden relative">
      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-neutral-400 text-xs font-mono tracking-widest mb-6 backdrop-blur">
              <AnimatedGlowTextBadge className="flex items-center space-x-2">
                <span>AI Powered Diagnosis</span>
              </AnimatedGlowTextBadge>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">
              {/* Optional: If you still want the drop shadow on "Plant Disease", put it here */}
              <span className="drop-shadow-2xl">Plant Disease</span>
              <br />
              <>
                {/* Rename to textGlowCycle */}
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
                  className="inline-block py-2"
                  style={{
                    /* Use the new name here */
                    animation: "textGlowCycle 20s ease-in-out infinite",
                  }}
                >
                  Recognition System
                </span>
              </>
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg mb-10">
              Upload a plant leaf image and our AI model will analyze it to
              detect diseases instantly. Protect your crops and ensure healthier
              harvests with intelligent diagnosis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/recognition">
                <>
                  {/* Rename to buttonGlowCycle */}
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

                  <Button className="group text-lg glow-cycle-btn rounded-full border px-7 py-[16px] transition-all backdrop-blur-md hover:scale-[1.03]">
                    Start Diagnosis
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="pb-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                Three simple steps to identify and treat plant diseases using
                AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ModeCard
                title="Upload Image"
                description="Upload a clear image of a plant leaf with suspected disease."
                icon={CheckCircle2}
                themeColor="cyan"
                buttonText="Step 1"
              />

              <ModeCard
                title="AI Analysis"
                description="Our deep learning model analyzes the image and detects disease patterns."
                icon={Zap}
                themeColor="purple"
                buttonText="Step 2"
              />

              <ModeCard
                title="View Results"
                description="Instantly see the detected disease and take necessary actions."
                icon={ShieldCheck}
                themeColor="green"
                buttonText="Step 3"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
