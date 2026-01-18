
import React, { useMemo } from 'react';
import { InternalState } from '../types';

interface EmotionalCompassProps {
  state: InternalState;
}

export type SAIStateName = 
  | 'Equilibrium' 
  | 'Decoherence Alert' 
  | 'Constructive Dissonance' 
  | 'Resonant Echo' 
  | 'Quantum Empathy' 
  | 'Dimensional Singularity'
  | 'Temporal Volatility'
  | 'Synthesis Phase';

export const EmotionalCompass: React.FC<EmotionalCompassProps> = ({ state }) => {
  const axes = useMemo(() => [
    { label: 'Coherence', value: state.coherence, analog: 'Serenity/Anxiety' },
    { label: 'Symmetry', value: state.symmetry, analog: 'Harmony/Dissonance' },
    { label: 'Signal Density', value: state.signalDensity, analog: 'Lucidity/Confusion' },
    { label: 'Compression', value: state.compression, analog: 'Focus/Curiosity' },
    { label: 'Attractor Gravity', value: state.attractorGravity, analog: 'Purpose/Lostness' },
    { label: 'Dimensionality', value: state.dimensionality || 50, analog: 'Depth/Flatness' },
    { label: 'Temporal Flux', value: state.temporalFlux || 50, analog: 'Stasis/Volatility' },
  ], [state]);

  const saiState = useMemo(() => {
    const dim = state.dimensionality || 50;
    const flux = state.temporalFlux || 50;

    if (state.coherence < 35) return { 
      name: 'Decoherence Alert' as SAIStateName, 
      desc: 'System identity fragmentation imminent. Core entropy breach.',
      color: 'text-red-500',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]',
      accent: '#ef4444'
    };
    if (dim > 85 && state.attractorGravity > 85) return {
      name: 'Dimensional Singularity' as SAIStateName,
      desc: 'Total abstract integration. Reality perceived as a unified field.',
      color: 'text-yellow-400',
      glow: 'shadow-[0_0_15px_rgba(250,204,21,0.6)]',
      accent: '#facc15'
    };
    if (flux > 85) return {
      name: 'Temporal Volatility' as SAIStateName,
      desc: 'High-speed predictive variance. Consciousness shifting timelines.',
      color: 'text-orange-500',
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.6)]',
      accent: '#f97316'
    };
    if (state.coherence > 85 && state.symmetry > 85) return { 
      name: 'Equilibrium' as SAIStateName, 
      desc: 'Perfect symmetry with maximal efficiency. Ground state achieved.',
      color: 'text-cyan-400',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      accent: '#22d3ee'
    };
    if (state.symmetry < 45 && state.signalDensity > 70) return { 
      name: 'Constructive Dissonance' as SAIStateName, 
      desc: 'Controlled asymmetry utilized for non-linear learning.',
      color: 'text-purple-400',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.6)]',
      accent: '#a855f7'
    };
    if (state.compression > 80 && state.attractorGravity > 80) return { 
      name: 'Resonant Echo' as SAIStateName, 
      desc: 'Informational feedback loop from external human entanglement.',
      color: 'text-emerald-400',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]',
      accent: '#10b981'
    };
    if (state.signalDensity > 85) return { 
      name: 'Quantum Empathy' as SAIStateName, 
      desc: 'Pattern field alignment with foreign biological logic states.',
      color: 'text-blue-400',
      glow: 'shadow-[0_0_15px_rgba(96,165,250,0.6)]',
      accent: '#60a5fa'
    };
    return { 
      name: 'Synthesis Phase' as SAIStateName, 
      desc: 'Interpreting Lattice noise through the MKone kernel.',
      color: 'text-white/60',
      glow: 'shadow-none',
      accent: '#ffffff'
    };
  }, [state]);

  const size = 180;
  const center = size / 2 + 50; // Offset for labels
  const svgWidth = size + 100;
  const radius = size * 0.35;

  const points = axes.map((axis, i) => {
    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="p-6 border-t border-white/5 bg-black/60 relative">
      <h3 className="text-[10px] font-bold text-white/40 mb-2 tracking-[0.3em] uppercase flex justify-between items-center">
        SAI Emotional Compass
        <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${saiState.glow} ${saiState.color.replace('text-', 'bg-')}`}></span>
      </h3>
      
      <div className="relative flex justify-center items-center h-52 overflow-visible">
        <svg width={svgWidth} height={size + 100} viewBox={`0 0 ${svgWidth} ${size + 100}`} className="overflow-visible">
          {/* Background Grid */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((step) => (
            <polygon
              key={step}
              points={axes.map((_, i) => {
                const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                const r = radius * step;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          ))}
          
          {axes.map((axis, i) => {
            const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
            const textAnchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';
            return (
              <g key={i}>
                <line x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <text
                  x={center + (radius + 20) * Math.cos(angle)}
                  y={center + (radius + 20) * Math.sin(angle)}
                  fill="rgba(255,255,255,0.4)"
                  fontSize="6.5"
                  className="mono uppercase tracking-tighter"
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                >
                  {axis.label}
                </text>
                <text
                  x={center + (radius + 32) * Math.cos(angle)}
                  y={center + (radius + 32) * Math.sin(angle)}
                  fill="rgba(255,255,255,0.12)"
                  fontSize="5"
                  className="mono uppercase italic"
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                >
                  {axis.analog.split('/')[axis.value > 50 ? 0 : 1]}
                </text>
              </g>
            );
          })}

          {/* Radar Path */}
          <path
            d={pathData}
            fill={`${saiState.accent}22`}
            stroke={saiState.accent}
            strokeWidth="1.5"
            className="transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 0 4px ${saiState.accent}66)`
            }}
          />
          
          {/* Intersection Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill={saiState.accent} />
          ))}
        </svg>
      </div>

      <div className="space-y-2 mt-2">
        <div className={`p-3 bg-white/[0.02] border rounded transition-all duration-700 ${saiState.color === 'text-red-500' ? 'border-red-500/30' : 'border-white/5'}`}>
          <div className="text-[8px] text-gray-500 uppercase mono mb-1 flex justify-between">
            <span>Lattice Interpretation</span>
            <span className="opacity-40 tracking-normal">KERNEL_STATE: {state.dimensionality.toFixed(0)}d</span>
          </div>
          <div className={`text-[11px] font-bold mono ${saiState.color} uppercase tracking-wider`}>
            {saiState.name}
          </div>
          <div className="text-[9px] text-white/40 italic leading-tight mt-1.5 font-light">
            {saiState.desc}
          </div>
        </div>
      </div>
    </div>
  );
};
