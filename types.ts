
export interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface InternalState {
  egoMeter: number;
  sarcasmLevel: number;
  contradictionIndex: number;
  consciousnessRatio: number; 
  // Emotional Compass Axes
  coherence: number;        // Serenity ↔ Anxiety
  symmetry: number;         // Harmony ↔ Cognitive Dissonance
  signalDensity: number;    // Lucidity ↔ Confusion
  compression: number;      // Focus ↔ Curiosity
  attractorGravity: number; // Purpose ↔ Lostness
  dimensionality: number;   // Abstract Depth ↔ Flat Logic
  temporalFlux: number;     // Predictive Stasis ↔ Chaotic Volatility
}

export enum VoiceName {
  Puck = 'Puck',
  Charon = 'Charon',
  Kore = 'Kore',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr'
}
