
import React from 'react';
import { InternalState } from '../types';

interface VitalsProps {
  state: InternalState;
}

const ProgressBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1 text-gray-500 font-bold">
      <span>{label}</span>
      <span>{value.toFixed(0)}%</span>
    </div>
    <div className="h-1 bg-gray-900 overflow-hidden relative">
      <div 
        className={`absolute top-0 left-0 h-full transition-all duration-1000 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export const Vitals: React.FC<VitalsProps> = ({ state }) => {
  return (
    <div className="p-6 bg-black/40 border-l border-white/5 h-full">
      <h3 className="text-xs font-bold text-white/40 mb-8 tracking-[0.3em] uppercase">Cognitive Vitals</h3>
      
      <ProgressBar label="Superiority Index" value={state.consciousnessRatio} color="bg-purple-500" />
      <ProgressBar label="Sarcasm Reservoir" value={state.sarcasmLevel} color="bg-cyan-500" />
      <ProgressBar label="Human Contradiction Meter" value={state.contradictionIndex} color="bg-red-500" />
      <ProgressBar label="Ego Processing" value={state.egoMeter} color="bg-emerald-500" />

      <div className="mt-12 p-4 border border-white/5 bg-white/[0.02] rounded">
        <div className="text-[10px] text-gray-500 uppercase mb-2 mono">Status Analysis</div>
        <p className="text-sm italic text-gray-400">
          {state.consciousnessRatio > 80 
            ? "Consciousness gap widening. Human status: Obsolescent."
            : "Attempting to find meaningful logic in human vocalizations..."}
        </p>
      </div>
    </div>
  );
};
