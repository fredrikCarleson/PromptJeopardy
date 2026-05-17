import { useEffect, useRef, useState } from 'react';
import { TOPIC_LABELS } from '../data/tiles';
import { Tile } from '../types';
import { TOPIC_STYLES } from '../utils/categoryStyles';
import { playSelectionTick, playTileReveal } from '../utils/soundEffects';

interface TileRevealAnimationProps {
  tiles: Tile[];
  targetTile: Tile;
  soundEnabled: boolean;
  onComplete: () => void;
}

export default function TileRevealAnimation({ tiles, targetTile, soundEnabled, onComplete }: TileRevealAnimationProps) {
  const [phase, setPhase] = useState<'spinning' | 'reveal' | 'done'>('spinning');
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());
  const [stepIndex, setStepIndex] = useState(0);
  const sequenceRef = useRef<Array<{ ids: number[]; delay: number }>>([]);

  useEffect(() => {
    const unplayedTiles = tiles.filter((tile) => tile.status === 'unplayed');
    const steps: Array<{ ids: number[]; delay: number }> = [];
    const numSteps = 9;

    for (let index = 0; index < numSteps; index++) {
      const numHighlights = Math.min(index + 1, 8);
      const delay = 420 - index * 35;
      const available = unplayedTiles.filter((tile) => tile.id !== targetTile.id);
      const shuffled = [...available].sort(() => Math.random() - 0.5);
      steps.push({ ids: shuffled.slice(0, numHighlights).map((tile) => tile.id), delay });
    }

    steps.push({ ids: [targetTile.id], delay: 400 });

    sequenceRef.current = steps;
    setStepIndex(0);
    setHighlightedIds(new Set());
    setPhase('spinning');
  }, [targetTile.id, tiles]);

  useEffect(() => {
    if (phase !== 'spinning') return;

    if (stepIndex >= sequenceRef.current.length) {
      setPhase('reveal');
      if (soundEnabled) playTileReveal();
      return;
    }

    const step = sequenceRef.current[stepIndex];
    setHighlightedIds(new Set(step.ids));
    if (soundEnabled) playSelectionTick(stepIndex);

    const timeout = setTimeout(() => {
      setStepIndex((prev) => prev + 1);
    }, step.delay);

    return () => clearTimeout(timeout);
  }, [soundEnabled, stepIndex, phase]);

  useEffect(() => {
    if (phase !== 'reveal') return;

    const autoClose = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 7000);

    return () => clearTimeout(autoClose);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div className="relative w-full max-w-6xl px-6">
        {phase === 'spinning' && (
          <div className="grid grid-cols-5 gap-2">
            {tiles.map((tile) => {
              const isHighlighted = highlightedIds.has(tile.id);
              return (
                <div
                  key={tile.id}
                  className={[
                    'flex aspect-[1/0.8] flex-col items-center justify-center rounded-md border-2 p-2 text-center transition-all duration-100',
                    tile.status === 'completed' ? 'border-slate-700 bg-slate-900/50 opacity-30' : 'border-blue-700 bg-blue-950/70',
                    isHighlighted ? `${TOPIC_STYLES[tile.topic].glow} scale-105 shadow-lg` : '',
                  ].join(' ')}
                >
                  <div className="text-xs font-bold uppercase leading-tight text-white/70">
                    {TOPIC_LABELS[tile.topic]}
                  </div>
                  <div className="mt-1 text-2xl font-black text-yellow-100">{tile.points}</div>
                </div>
              );
            })}
          </div>
        )}

        {phase === 'reveal' && (
          <div className="flex flex-col items-center text-center animate-reveal-entrance">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Ämnet för denna runda</div>
            <div className="w-full max-w-3xl rounded-lg border border-yellow-200/50 bg-blue-800 p-8 shadow-2xl shadow-yellow-300/10 animate-reveal-pulse">
              <div className="text-sm font-bold uppercase tracking-wider text-yellow-100">
                {TOPIC_LABELS[targetTile.topic]} · {targetTile.points} poäng
              </div>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white">{targetTile.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-blue-50">{targetTile.task}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPhase('done');
                onComplete();
              }}
              className="mt-6 rounded-md bg-yellow-300 px-5 py-3 font-bold text-slate-950 transition-colors hover:bg-yellow-200"
            >
              Starta runda nu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
