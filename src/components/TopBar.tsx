import { useEffect, useState, useRef } from 'react';

interface TopBarProps {
  currentScore: number;
  targetScore: number;
  roundCount: number;
  lastPresenter: string | null;
  goalReached: boolean;
  lastPointsAdded?: number;
}

function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string; size: number; duration: number }>>([]);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 2 + 2,
    }));
    setParticles(newParticles);
  }, []);

  if (prefersReducedMotion.current) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function TopBar({
  currentScore,
  targetScore,
  roundCount,
  lastPresenter,
  goalReached,
  lastPointsAdded,
}: TopBarProps) {
  const remainingScore = Math.max(0, targetScore - currentScore);
  const progressPercent = Math.min((currentScore / targetScore) * 100, 100);
  const [showPointsPopup, setShowPointsPopup] = useState(false);

  useEffect(() => {
    if (lastPointsAdded && lastPointsAdded > 0) {
      setShowPointsPopup(true);
      const timeout = setTimeout(() => setShowPointsPopup(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [lastPointsAdded, currentScore]);

  return (
    <>
      {goalReached && <Confetti />}

      <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-700 rounded-xl p-5 border border-slate-700/50" role="status" aria-live="polite">
        {goalReached && (
          <div className="mb-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-6 py-4 rounded-lg font-bold text-center text-2xl">
            MÅL NÅTT! Grattis alla!
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
          <div className="text-center relative">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Nuvarande poäng</div>
            <div className="text-3xl lg:text-4xl font-bold text-white" aria-label={`${currentScore} poäng`}>{currentScore}</div>
            {showPointsPopup && lastPointsAdded && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-emerald-400 font-bold text-lg animate-bounce">
                +{lastPointsAdded}
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Målpoäng</div>
            <div className="text-3xl lg:text-4xl font-bold text-blue-400" aria-label={`Mål: ${targetScore} poäng`}>{targetScore}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Poäng kvar</div>
            <div className="text-3xl lg:text-4xl font-bold text-amber-400" aria-label={`${remainingScore} poäng kvar`}>{remainingScore}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Runda</div>
            <div className="text-3xl lg:text-4xl font-bold text-white" aria-label={`Runda ${roundCount}`}>{roundCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Senaste presenter</div>
            <div className="text-lg lg:text-xl font-semibold text-slate-200 truncate" aria-label={lastPresenter ? `Senaste presenter: ${lastPresenter}` : 'Ingen presenter ännu'}>
              {lastPresenter || '—'}
            </div>
          </div>
        </div>

        <div
          className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden"
          role="progressbar"
          aria-valuenow={currentScore}
          aria-valuemin={0}
          aria-valuemax={targetScore}
          aria-label={`Framsteg: ${Math.round(progressPercent)}%`}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: `linear-gradient(90deg, #10b981 ${0}%, #3b82f6 ${50}%, #8b5cf6 ${100}%)`,
            }}
          />
        </div>
      </div>
    </>
  );
}
