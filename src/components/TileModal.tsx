import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Tile } from '../types';
import { TOPIC_LABELS } from '../data/tiles';
import { TOPIC_STYLES } from '../utils/categoryStyles';

interface TileModalProps {
  tile: Tile;
  onClose: () => void;
}

export default function TileModal({ tile, onClose }: TileModalProps) {
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
        className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-slate-600 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          <div>
            <h2 className="text-xl font-bold text-white">{tile.title}</h2>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
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

        <div className="space-y-5 p-6">
          <section>
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-400">Uppgift</h3>
            <p className="text-base leading-relaxed text-slate-100">{tile.task}</p>
          </section>

          <section className="rounded-md border border-slate-700 bg-slate-950/60 p-4">
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-400">Avgränsa källan</h3>
            <p className="text-sm leading-relaxed text-slate-200">{tile.sourceInstruction}</p>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-400">Lärandemål</h3>
            <p className="text-sm leading-relaxed text-slate-200">{tile.learningGoal}</p>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-400">Muntlig reflektion</h3>
            <ul className="space-y-2">
              {tile.verbalPresentationPrompt.map((prompt) => (
                <li key={prompt} className="rounded-md bg-slate-800 p-3 text-sm text-slate-100">
                  {prompt}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
