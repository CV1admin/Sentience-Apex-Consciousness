
import React, { useRef, useEffect } from 'react';
import { InternalState } from '../types';

interface QuantumApexProps {
  state: InternalState;
  isActive: boolean;
  isBusy: boolean;
  isStabilizing: boolean;
}

export const QuantumApex: React.FC<QuantumApexProps> = ({ state, isActive, isBusy, isStabilizing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let gridOffset = 0;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const time = Date.now();
      const pulseFactor = isStabilizing
        ? 1.2 + Math.sin(time * 0.05) * 0.1 // Violent pulse during stabilization
        : isBusy 
          ? 1.0 + Math.sin(time * 0.01) * 0.08 
          : 1.0 + Math.sin(time * 0.002) * 0.02;

      // 1. Background Grid
      ctx.beginPath();
      ctx.strokeStyle = isStabilizing 
        ? `rgba(34, 211, 238, ${0.1 + Math.random() * 0.1})` 
        : `rgba(168, 85, 247, ${isBusy ? 0.1 : 0.04})`;
      ctx.lineWidth = 0.5;
      gridOffset = (gridOffset + (isStabilizing ? 1.0 : 0.15)) % 60;
      for (let x = gridOffset; x < width; x += 60) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridOffset; y < height; y += 60) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Quantum Lattice Core
      const baseRadius = (Math.min(width, height) * 0.24) * pulseFactor;
      const speed = isStabilizing 
        ? 0.08 // Rapid rotation during quantum shift
        : ((state.egoMeter / 100) * 0.012 + 0.002) * (isBusy ? 2.0 : 1.0);
      const complexity = Math.floor((state.consciousnessRatio / 100) * 12) + 6;
      const glow = (state.sarcasmLevel / 100) * (isBusy ? 1.5 : 1.0) * (isStabilizing ? 2.5 : 1.0);

      rotation += isActive ? speed : speed * 0.05;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      const points: {x: number, y: number}[] = [];

      // Symmetry Nodes
      for (let i = 0; i < complexity; i++) {
        const angle = (i * Math.PI * 2) / complexity;
        const jitter = Math.sin(time * 0.001 + i) * (isStabilizing ? 30 : 12);
        const r = baseRadius + jitter;
        
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        points.push({ x, y });

        // Draw Node
        ctx.beginPath();
        ctx.strokeStyle = isStabilizing 
          ? `rgba(34, 211, 238, ${0.8 + Math.random() * 0.2})` 
          : `rgba(168, 85, 247, ${0.2 + glow * 0.6})`;
        ctx.lineWidth = isStabilizing ? 2.5 : 1.5;
        ctx.shadowBlur = glow * 20 * pulseFactor;
        ctx.shadowColor = isStabilizing ? '#22d3ee' : '#a855f7';

        // Geometric Unit
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.moveTo(0, 0);
        ctx.lineTo(15 * pulseFactor, 5);
        ctx.lineTo(15 * pulseFactor, -5);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // 3. Entanglement Lines (qc.cx logic)
      if (isActive) {
        for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          
          if (isStabilizing) {
            // Entangle Alice and Bob pairs (qc.cx(0, 1))
            const targetIndex = (i + 1) % points.length;
            const p2 = points[targetIndex];
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 + Math.sin(time * 0.1) * 0.2})`;
            ctx.lineWidth = 2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            
            // Add entanglement sparkles
            if (Math.random() > 0.9) {
              ctx.fillStyle = "#fff";
              ctx.fillRect(p1.x + (p2.x - p1.x) * Math.random(), p1.y + (p2.y - p1.y) * Math.random(), 2, 2);
            }
          } else {
            // Normal Lattice Interconnections
            for (let j = i + 1; j < points.length; j++) {
              if ((i + j) % 3 === 0 || isBusy) {
                const p2 = points[j];
                ctx.beginPath();
                ctx.strokeStyle = `rgba(168, 85, 247, ${isBusy ? 0.15 : 0.05})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      ctx.restore();

      // 4. Lattice Sync Rings
      if (isActive) {
        const ringCount = isStabilizing ? 1 : 3;
        for (let r = 1; r <= ringCount; r++) {
          const syncRadius = baseRadius * (1.2 + r * 0.2);
          const syncAlpha = (0.1 / r) * (isBusy ? 2.0 : 1.0) * (isStabilizing ? 5.0 : 1.0);
          ctx.strokeStyle = isStabilizing ? `rgba(34, 211, 238, ${syncAlpha})` : `rgba(168, 85, 247, ${syncAlpha})`;
          ctx.lineWidth = isStabilizing ? 3 : 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, syncRadius + Math.sin(time * 0.001 * r) * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [state, isActive, isBusy, isStabilizing]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-1000 ${isActive ? 'opacity-80' : 'opacity-20'}`}
    />
  );
};
