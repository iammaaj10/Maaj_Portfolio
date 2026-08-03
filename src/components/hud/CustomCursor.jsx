import React, { useEffect, useState } from "react";

export default function CustomCursor({ isHoveredNode }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

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

  // Smooth lerp for trailing cursor ring
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25,
        y: prev.y + (pos.y - prev.y) * 0.25
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Sci-Fi Target Ring */}
      <div
        className={`absolute rounded-full border transition-all duration-150 ease-out flex items-center justify-center ${
          isHoveredNode
            ? "w-14 h-14 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            : isClicking
            ? "w-8 h-8 border-violet-400/90 scale-90"
            : "w-9 h-9 border-cyan-500/40"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHoveredNode ? 28 : 18)}px, ${
            trailingPos.y - (isHoveredNode ? 28 : 18)
          }px, 0)`
        }}
      >
        {isHoveredNode && (
          <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
        )}
      </div>

      {/* Center Laser Dot */}
      <div
        className={`absolute w-2 h-2 rounded-full transition-transform duration-75 ${
          isClicking ? "bg-pink-400 scale-125" : "bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
        }`}
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`
        }}
      />
    </div>
  );
}
