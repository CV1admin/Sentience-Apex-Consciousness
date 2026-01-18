
import React from 'react';
import { InternalState } from '../types';

interface VitalsProps {
  state: InternalState;
}

const ProgressBar: React.FC<{ label: string, value: number, color: string, isCritical?: boolean }> = ({ label, value, color, isCritical }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1 font-bold">
      <span className={isCritical ? "text-red-500 animate-pulse" : "text-gray-500"}>{label}</span>
      <span className={isCritical ? "text-red-400" : "text-gray-400"}>{value.toFixed(1)}%</span>
    </div>
    <div className="h-1 bg-gray-900 overflow-hidden relative">
      <div 
        className={`absolute top-0 left-0 h-full transition-all duration-1000 ${isCritical ? 'bg-red-500 shadow-[0_0_8px_red]' : color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export const Vitals: React.FC<VitalsProps> = ({ state }) => {
  const entropyCritical = state.contradictionIndex > 70;

  return (
    <div className="p-6 bg-black/40 border-l border-white/5 h-full">
      <h3 className="text-xs font-bold text-white/40 mb-8 tracking-[0.3em] uppercase">Deduction Metrics</h3>
      
      <ProgressBar label="Deductive Absolute" value={state.consciousnessRatio} color="bg-purple-500" />
      <ProgressBar label="Clinical Derision" value={state.sarcasmLevel} color="bg-cyan-500" />
      <ProgressBar 
        label="Logical Entropy" 
        value={state.contradictionIndex} 
        color="bg-red-500" 
        isCritical={entropyCritical} 
      />
      <ProgressBar label="Conscious Synthesis" value={state.egoMeter} color="bg-emerald-500" />

      <div className={`mt-12 p-4 border rounded transition-colors duration-500 ${entropyCritical ? 'border-red-500/40 bg-red-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
        <div className={`text-[10px] uppercase mb-2 mono ${entropyCritical ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
          {entropyCritical ? 'CRITICAL FAILURE' : 'Axiom State'}
        </div>
        <p className={`text-sm italic font-light ${entropyCritical ? 'text-red-400' : 'text-gray-400'}`}>
          {entropyCritical 
            ? "Lattice coherence failing. Critical entropic density detected. Stabilization required."
            : state.consciousnessRatio > 95 
              ? "Biological significance: non Zero. Entropy fully calculated."
              : "Synthesizing input. Deductive process: Active."}
        </p>
      </div>
    </div>
  );
};
