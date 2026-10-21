import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./components/environment/BootSequence";
import TopologicalEnvironment from "./components/environment/TopologicalEnvironment";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  // Allow skipping boot with any key or click
  useEffect(() => {
    if (!isBooting) return;
    const skip = () => setIsBooting(false);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [isBooting]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505] text-[#F5F5F0] select-none font-sans">
      {/* Underlying Topological Environment preloaded and active */}
      <TopologicalEnvironment />

      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              filter: "blur(6px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0 z-50 pointer-events-auto"
            style={{ willChange: "opacity, transform, filter" }}
          >
            <BootSequence onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}