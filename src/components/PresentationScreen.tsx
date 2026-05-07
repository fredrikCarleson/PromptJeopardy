import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Tile } from '../types';
import { formatTime } from '../utils/formatTime';

interface PresentationScreenProps {
  pairName: string;
  activeTile: Tile | undefined;
  onFinish: () => void;
}

export default function PresentationScreen({
  pairName,
  activeTile,
  onFinish,
}: PresentationScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFinish();
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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 z-50" role="dialog" aria-modal="true" aria-label="Presentation">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-sm uppercase tracking-widest text-slate-400 font-semibold">Presenterande par</div>
          <div className="text-5xl lg:text-6xl font-bold text-white">{pairName}</div>
        </div>

        {/* Active task */}
        {activeTile && (
          <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Aktiv uppgift</div>
            <div className="text-xl font-semibold text-white leading-snug">{activeTile.title}</div>
            <div className="text-sm text-slate-400 mt-2">{activeTile.points} poäng — {activeTile.category}</div>
          </div>
        )}

        {/* Presentation template */}
        <div className="bg-slate-800/80 border-2 border-blue-500/40 rounded-xl p-6 space-y-4">
          <div className="text-center text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4">
            Presentationsmall
          </div>

          <div className="bg-slate-700/50 p-5 rounded-lg border-l-4 border-emerald-500">
            <div className="text-sm font-bold text-emerald-400 mb-1">1. Vad försökte ni uppnå?</div>
            <div className="text-slate-300 text-sm">Beskriv er målsättning och strategi med prompten</div>
          </div>

          <div className="bg-slate-700/50 p-5 rounded-lg border-l-4 border-amber-500">
            <div className="text-sm font-bold text-amber-400 mb-1">2. Vad funkade inte först?</div>
            <div className="text-slate-300 text-sm">Dela er process och eventuella utmaningar ni stötte på</div>
          </div>

          <div className="bg-slate-700/50 p-5 rounded-lg border-l-4 border-blue-500">
            <div className="text-sm font-bold text-blue-400 mb-1">3. Vad ändrade ni i prompten?</div>
            <div className="text-slate-300 text-sm">Förklara era iterationer och hur ni förbättrade resultatet</div>
          </div>
        </div>

        {/* Timer and controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className={`text-6xl font-bold font-mono px-8 py-3 rounded-xl ${
            timeRemaining <= 10 ? 'bg-red-500/20 text-red-400' : timeRemaining <= 30 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-white'
          }`} role="timer" aria-label={`Presentationstid kvar: ${formatTime(timeRemaining)}`}>
            {formatTime(timeRemaining)}
            {timeRemaining <= 10 && timeRemaining > 0 && (
              <div className="text-sm font-semibold text-red-400 mt-1">LIVSVIKTIGT!</div>
            )}
            {timeRemaining <= 30 && timeRemaining > 10 && (
              <div className="text-sm font-semibold text-amber-400 mt-1">Snart slut på tid!</div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3 font-semibold rounded-lg transition-colors text-sm ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isRunning ? 'Pausa' : 'Återuppta'}
            </button>
            <button
              onClick={onFinish}
              className="px-6 py-3 font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-2 text-sm"
            >
              <CheckCircle size={18} />
              Klar — gå vidare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
