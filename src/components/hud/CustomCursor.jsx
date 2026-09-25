import React, { useEffect, useState } from "react";

export default function CustomCursor({ isHoveredNode }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  // Snappy lerp for trailing cursor ring
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.35,
        y: prev.y + (pos.y - prev.y) * 0.35
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block mix-blend-difference">
      {/* Target Ring */}
      <div
        className={`absolute rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHoveredNode
            ? "w-16 h-16 border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            : isClicking
            ? "w-8 h-8 border-cyan-400 scale-90"
            : "w-10 h-10 border-cyan-500/50"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHoveredNode ? 32 : (isClicking ? 16 : 20))}px, ${
            trailingPos.y - (isHoveredNode ? 32 : (isClicking ? 16 : 20))
          }px, 0)`
        }}
      >
        {/* Crosshairs */}
        <div className="absolute w-[140%] h-[1px] bg-cyan-400/30" />
        <div className="absolute h-[140%] w-[1px] bg-cyan-400/30" />

        {isHoveredNode && (
          <div className="absolute top-full mt-2 text-[8px] font-mono text-emerald-400 font-bold tracking-widest uppercase text-center w-32 -ml-8">
            [ TARGET_LOCKED ]
          </div>
        )}
      </div>

      {/* Center Precision Dot */}
      <div
        className={`absolute w-1.5 h-1.5 rounded-full transition-transform duration-75 ${
          isClicking ? "bg-white scale-150" : isHoveredNode ? "bg-emerald-400" : "bg-cyan-400"
        }`}
        style={{ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)` }}
      />
      
      {/* HUD Coords */}
      <div
        className="absolute text-[8px] font-mono text-cyan-500/80 tracking-widest ml-4 mt-4 transition-opacity duration-300"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, opacity: isHoveredNode ? 0 : 1 }}
      >
        X:{Math.round(pos.x)} Y:{Math.round(pos.y)}
      </div>
    </div>
  );
}
