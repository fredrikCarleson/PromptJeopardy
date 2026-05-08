import { CheckCircle } from 'lucide-react';
import { PointValue, RoundPhase, Tile } from '../types';
import { TOPIC_LABELS, TOPICS } from '../data/tiles';
import { TOPIC_STYLES } from '../utils/categoryStyles';

interface GameBoardProps {
  tiles: Tile[];
  onSelectTile: (tileId: number) => void;
  activeTileId: number | null;
  roundPhase: RoundPhase;
  manualSelectionEnabled: boolean;
}

const POINT_ROWS: PointValue[] = [100, 200, 300, 400, 500];

export default function GameBoard({
  tiles,
  onSelectTile,
  activeTileId,
  roundPhase,
  manualSelectionEnabled,
}: GameBoardProps) {
  const canSelect = roundPhase === 'selecting_tile' && manualSelectionEnabled;

  const getTile = (topic: Tile['topic'], points: PointValue) =>
    tiles.find((tile) => tile.topic === topic && tile.points === points);

  const TileButton = ({ tile }: { tile: Tile }) => {
    const isCompleted = tile.status === 'completed';
    const isActive = tile.id === activeTileId;
    const isSelectable = canSelect && tile.status === 'unplayed';
    const canOpenActive = isActive && tile.status === 'active';
    const styles = TOPIC_STYLES[tile.topic];

    return (
      <button
        type="button"
        onClick={() => {
          if (isSelectable || canOpenActive) onSelectTile(tile.id);
        }}
        disabled={!isSelectable && !canOpenActive}
        aria-label={
          isCompleted
            ? `${TOPIC_LABELS[tile.topic]} ${tile.points} poäng, klar: ${tile.title}`
            : isActive
              ? `${TOPIC_LABELS[tile.topic]} ${tile.points} poäng, aktiv: ${tile.title}`
              : `${TOPIC_LABELS[tile.topic]} ${tile.points} poäng`
        }
        className={[
          'relative flex min-h-[92px] w-full flex-col items-center justify-center rounded-md border-2 p-2 text-center shadow-lg transition-all',
          isActive ? `${styles.active} ring-4` : '',
          isCompleted ? `${styles.completed}` : '',
          !isActive && !isCompleted ? `${styles.tile}` : '',
          isSelectable ? 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0' : 'cursor-default',
          !isSelectable && !canOpenActive ? 'disabled:opacity-100' : '',
        ].join(' ')}
      >
        {isCompleted ? (
          <>
            <CheckCircle className="absolute right-2 top-2 h-4 w-4 opacity-80" />
            <span className="line-clamp-3 text-xs font-semibold leading-tight">{tile.shortLabel}</span>
            <span className="mt-1 text-[11px] font-bold opacity-70">{tile.points}</span>
          </>
        ) : isActive ? (
          <>
            <span className="text-[11px] font-black uppercase tracking-wider">Vald ruta</span>
            <span className="mt-1 line-clamp-2 text-sm font-bold leading-tight">{tile.shortLabel}</span>
          </>
        ) : (
          <span className="text-3xl font-black tracking-normal text-yellow-100 drop-shadow sm:text-4xl">
            {tile.points}
          </span>
        )}
      </button>
    );
  };

  return (
    <section className="rounded-lg border border-blue-500/40 bg-blue-950/60 p-3 shadow-2xl shadow-black/30">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-normal text-yellow-100">Prompt-Jeopardy</h2>
          <p className="text-sm text-blue-100/80">
            Välj poängruta. Uppgiften är dold tills rutan väljs.
          </p>
        </div>
        {!manualSelectionEnabled && (
          <div className="rounded-md border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-sm font-semibold text-yellow-100">
            Första rutan slumpas
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {TOPICS.map((topic) => (
          <div
            key={topic}
            className={`flex min-h-[58px] items-center justify-center rounded-md border px-2 py-3 text-center text-xs font-black uppercase leading-tight tracking-normal sm:text-sm ${TOPIC_STYLES[topic].header}`}
          >
            {TOPIC_LABELS[topic]}
          </div>
        ))}

        {POINT_ROWS.map((points) =>
          TOPICS.map((topic) => {
            const tile = getTile(topic, points);
            return tile ? <TileButton key={tile.id} tile={tile} /> : <div key={`${topic}-${points}`} />;
          })
        )}
      </div>
    </section>
  );
}
