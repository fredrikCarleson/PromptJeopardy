import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Tile, TileStatus } from '../types';
import { CATEGORY_STYLES, CATEGORY_COLOR_MAP } from '../utils/categoryStyles';

interface TileModalProps {
  tile: Tile;
  onSetActive: () => void;
  onMarkComplete: () => void;
  onClose: () => void;
  canMarkComplete: boolean;
  canSetActive: boolean;
}

const getStatusLabel = (status: TileStatus): { text: string; className: string } => {
  switch (status) {
    case 'completed':
      return { text: 'Klar', className: 'bg-slate-600 text-slate-300' };
    case 'active':
      return { text: 'Aktiv', className: 'bg-amber-600 text-white' };
    case 'unplayed':
      return { text: 'Ospelad', className: 'bg-slate-600 text-slate-300' };
  }
};

export default function TileModal({
  tile,
  onSetActive,
  onMarkComplete,
  onClose,
  canMarkComplete,
  canSetActive,
}: TileModalProps) {
  const status = getStatusLabel(tile.status);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Uppgift: ${tile.title}`}>
      <div
        className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full border border-slate-600 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700 bg-slate-750">
          <h2 className="text-xl font-bold text-white">Uppgiftsdetaljer</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-white leading-snug mb-2">{tile.title}</h3>
            <p className="text-sm text-slate-400">{CATEGORY_STYLES[tile.category].description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className={`px-3 py-1.5 rounded-md font-semibold text-sm ${CATEGORY_COLOR_MAP[tile.category]}`}>
              {tile.category}
            </div>
            <div className="px-3 py-1.5 rounded-md font-semibold text-sm bg-amber-600 text-white">
              {tile.points} poäng
            </div>
            <div className={`px-3 py-1.5 rounded-md font-semibold text-sm ${status.className}`}>
              {status.text}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onSetActive}
              disabled={!canSetActive}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              Sätt som aktiv ruta
            </button>
            <button
              onClick={onMarkComplete}
              disabled={!canMarkComplete}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              Markera klar
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
