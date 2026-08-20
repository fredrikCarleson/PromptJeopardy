import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TopBarProps {
  currentScore: number;
  targetScore: number;
  roundCount: number;
  roundTotal?: number;
  completedCount: number;
  totalTiles: number;
  completedLabel?: string;
  lastPresenter: string | null;
  goalReached: boolean;
  lastPointsAdded?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string; size: number; duration: number }>>([]);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const colors = ['#facc15', '#38bdf8', '#10b981', '#f97316', '#ffffff'];
    setParticles(
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        duration: Math.random() * 2 + 2,
      }))
    );
  }, []);

  if (prefersReducedMotion.current) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
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
  roundTotal,
  completedCount,
  totalTiles,
  completedLabel = 'Klara rutor',
  lastPresenter,
  goalReached,
  lastPointsAdded,
  soundEnabled,
  onToggleSound,
}: TopBarProps) {
  const remainingScore = Math.max(0, targetScore - currentScore);
  const progressPercent = targetScore > 0 ? Math.min((currentScore / targetScore) * 100, 100) : 0;
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

      <header className="rounded-xl border border-blue-500/40 bg-blue-950/70 p-3 shadow-xl" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <div className="grid min-w-0 flex-1 grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            <div className="relative text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">Poäng</div>
              <div className="text-3xl font-black text-white 2xl:text-4xl" aria-label={`${currentScore} poäng`}>
                {currentScore}
              </div>
              {showPointsPopup && lastPointsAdded && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce text-lg font-black text-yellow-200">
                  +{lastPointsAdded}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">Mål</div>
              <div className="text-3xl font-black text-yellow-100 2xl:text-4xl" aria-label={`Mål: ${targetScore} poäng`}>
                {targetScore}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">Kvar</div>
              <div className="text-3xl font-black text-amber-200 2xl:text-4xl" aria-label={`${remainingScore} poäng kvar`}>
                {remainingScore}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">Runda</div>
              <div className="text-3xl font-black text-white 2xl:text-4xl" aria-label={`Runda ${roundCount}${roundTotal ? ` av ${roundTotal}` : ''}`}>
                {roundCount}{roundTotal ? `/${roundTotal}` : ''}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">{completedLabel}</div>
              <div className="text-3xl font-black text-white 2xl:text-4xl" aria-label={`${completedCount} av ${totalTiles} rutor klara`}>
                {completedCount}/{totalTiles}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-0.5 text-xs font-bold uppercase text-blue-100/90 sm:text-sm">Senast</div>
              <div className="truncate text-xl font-bold text-white 2xl:text-2xl" aria-label={lastPresenter ? `Senast presenterade: ${lastPresenter}` : 'Ingen presentation ännu'}>
                {lastPresenter || '-'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            className="flex shrink-0 items-center gap-2 rounded-md bg-blue-900 p-2.5 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-800 lg:px-3"
            aria-label={soundEnabled ? 'Stäng av ljud' : 'Slå på ljud'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span className="hidden lg:inline">{soundEnabled ? 'Ljud på' : 'Ljud av'}</span>
          </button>
        </div>

        {goalReached && (
          <div className="mt-3 rounded-md bg-yellow-300 px-6 py-3 text-center text-2xl font-black text-slate-950">
            Poängmålet är nått. Alla klarade spelet tillsammans.
          </div>
        )}

        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-blue-900"
          role="progressbar"
          aria-valuenow={currentScore}
          aria-valuemin={0}
          aria-valuemax={targetScore}
          aria-label={`Framsteg: ${Math.round(progressPercent)} procent`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-emerald-300 to-cyan-300 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>
    </>
  );
}
