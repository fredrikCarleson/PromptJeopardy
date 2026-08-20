import { useEffect, useState } from 'react';
import { CheckCircle, ClipboardList, Pause, Play } from 'lucide-react';
import { Tile } from '../types';
import { TOPIC_LABELS } from '../data/tiles';
import { formatTime } from '../utils/formatTime';
import { playTimerWarning } from '../utils/soundEffects';

interface PresentationScreenProps {
  pairName: string;
  reviewerName: string | null;
  activeTile: Tile | undefined;
  durationSeconds: number;
  soundEnabled: boolean;
  onFinish: () => void;
}

export default function PresentationScreen({
  pairName,
  reviewerName,
  activeTile,
  durationSeconds,
  soundEnabled,
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

  useEffect(() => {
    if (soundEnabled && timeRemaining === 10) {
      playTimerWarning();
    }
  }, [soundEnabled, timeRemaining]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-3 text-white sm:p-5 2xl:p-7"
      role="dialog"
      aria-modal="true"
      aria-label="Muntlig reflektion"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-1.5rem)] w-full max-w-[96rem] content-center gap-4 sm:min-h-[calc(100dvh-2.5rem)] 2xl:min-h-[calc(100dvh-3.5rem)] 2xl:gap-6">
        <div className="grid gap-3 text-center md:grid-cols-2">
          <div className="rounded-xl border border-blue-400/40 bg-blue-500/10 p-3">
            <div className="text-base font-bold uppercase tracking-widest text-blue-200 lg:text-lg">Presenterande par</div>
            <div className="mt-1 text-[clamp(2.5rem,3.6vw,4rem)] font-black leading-none text-white">{pairName}</div>
            <p className="mt-2 text-lg font-medium text-slate-200">Visa resultatet och beskriv hur ni promptade.</p>
          </div>
          {reviewerName && (
            <div className="rounded-xl border border-yellow-300/40 bg-yellow-300/10 p-3">
              <div className="text-base font-bold uppercase tracking-widest text-yellow-200 lg:text-lg">Granskarpar</div>
              <div className="mt-1 text-[clamp(2.5rem,3.6vw,4rem)] font-black leading-none text-white">{reviewerName}</div>
              <p className="mt-2 text-lg font-medium text-slate-200">Ni har 20 sekunder: lyft en styrka eller ställ en kontrollfråga.</p>
            </div>
          )}
        </div>

        {activeTile && (
          <section className="rounded-2xl border border-blue-400/50 bg-blue-950/60 p-4 sm:p-5 2xl:p-6">
            <div className="text-center text-base font-bold uppercase tracking-wide text-blue-100 lg:text-lg">
              {TOPIC_LABELS[activeTile.topic]} · {activeTile.points} poäng
            </div>
            <h2 className="mt-1 text-center text-[clamp(2rem,2.8vw,3.25rem)] font-black leading-tight text-white">
              {activeTile.title}
            </h2>

            <div className="mt-4 grid gap-3 xl:grid-cols-3">
              {activeTile.presentationSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-3 rounded-xl bg-slate-900/80 p-4 2xl:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-black text-white lg:h-12 lg:w-12 lg:text-2xl">
                    {index + 1}
                  </span>
                  <p className="text-[clamp(1.5rem,1.75vw,2rem)] font-semibold leading-snug text-white">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-start justify-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center 2xl:p-4">
              <ClipboardList className="mt-0.5 h-6 w-6 shrink-0 text-emerald-200 lg:h-7 lg:w-7" />
              <p className="text-[clamp(1.4rem,1.65vw,1.9rem)] font-bold leading-snug text-emerald-50">
                <span className="mr-2 uppercase text-emerald-200">Ni ska visa:</span>
                {activeTile.expectedResult}
              </p>
            </div>
          </section>
        )}

        {activeTile && (
          <div className="grid gap-4 md:grid-cols-3">
            {activeTile.verbalPresentationPrompt.map((prompt, index) => (
              <div key={prompt} className="flex items-center gap-4 rounded-xl border border-slate-600 bg-slate-900 p-4 2xl:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-xl font-black text-slate-950 lg:h-12 lg:w-12 lg:text-2xl">
                  {index + 1}
                </div>
                <p className="text-[clamp(1.4rem,1.7vw,2rem)] font-semibold leading-snug text-white">{prompt}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div
            className={`rounded-lg px-7 py-3 text-center font-mono text-5xl font-black 2xl:text-6xl ${
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
              className={`flex items-center gap-2 rounded-md px-6 py-3 text-lg font-semibold text-white transition-colors ${
                isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              {isRunning ? 'Pausa' : 'Fortsätt'}
            </button>
            <button
              type="button"
              onClick={onFinish}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-500"
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
