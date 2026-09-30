import React, { useState, useEffect, useCallback } from "react";
import BootSequence from "./components/environment/BootSequence";
import TopologicalEnvironment from "./components/environment/TopologicalEnvironment";

export default function App() {
  const [systemState, setSystemState] = useState("BOOTING"); // BOOTING, ACTIVE

  const handleBootComplete = useCallback(() => {
    setSystemState("ACTIVE");
  }, []);

  // Allow skipping boot with any key or click
  useEffect(() => {
    if (systemState !== "BOOTING") return;
    const skip = () => setSystemState("ACTIVE");
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [systemState]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505] text-[#F5F5F0] select-none">
      {systemState === "BOOTING" && (
        <BootSequence onComplete={handleBootComplete} />
      )}
      
      {systemState === "ACTIVE" && (
        <TopologicalEnvironment />
      )}
    </main>
  );
}