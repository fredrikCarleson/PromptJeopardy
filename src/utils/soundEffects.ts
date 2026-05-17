type Note = {
  frequency: number;
  start: number;
  duration: number;
  volume?: number;
  type?: OscillatorType;
};

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  audioContext ??= new AudioContext();
  return audioContext;
};

const playNotes = (notes: Note[]) => {
  try {
    const context = getAudioContext();
    if (!context) return;

    if (context.state === 'suspended') {
      void context.resume();
    }

    const now = context.currentTime;
    notes.forEach(({ frequency, start, duration, volume = 0.08, type = 'triangle' }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + start);
      oscillator.stop(now + start + duration);
    });
  } catch {
    // Audio is optional.
  }
};

export const unlockAudio = () => {
  try {
    const context = getAudioContext();
    if (context?.state === 'suspended') {
      void context.resume();
    }
  } catch {
    // Audio is optional.
  }
};

export const playSelectionTick = (stepIndex: number) => {
  playNotes([
    {
      frequency: 420 + stepIndex * 45,
      start: 0,
      duration: 0.06,
      volume: 0.045,
      type: 'sine',
    },
  ]);
};

export const playTileReveal = () => {
  playNotes([
    { frequency: 392, start: 0, duration: 0.12, volume: 0.08 },
    { frequency: 523.25, start: 0.08, duration: 0.16, volume: 0.09 },
    { frequency: 659.25, start: 0.18, duration: 0.3, volume: 0.11 },
  ]);
};

export const playPresenterReveal = () => {
  playNotes([
    { frequency: 523.25, start: 0, duration: 0.12, volume: 0.08 },
    { frequency: 659.25, start: 0.1, duration: 0.12, volume: 0.09 },
    { frequency: 783.99, start: 0.2, duration: 0.28, volume: 0.11 },
  ]);
};

export const playScoreChime = () => {
  playNotes([
    { frequency: 659.25, start: 0, duration: 0.12, volume: 0.08 },
    { frequency: 783.99, start: 0.1, duration: 0.12, volume: 0.09 },
    { frequency: 1046.5, start: 0.2, duration: 0.24, volume: 0.11 },
  ]);
};

export const playGoalFanfare = () => {
  playNotes([
    { frequency: 523.25, start: 0, duration: 0.16, volume: 0.1 },
    { frequency: 659.25, start: 0.12, duration: 0.16, volume: 0.1 },
    { frequency: 783.99, start: 0.24, duration: 0.16, volume: 0.11 },
    { frequency: 1046.5, start: 0.38, duration: 0.4, volume: 0.13 },
  ]);
};

export const playTimerWarning = () => {
  playNotes([
    { frequency: 392, start: 0, duration: 0.08, volume: 0.07, type: 'square' },
    { frequency: 392, start: 0.16, duration: 0.08, volume: 0.07, type: 'square' },
  ]);
};
