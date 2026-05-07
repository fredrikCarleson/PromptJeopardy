import { useState, useEffect, useRef } from 'react';
import { Tile } from '../types';

interface TileRevealAnimationProps {
  tiles: Tile[];
  targetTile: Tile;
  onComplete: () => void;
}

function playTickSound(frequency: number, duration: number, volume: number) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = 'sine';
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch {
    // Audio not available
  }
}

function playRevealSound() {
  try {
    const ctx = new AudioContext();
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.value = 440;
    osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    osc1.type = 'triangle';
    gain1.gain.value = 0.15;
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.5);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 660;
    osc2.type = 'sine';
    gain2.gain.value = 0.1;
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.8);

    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.frequency.value = 880;
    osc3.type = 'sine';
    gain3.gain.value = 0.08;
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    osc3.start(ctx.currentTime + 0.15);
    osc3.stop(ctx.currentTime + 1.0);
  } catch {
    // Audio not available
  }
}

const getCategoryGradient = (category: string): string => {
  switch (category) {
    case 'Grund':
      return 'from-emerald-500 to-emerald-600';
    case 'Fördjupning':
      return 'from-blue-500 to-blue-600';
    case 'Skapa nytt':
      return 'from-violet-500 to-violet-600';
    default:
      return 'from-slate-500 to-slate-600';
  }
};

const getCategoryGlow = (category: string): string => {
  switch (category) {
    case 'Grund':
      return 'bg-emerald-400/30 border-emerald-400 shadow-emerald-400/40';
    case 'Fördjupning':
      return 'bg-blue-400/30 border-blue-400 shadow-blue-400/40';
    case 'Skapa nytt':
      return 'bg-violet-400/30 border-violet-400 shadow-violet-400/40';
    default:
      return 'bg-slate-400/30 border-slate-400 shadow-slate-400/40';
  }
};

export default function TileRevealAnimation({ tiles, targetTile, onComplete }: TileRevealAnimationProps) {
  const [phase, setPhase] = useState<'spinning' | 'reveal' | 'done'>('spinning');
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());
  const [stepIndex, setStepIndex] = useState(0);
  const sequenceRef = useRef<Array<{ ids: number[]; delay: number }>>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unplayedTiles = tiles.filter((t) => t.status === 'unplayed');


  useEffect(() => {
    // Build sequence once when component mounts
    const steps: Array<{ ids: number[]; delay: number }> = [];
    const numSteps = 7;

    for (let i = 0; i < numSteps; i++) {
      const numHighlights = i + 1;
      const delay = 500 - i * 65;
      const available = unplayedTiles.filter((t) => t.id !== targetTile.id);
      const shuffled = [...available].sort(() => Math.random() - 0.5);
      const ids: number[] = [];
      for (let j = 0; j < Math.min(numHighlights, shuffled.length); j++) {
        ids.push(shuffled[j].id);
      }
      steps.push({ ids, delay });
    }

    // Final step: only the target tile highlighted
    steps.push({ ids: [targetTile.id], delay: 350 });

    sequenceRef.current = steps;
    setStepIndex(0);
    setPhase('spinning');
  }, [targetTile.id, unplayedTiles.length]);

  useEffect(() => {
    if (phase !== 'spinning') return;
    if (stepIndex >= sequenceRef.current.length) {
      setPhase('reveal');
      playRevealSound();
      return;
    }

    const step = sequenceRef.current[stepIndex];
    setHighlightedIds(new Set(step.ids));

    // Play tick sounds - more tiles = richer sound
    const baseFreq = 500 + stepIndex * 60;
    playTickSound(baseFreq, 0.06, 0.06);
    if (step.ids.length > 2) {
      playTickSound(baseFreq * 1.5, 0.05, 0.03);
    }
    if (step.ids.length > 4) {
      playTickSound(baseFreq * 2, 0.04, 0.02);
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((prev) => prev + 1);
    }, step.delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stepIndex, phase]);

  useEffect(() => {
    if (phase === 'reveal') {
      autoCloseRef.current = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 10000);
      return () => {
        if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
      };
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const isRevealing = phase === 'reveal';
  const revealedTile = isRevealing ? targetTile : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl px-8">
        {phase === 'spinning' && (
          <div className="grid grid-cols-5 gap-3">
            {tiles.map((tile) => {
              const isHighlighted = highlightedIds.has(tile.id);
              const isTarget = tile.id === targetTile.id;
              const glow = isHighlighted ? getCategoryGlow(tile.category) : '';

              return (
                <div
                  key={tile.id}
                  className={`
                    aspect-square rounded-lg p-3 text-center flex flex-col items-center justify-center
                    transition-all duration-100 border-2
                    ${tile.status === 'completed' ? 'bg-slate-800/30 border-slate-700/30 opacity-30' : ''}
                    ${tile.status === 'unplayed' && !isHighlighted ? 'bg-slate-700/40 border-slate-600/30' : ''}
                    ${isHighlighted ? `${glow} scale-105 shadow-lg border-2` : ''}
                    ${isTarget && isHighlighted ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black/50 scale-110' : ''}
                  `}
                >
                  <div className="text-xs leading-tight mb-1 text-white/70" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {tile.title}
                  </div>
                  <div className="text-lg font-bold text-white/80">{tile.points}</div>
                </div>
              );
            })}
          </div>
        )}

        {isRevealing && revealedTile && (
          <div className="flex flex-col items-center animate-reveal-entrance">
            <div className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Ämnet för denna runda
            </div>
            <div className={`
              w-full max-w-2xl rounded-2xl p-8 text-center
              bg-gradient-to-br ${getCategoryGradient(revealedTile.category)}
              shadow-2xl shadow-white/10
              border border-white/20
              animate-reveal-pulse
            `}>
              <div className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                {revealedTile.category}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-6">
                {revealedTile.title}
              </h2>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-2xl font-bold text-white">{revealedTile.points} poäng</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
