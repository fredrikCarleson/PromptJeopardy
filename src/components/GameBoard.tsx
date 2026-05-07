import { Tile, RoundPhase } from '../types';

interface GameBoardProps {
  tiles: Tile[];
  onSelectTile: (tileId: number) => void;
  activeTileId: number | null;
  roundPhase: RoundPhase;
}

const getCategoryStyles = (category: string, isCompleted: boolean, isActive: boolean): string => {
  if (isCompleted) return 'bg-slate-700/40 border-slate-600/30';
  if (isActive) return 'border-yellow-400 ring-2 ring-yellow-400/50';

  switch (category) {
    case 'Grund':
      return 'bg-emerald-600/80 border-emerald-500/50 hover:bg-emerald-500/80 hover:border-emerald-400';
    case 'Fördjupning':
      return 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-500/80 hover:border-blue-400';
    case 'Skapa nytt':
      return 'bg-violet-600/80 border-violet-500/50 hover:bg-violet-500/80 hover:border-violet-400';
    default:
      return 'bg-slate-600/80 border-slate-500/50';
  }
};

const getCategoryBadge = (category: string): { text: string; className: string } => {
  switch (category) {
    case 'Grund':
      return { text: 'G', className: 'bg-emerald-400/20 text-emerald-300' };
    case 'Fördjupning':
      return { text: 'F', className: 'bg-blue-400/20 text-blue-300' };
    case 'Skapa nytt':
      return { text: 'S', className: 'bg-violet-400/20 text-violet-300' };
    default:
      return { text: '', className: '' };
  }
};

export default function GameBoard({ tiles, onSelectTile, activeTileId, roundPhase }: GameBoardProps) {
  const canSelect = roundPhase === 'selecting_tile' || roundPhase === 'choosing_next_tile';

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 lg:p-5 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Spelbräde</h2>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" /> Grund
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500" /> Fördjupning
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-violet-500" /> Skapa nytt
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 lg:gap-3">
        {tiles.map((tile) => {
          const isCompleted = tile.status === 'completed';
          const isActive = tile.id === activeTileId;
          const isClickable = canSelect && tile.status === 'unplayed';
          const badge = getCategoryBadge(tile.category);

          return (
            <button
              key={tile.id}
              onClick={() => onSelectTile(tile.id)}
              disabled={isCompleted && !isActive}
              className={`
                relative rounded-lg p-2.5 lg:p-3 text-left border transition-all
                ${getCategoryStyles(tile.category, isCompleted, isActive)}
                ${isClickable ? 'cursor-pointer active:scale-95' : ''}
                ${isCompleted && !isActive ? 'cursor-default' : ''}
                ${!isClickable && !isCompleted ? 'cursor-pointer' : ''}
              `}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.className}`}>
                  {badge.text}
                </span>
                <span className={`text-lg lg:text-xl font-bold ${
                  isCompleted ? 'text-slate-500' : isActive ? 'text-yellow-300' : 'text-white/90'
                }`}>
                  {tile.points}
                </span>
              </div>

              {/* Title */}
              <div className={`text-xs lg:text-sm leading-tight font-medium ${
                isCompleted ? 'text-slate-500 line-through' : isActive ? 'text-white' : 'text-white/80'
              }`} style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {tile.title}
              </div>

              {/* Status indicator */}
              {isCompleted && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-slate-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Active pulse */}
              {isActive && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
