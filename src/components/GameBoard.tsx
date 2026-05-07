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
          relative rounded-lg p-3 lg:p-4 text-left border transition-all
          ${getCategoryStyles(tile.category, isCompleted, isActive)}
          ${isClickable ? 'cursor-pointer active:scale-95' : ''}
          ${isCompleted && !isActive ? 'cursor-default' : ''}
          ${!isClickable && !isCompleted ? 'cursor-pointer' : ''}
        `}
      >
        {/* Points display - top */}
        <div className={`text-3xl lg:text-4xl font-bold text-right mb-3 ${
          isCompleted ? 'text-slate-500' : isActive ? 'text-yellow-300' : 'text-white'
        }`}>
          {tile.points}
        </div>

        {/* Title - main content, centered vertically */}
        <div className={`text-sm lg:text-base xl:text-lg leading-snug font-semibold min-h-12 lg:min-h-16 flex items-center justify-center text-center ${
          isCompleted ? 'text-slate-500 line-through' : isActive ? 'text-white' : 'text-white/90'
        }`} style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {tile.title}
        </div>

        {/* Status indicator - bottom right */}
        {isCompleted && (
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Active pulse - bottom left */}
        {isActive && (
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 lg:p-6 border border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Spelbräde</h2>
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
      <div className="grid grid-cols-3 gap-3 lg:gap-4 auto-rows-max">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-3 lg:gap-4">
            {/* Category header */}
            <div className={`px-4 py-3 rounded-lg text-center font-bold text-white text-sm lg:text-base ${
              category === 'Grund' ? 'bg-emerald-600/40' :
              category === 'Fördjupning' ? 'bg-blue-600/40' :
              'bg-violet-600/40'
            }`}>
              {category}
            </div>

            {/* Tiles in this category, sorted by points */}
            <div className="flex flex-col gap-3 lg:gap-4">
              {getTilesByCategory(category).map((tile) => (
                <div key={tile.id} className="h-32 lg:h-40">
                  <TileButton tile={tile} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
