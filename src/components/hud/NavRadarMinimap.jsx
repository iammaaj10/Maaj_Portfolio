import React from "react";
import { mindNodes, mindEdges } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function NavRadarMinimap({
  activeNodeId,
  panOffset,
  zoomScale,
  onCenterNode
}) {
  const radarWidth = 140;
  const radarHeight = 110;
  const mapScale = 0.18; // scale factor for canvas world coordinates

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:flex flex-col items-end pointer-events-auto">
      <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 border-b border-slate-800 pb-1">
          <span className="text-cyan-400 font-bold">RADAR HUD</span>
          <span>ZOOM: {(zoomScale * 100).toFixed(0)}%</span>
        </div>

        <svg
          width={radarWidth}
          height={radarHeight}
          className="bg-slate-900/90 rounded border border-slate-800 relative cursor-pointer"
        >
          {/* Radar Sweep Arc */}
          <circle
            cx={radarWidth / 2}
            cy={radarHeight / 2}
            r={radarHeight * 0.45}
            fill="none"
            stroke="rgba(0, 240, 255, 0.1)"
            strokeWidth="1"
          />
          <line
            x1={radarWidth / 2}
            y1={0}
            x2={radarWidth / 2}
            y2={radarHeight}
            stroke="rgba(0, 240, 255, 0.08)"
          />
          <line
            x1={0}
            y1={radarHeight / 2}
            x2={radarWidth}
            y2={radarHeight / 2}
            stroke="rgba(0, 240, 255, 0.08)"
          />

          {/* Render Edges */}
          {mindEdges.map((edge, idx) => {
            const fromN = mindNodes.find((n) => n.id === edge.from);
            const toN = mindNodes.find((n) => n.id === edge.to);
            if (!fromN || !toN) return null;

            const x1 = radarWidth / 2 + fromN.x * mapScale;
            const y1 = radarHeight / 2 + fromN.y * mapScale;
            const x2 = radarWidth / 2 + toN.x * mapScale;
            const y2 = radarHeight / 2 + toN.y * mapScale;

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            );
          })}

          {/* Render Nodes */}
          {mindNodes.map((node) => {
            const nx = radarWidth / 2 + node.x * mapScale;
            const ny = radarHeight / 2 + node.y * mapScale;
            const isActive = activeNodeId === node.id;

            return (
              <g
                key={node.id}
                onClick={() => {
                  sound.playClickSound();
                  onCenterNode(node.id);
                }}
              >
                <circle
                  cx={nx}
                  cy={ny}
                  r={isActive ? 6 : 4}
                  fill={node.color}
                  className="transition-all hover:scale-150 cursor-pointer"
                />
                {isActive && (
                  <circle
                    cx={nx}
                    cy={ny}
                    r={9}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          {/* Current Viewport Indicator Box */}
          <rect
            x={radarWidth / 2 - panOffset.x * mapScale - 16}
            y={radarHeight / 2 - panOffset.y * mapScale - 12}
            width={32}
            height={24}
            fill="none"
            stroke="rgba(0, 240, 255, 0.6)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>
      </div>
    </div>
  );
}
