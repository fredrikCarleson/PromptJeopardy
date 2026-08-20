import { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardList, FileText, Target, X } from 'lucide-react';
import { Tile } from '../types';
import { TOPIC_LABELS } from '../data/tiles';
import { TOPIC_STYLES } from '../utils/categoryStyles';

interface TileModalProps {
  tile: Tile;
  onClose: () => void;
}

export default function TileModal({ tile, onClose }: TileModalProps) {
  const [activeTab, setActiveTab] = useState<'task' | 'learning'>('task');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-0 sm:p-2 lg:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Uppgift: ${tile.title}`}
    >
      <div
        className="flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border-slate-600 bg-slate-900 shadow-2xl sm:h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-1rem)] sm:max-w-[calc(100vw-1rem)] sm:rounded-2xl sm:border lg:h-[calc(100dvh-2rem)] lg:max-h-[calc(100dvh-2rem)] lg:max-w-[calc(100vw-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-5 border-b border-slate-700 px-5 py-4 sm:px-7 lg:px-10 lg:py-5">
          <div className="min-w-0">
            <h2 className="text-[clamp(2rem,2.7vw,3.5rem)] font-bold leading-[1.08] text-white">{tile.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-base font-semibold lg:text-lg">
              <span className={`rounded-md border px-3 py-1.5 ${TOPIC_STYLES[tile.topic].badge}`}>
                {TOPIC_LABELS[tile.topic]}
              </span>
              <span className="rounded-md border border-yellow-300/50 bg-yellow-300/10 px-3 py-1.5 text-yellow-100">
                {tile.points} poäng
              </span>
              <span className="rounded-md border border-slate-500/60 bg-slate-800 px-3 py-1.5 text-slate-100">
                {tile.appFocus}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white lg:h-14 lg:w-14"
            aria-label="Stäng"
          >
            <X className="h-7 w-7 lg:h-8 lg:w-8" />
          </button>
        </div>

        <div className="shrink-0 border-b border-slate-700 px-5 pt-2 sm:px-7 lg:px-10">
          <div className="flex gap-2" role="tablist" aria-label="Uppgiftsinformation">
            <button
              id="task-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'task'}
              aria-controls="task-panel"
              onClick={() => setActiveTab('task')}
              className={`flex items-center gap-3 rounded-t-lg border-b-4 px-5 py-3 text-[clamp(1.15rem,1.4vw,1.65rem)] font-bold transition-colors lg:px-7 ${
                activeTab === 'task'
                  ? 'border-blue-400 bg-blue-400/10 text-white'
                  : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ClipboardList className="h-6 w-6 lg:h-7 lg:w-7" />
              Uppgift
            </button>
            <button
              id="learning-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'learning'}
              aria-controls="learning-panel"
              onClick={() => setActiveTab('learning')}
              className={`flex items-center gap-3 rounded-t-lg border-b-4 px-5 py-3 text-[clamp(1.15rem,1.4vw,1.65rem)] font-bold transition-colors lg:px-7 ${
                activeTab === 'learning'
                  ? 'border-yellow-300 bg-yellow-300/10 text-white'
                  : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Target className="h-6 w-6 lg:h-7 lg:w-7" />
              Lärandemål
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7 lg:p-10">
          {activeTab === 'task' ? (
            <div
              id="task-panel"
              role="tabpanel"
              aria-labelledby="task-tab"
              className="grid min-h-full gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.85fr)] xl:gap-8"
            >
              <section className="rounded-2xl border border-blue-400/30 bg-blue-400/[0.06] p-5 sm:p-7 lg:p-8">
                <h3 className="mb-5 flex items-center gap-3 text-lg font-black uppercase tracking-wide text-blue-200 lg:text-xl">
                  <ClipboardList className="h-6 w-6" />
                  Gör så här
                </h3>
                <ol className="space-y-5 lg:space-y-6">
                  {tile.presentationSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4 lg:gap-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-black text-white lg:h-14 lg:w-14 lg:text-2xl">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-[clamp(2rem,2.4vw,3rem)] font-semibold leading-[1.16] text-white">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="grid content-start gap-6">
                <section className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-5 sm:p-6 lg:p-7">
                  <h3 className="mb-3 flex items-center gap-3 text-lg font-black uppercase tracking-wide text-emerald-200 lg:text-xl">
                    <CheckCircle2 className="h-6 w-6" />
                    Ni ska visa
                  </h3>
                  <p className="text-[clamp(1.35rem,1.55vw,2rem)] font-semibold leading-snug text-white">
                    {tile.expectedResult}
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-600 bg-slate-950/80 p-5 sm:p-6 lg:p-7">
                  <h3 className="mb-3 flex items-center gap-3 text-lg font-black uppercase tracking-wide text-slate-200 lg:text-xl">
                    <FileText className="h-6 w-6" />
                    Källa
                  </h3>
                  <p className="text-[clamp(1.3rem,1.45vw,1.9rem)] font-medium leading-snug text-slate-50">
                    {tile.sourceInstruction}
                  </p>
                </section>
              </div>
            </div>
          ) : (
            <div id="learning-panel" role="tabpanel" aria-labelledby="learning-tab" className="grid min-h-full content-start gap-7">
              <section className="rounded-2xl border border-yellow-300/40 bg-yellow-300/10 p-6 sm:p-8 lg:p-10">
                <h3 className="mb-4 flex items-center gap-3 text-lg font-black uppercase tracking-wide text-yellow-200 lg:text-xl">
                  <Target className="h-6 w-6" />
                  Lärandemål
                </h3>
                <p className="text-[clamp(2rem,2.7vw,3.5rem)] font-semibold leading-[1.16] text-white">{tile.learningGoal}</p>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-black uppercase tracking-wide text-slate-200 lg:text-xl">Muntlig reflektion</h3>
                <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
                  {tile.verbalPresentationPrompt.map((prompt, index) => (
                    <li key={prompt} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-5 text-[clamp(1.35rem,1.65vw,2.15rem)] font-medium leading-snug text-white lg:p-6">
                      <span className="text-yellow-300">{index + 1}.</span>
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
