import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/custom-ui/AnimatedBackground";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Plant Disease Recognition",
  description: "Identify plant diseases from images using machine learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        suppressHydrationWarning
        className="text-neutral-50 font-sans antialiased min-h-screen relative overflow-x-hidden"
      >
        {/* Animated Background */}
        <AnimatedBackground />

        {/* App Content */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}