import React, { useEffect, useRef, useCallback } from "react";
import { mindNodes, mindEdges } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function NeuralCanvas({
  activeNodeId,
  onSelectNode,
  hoveredNodeId,
  setHoveredNodeId,
  panOffset,
  setPanOffset,
  zoomScale,
  setZoomScale,
  isOverclocked
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartDistRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, worldX: 0, worldY: 0 });

  // Floating nodes physics state
  const nodesStateRef = useRef(
    mindNodes.map((n) => ({
      ...n,
      currentX: n.x,
      currentY: n.y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulsePhase: Math.random() * Math.PI * 2
    }))
  );

  // Flowing particle data packets on edges
  const particlesRef = useRef(
    mindEdges.flatMap((edge) => {
      return Array.from({ length: 4 }).map(() => ({
        edgeFrom: edge.from,
        edgeTo: edge.to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004
      }));
    })
  );

  // Background star/synapse particle field
  const bgParticlesRef = useRef(
    Array.from({ length: 70 }).map(() => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1000,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }))
  );

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Non-passive wheel event listener to prevent browser console warning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheelNative = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoomScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 2.2));
    };

    canvas.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheelNative);
  }, [setZoomScale]);

  // Convert Screen coordinates to Canvas World Coordinates
  const screenToWorld = useCallback(
    (screenX, screenY) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = (screenX - rect.left - centerX - panOffset.x) / zoomScale;
      const y = (screenY - rect.top - centerY - panOffset.y) / zoomScale;
      return { x, y };
    },
    [panOffset, zoomScale]
  );

  // Mouse Move
  const handleMouseMove = (e) => {
    const world = screenToWorld(e.clientX, e.clientY);
    mousePosRef.current = { x: e.clientX, y: e.clientY, worldX: world.x, worldY: world.y };

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Check node hit detection for hover
    let hovered = null;
    nodesStateRef.current.forEach((node) => {
      const dist = Math.hypot(world.x - node.currentX, world.y - node.currentY);
      if (dist <= node.radius + 10) {
        hovered = node.id;
      }
    });

    if (hovered !== hoveredNodeId) {
      setHoveredNodeId(hovered);
      if (hovered) sound.playHoverSound();
    }
  };

  // Drag Start / End
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  // Node Click
  const handleClick = (e) => {
    const world = screenToWorld(e.clientX, e.clientY);
    let clickedId = null;

    nodesStateRef.current.forEach((node) => {
      const dist = Math.hypot(world.x - node.currentX, world.y - node.currentY);
      if (dist <= node.radius + 15) {
        clickedId = node.id;
      }
    });

    if (clickedId) {
      sound.playClickSound();
      onSelectNode(clickedId);
    }
  };

  // Mobile Touch Controls (Pan & Tap)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDistRef.current;
      setZoomScale((prev) => Math.min(Math.max(prev * (factor > 1 ? 1.03 : 0.97), 0.5), 2.2));
      touchStartDistRef.current = dist;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1 && isDraggingRef.current) {
      const touch = e.changedTouches[0];
      const world = screenToWorld(touch.clientX, touch.clientY);
      let clickedId = null;

      nodesStateRef.current.forEach((node) => {
        const dist = Math.hypot(world.x - node.currentX, world.y - node.currentY);
        if (dist <= node.radius + 20) {
          clickedId = node.id;
        }
      });

      if (clickedId) {
        sound.playClickSound();
        onSelectNode(clickedId);
      }
    }
    isDraggingRef.current = false;
    touchStartDistRef.current = null;
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationTime = 0;

    const render = () => {
      animationTime += 0.016;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear Canvas
      ctx.fillStyle = isOverclocked ? "#050010" : "#030712";
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid overlay
      const gridSpacing = 40 * zoomScale;
      const gridOffsetX = (width / 2 + panOffset.x) % gridSpacing;
      const gridOffsetY = (height / 2 + panOffset.y) % gridSpacing;

      ctx.strokeStyle = isOverclocked
        ? "rgba(236, 72, 153, 0.08)"
        : "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let x = gridOffsetX; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridOffsetY; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Move view origin to center + panOffset
      ctx.translate(width / 2 + panOffset.x, height / 2 + panOffset.y);
      ctx.scale(zoomScale, zoomScale);

      // 1. Draw Background Floating Star Particles
      bgParticlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > 800) p.x = -800;
        if (p.x < -800) p.x = 800;
        if (p.y > 500) p.y = -500;
        if (p.y < -500) p.y = 500;

        ctx.fillStyle = isOverclocked ? "rgba(236, 72, 153, 0.4)" : "rgba(0, 240, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Update Node Positions & Magnetic Repulsion
      const mouseWorld = mousePosRef.current;
      nodesStateRef.current.forEach((node) => {
        node.currentX += Math.sin(animationTime * node.pulseRate + node.x) * 0.15;
        node.currentY += Math.cos(animationTime * node.pulseRate + node.y) * 0.15;

        const dx = mouseWorld.worldX - node.currentX;
        const dy = mouseWorld.worldY - node.currentY;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          node.currentX -= (dx / dist) * force * 1.5;
          node.currentY -= (dy / dist) * force * 1.5;
        }

        node.currentX += (node.x - node.currentX) * 0.03;
        node.currentY += (node.y - node.currentY) * 0.03;
      });

      const nodeMap = new Map(nodesStateRef.current.map((n) => [n.id, n]));

      // 3. Draw Network Edges & Energy Synapse Pulses
      mindEdges.forEach((edge) => {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) return;

        const isHighlighted =
          hoveredNodeId === fromNode.id ||
          hoveredNodeId === toNode.id ||
          activeNodeId === fromNode.id ||
          activeNodeId === toNode.id;

        ctx.beginPath();
        ctx.moveTo(fromNode.currentX, fromNode.currentY);
        ctx.lineTo(toNode.currentX, toNode.currentY);

        const edgeGrad = ctx.createLinearGradient(
          fromNode.currentX,
          fromNode.currentY,
          toNode.currentX,
          toNode.currentY
        );
        edgeGrad.addColorStop(0, fromNode.color);
        edgeGrad.addColorStop(1, toNode.color);

        ctx.strokeStyle = isHighlighted
          ? isOverclocked ? "rgba(236, 72, 153, 0.8)" : edgeGrad
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();
      });

      // Flowing particle packets along edges
      particlesRef.current.forEach((pt) => {
        const fromNode = nodeMap.get(pt.edgeFrom);
        const toNode = nodeMap.get(pt.edgeTo);
        if (!fromNode || !toNode) return;

        pt.progress += pt.speed;
        if (pt.progress >= 1) pt.progress = 0;

        const px = fromNode.currentX + (toNode.currentX - fromNode.currentX) * pt.progress;
        const py = fromNode.currentY + (toNode.currentY - fromNode.currentY) * pt.progress;

        ctx.fillStyle = isOverclocked ? "#ec4899" : fromNode.color;
        ctx.shadowColor = fromNode.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Draw Neural Nodes
      nodesStateRef.current.forEach((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isActive = activeNodeId === node.id;
        const pulse = Math.sin(animationTime * 2.5 + node.pulsePhase) * 0.15 + 1.0;
        const r = node.radius * (isHovered ? 1.15 : isActive ? 1.1 : 1.0);

        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, r * 1.35 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = node.glowColor;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const grad = ctx.createRadialGradient(
          node.currentX - r * 0.3,
          node.currentY - r * 0.3,
          r * 0.1,
          node.currentX,
          node.currentY,
          r
        );
        grad.addColorStop(0, "rgba(30, 41, 59, 0.95)");
        grad.addColorStop(0.7, "rgba(15, 23, 42, 0.9)");
        grad.addColorStop(1, node.color);

        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered || isActive ? 24 : 12;
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = isHovered ? 3 : 1.5;
        ctx.strokeStyle = isHovered ? "#ffffff" : node.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, 6 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.font = `600 ${isHovered ? "13px" : "12px"} monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(243, 244, 246, 0.9)";
        ctx.fillText(node.label, node.currentX, node.currentY + r + 20);

        ctx.font = "10px sans-serif";
        ctx.fillStyle = node.color;
        ctx.fillText(node.sublabel, node.currentX, node.currentY + r + 34);
      });

      ctx.restore();
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    panOffset,
    zoomScale,
    hoveredNodeId,
    activeNodeId,
    isOverclocked,
    onSelectNode,
    setHoveredNodeId
  ]);

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
