import { useEffect, useState } from 'react';
import { ClipboardList, Target, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Uppgift: ${tile.title}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl border border-slate-600 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 border-b border-slate-700 p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{tile.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
              <span className={`rounded border px-2 py-1 ${TOPIC_STYLES[tile.topic].badge}`}>
                {TOPIC_LABELS[tile.topic]}
              </span>
              <span className="rounded border border-yellow-300/40 bg-yellow-300/10 px-2 py-1 text-yellow-100">
                {tile.points} poäng
              </span>
              <span className="rounded border border-slate-500/40 bg-slate-700 px-2 py-1 text-slate-100">
                {tile.toolFocus} · {tile.appFocus}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Stäng"
          >
            <X size={22} />
          </button>
        </div>

        <div className="border-b border-slate-700 px-6 pt-5 sm:px-8">
          <div className="flex gap-2" role="tablist" aria-label="Uppgiftsinformation">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'task'}
              onClick={() => setActiveTab('task')}
              className={`flex items-center gap-2 rounded-t-lg border-b-4 px-5 py-4 text-lg font-bold transition-colors sm:text-xl ${
                activeTab === 'task'
                  ? 'border-blue-400 bg-blue-400/10 text-white'
                  : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ClipboardList size={23} />
              Uppgift
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'learning'}
              onClick={() => setActiveTab('learning')}
              className={`flex items-center gap-2 rounded-t-lg border-b-4 px-5 py-4 text-lg font-bold transition-colors sm:text-xl ${
                activeTab === 'learning'
                  ? 'border-yellow-300 bg-yellow-300/10 text-white'
                  : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Target size={23} />
              Lärandemål
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          {activeTab === 'task' ? (
            <div role="tabpanel" className="space-y-8">
              <section>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-blue-300">Uppgift</h3>
                <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">{tile.task}</p>
              </section>

              <section className="rounded-xl border border-slate-700 bg-slate-950/70 p-6 sm:p-7">
                <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-slate-300">Avgränsa källan</h3>
                <p className="text-xl leading-relaxed text-slate-100 sm:text-2xl">{tile.sourceInstruction}</p>
              </section>
            </div>
          ) : (
            <div role="tabpanel" className="space-y-8">
              <section className="rounded-xl border border-yellow-300/30 bg-yellow-300/10 p-6 sm:p-8">
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-yellow-200">Lärandemål</h3>
                <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">{tile.learningGoal}</p>
              </section>

              <section>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-slate-300">Muntlig reflektion</h3>
                <ul className="space-y-4">
                  {tile.verbalPresentationPrompt.map((prompt) => (
                    <li key={prompt} className="rounded-xl bg-slate-800 p-5 text-xl leading-relaxed text-white sm:text-2xl">
                      {prompt}
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
