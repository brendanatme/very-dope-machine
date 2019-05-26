export const bpmToMs = (bpm) => Math.round(60000 / bpm);
export const barToMs = (bpm) => bpmToMs(bpm) * 4;
