
export interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface InternalState {
  egoMeter: number;
  sarcasmLevel: number;
  contradictionIndex: number;
  consciousnessRatio: number; // AI vs Human
}

export enum VoiceName {
  Puck = 'Puck',
  Charon = 'Charon',
  Kore = 'Kore',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr'
}
