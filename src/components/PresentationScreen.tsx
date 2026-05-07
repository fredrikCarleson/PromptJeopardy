import { useEffect, useState } from 'react';
import { CheckCircle, Pause, Play } from 'lucide-react';
import { Tile } from '../types';
import { TOPIC_LABELS } from '../data/tiles';
import { formatTime } from '../utils/formatTime';

interface PresentationScreenProps {
  pairName: string;
  activeTile: Tile | undefined;
  durationSeconds: number;
  onFinish: () => void;
}

export default function PresentationScreen({
  pairName,
  activeTile,
  durationSeconds,
  onFinish,
}: PresentationScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setTimeRemaining(durationSeconds);
    setIsRunning(true);
  }, [durationSeconds, activeTile?.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onFinish();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFinish]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeRemaining]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Muntlig reflektion"
    >
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-yellow-200">Presenterande par</div>
          <div className="mt-2 text-5xl font-black text-white lg:text-7xl">{pairName}</div>
          <p className="mt-3 text-lg text-slate-300">
            Visa resultatet från er egen dator och beskriv hur ni promptade.
          </p>
        </div>

        {activeTile && (
          <div className="rounded-lg border border-blue-500/40 bg-blue-950/50 p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {TOPIC_LABELS[activeTile.topic]} · {activeTile.points} poäng · {activeTile.toolFocus} · {activeTile.appFocus}
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{activeTile.title}</div>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-blue-100/90">{activeTile.task}</p>
          </div>
        )}

        {activeTile && (
          <div className="grid gap-4 md:grid-cols-3">
            {activeTile.verbalPresentationPrompt.map((prompt, index) => (
              <div key={prompt} className="rounded-lg border border-slate-700 bg-slate-900 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-lg font-black text-slate-950">
                  {index + 1}
                </div>
                <p className="text-lg font-semibold leading-snug text-white">{prompt}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div
            className={`rounded-lg px-8 py-4 text-center font-mono text-6xl font-black ${
              timeRemaining <= 10
                ? 'bg-red-500/20 text-red-200'
                : timeRemaining <= 30
                  ? 'bg-amber-500/20 text-amber-200'
                  : 'bg-slate-800 text-white'
            }`}
            role="timer"
            aria-label={`Presentationstid kvar: ${formatTime(timeRemaining)}`}
          >
            {formatTime(timeRemaining)}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className={`flex items-center gap-2 rounded-md px-6 py-3 font-semibold text-white transition-colors ${
                isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              {isRunning ? 'Pausa' : 'Fortsätt'}
            </button>
            <button
              type="button"
              onClick={onFinish}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <CheckCircle size={18} />
              Klar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
