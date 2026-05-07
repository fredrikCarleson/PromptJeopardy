import { Tile, RoundPhase, TileCategory } from '../types';
import { CATEGORY_STYLES } from '../utils/categoryStyles';

interface GameBoardProps {
  tiles: Tile[];
  onSelectTile: (tileId: number) => void;
  activeTileId: number | null;
  roundPhase: RoundPhase;
}

export default function GameBoard({ tiles, onSelectTile, activeTileId, roundPhase }: GameBoardProps) {
  const canSelect = roundPhase === 'selecting_tile' || roundPhase === 'choosing_next_tile';

  const categories: TileCategory[] = ['Grund', 'Fördjupning', 'Skapa nytt'];

  const getTilesByCategory = (category: TileCategory) => {
    return tiles
      .filter((t) => t.category === category)
      .sort((a, b) => a.points - b.points);
  };

  const getCategoryStyles = (category: TileCategory, isCompleted: boolean, isActive: boolean): string => {
    if (isCompleted) return 'bg-slate-700/40 border-slate-600/30';
    if (isActive) return 'border-yellow-400 ring-2 ring-yellow-400/50';

    const styles = CATEGORY_STYLES[category];
    return styles.bgHover;
  };

  const TileButton = ({ tile }: { tile: Tile }) => {
    const isCompleted = tile.status === 'completed';
    const isActive = tile.id === activeTileId;
    const isClickable = canSelect && tile.status === 'unplayed';

    return (
      <button
        onClick={() => onSelectTile(tile.id)}
        disabled={isCompleted && !isActive}
        className={`
          relative rounded-lg border transition-all w-full
          ${getCategoryStyles(tile.category, isCompleted, isActive)}
          ${isClickable ? 'cursor-pointer active:scale-95' : ''}
          ${isCompleted && !isActive ? 'cursor-default' : ''}
          ${!isClickable && !isCompleted ? 'cursor-pointer' : ''}
        `}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          aspectRatio: '1 / 1.1',
        }}
      >
        {/* Show only points by default, show text when active/completed */}
        {isActive || isCompleted ? (
          <>
            {/* Title - when active/completed */}
            <div className={`px-3 py-2 text-center leading-snug font-semibold flex items-center justify-center h-full ${
              isCompleted ? 'text-slate-500 line-through' : 'text-white'
            }`} style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
            }}>
              {tile.title}
            </div>
          </>
        ) : (
          <>
            {/* Points only - default state */}
            <div className={`text-4xl font-bold text-center ${
              isCompleted ? 'text-slate-500' : isActive ? 'text-yellow-300' : 'text-white'
            }`} style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}>
              {tile.points}
            </div>
          </>
        )}

        {/* Status indicator - bottom right */}
        {isCompleted && (
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Active pulse - bottom left */}
        {isActive && (
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse flex-shrink-0" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Spelbräde</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-emerald-500" /> Grund
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-blue-500" /> Fördjupning
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-violet-500" /> Skapa nytt
          </span>
        </div>
      </div>

      {/* Jeopardy-style grid: 3 columns (one per category) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
      }}>
        {categories.map((category) => (
          <div key={category} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {/* Category header */}
            <div className={`px-4 py-2 rounded-lg text-center font-bold text-white text-sm ${
              category === 'Grund' ? 'bg-emerald-600/40' :
              category === 'Fördjupning' ? 'bg-blue-600/40' :
              'bg-violet-600/40'
            }`}>
              {category}
            </div>

            {/* Tiles in this category, sorted by points */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              flex: 1,
            }}>
              {getTilesByCategory(category).map((tile) => (
                <TileButton key={tile.id} tile={tile} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
