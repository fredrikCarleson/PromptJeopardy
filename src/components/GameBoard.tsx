import { CheckCircle, MousePointerClick } from 'lucide-react';
import { PointValue, RoundPhase, Tile } from '../types';
import { TOPIC_LABELS, TOPICS } from '../data/tiles';
import { TOPIC_STYLES } from '../utils/categoryStyles';

interface GameBoardProps {
  tiles: Tile[];
  onSelectTile: (tileId: number) => void;
  activeTileId: number | null;
  roundPhase: RoundPhase;
  manualSelectionEnabled: boolean;
  mode: 'guided_workshop' | 'open_board';
}

const POINT_ROWS: PointValue[] = [100, 200, 300, 400, 500];

export default function GameBoard({
  tiles,
  onSelectTile,
  activeTileId,
  roundPhase,
  manualSelectionEnabled,
  mode,
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
          'relative flex min-h-[clamp(60px,8.7vh,108px)] w-full flex-col items-center justify-center rounded-lg border-2 p-2 text-center shadow-lg transition-all',
          isActive ? `${styles.active} ring-4` : '',
          isCompleted ? `${styles.completed}` : '',
          !isActive && !isCompleted ? `${styles.tile}` : '',
          isSelectable ? 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0' : 'cursor-default',
          !isSelectable && !canOpenActive ? 'disabled:opacity-100' : '',
        ].join(' ')}
      >
        {isCompleted ? (
          <>
            <CheckCircle className="absolute right-2 top-2 h-5 w-5 opacity-90" />
            <span className="line-clamp-3 text-[clamp(0.95rem,1.05vw,1.2rem)] font-bold leading-tight">{tile.shortLabel}</span>
            <span className="mt-1 text-sm font-bold opacity-80 lg:text-base">{tile.points}</span>
          </>
        ) : isActive ? (
          <>
            <span className="text-sm font-black uppercase tracking-wide lg:text-base">Vald ruta</span>
            <span className="mt-1 line-clamp-2 text-[clamp(1rem,1.25vw,1.45rem)] font-black leading-tight">{tile.shortLabel}</span>
          </>
        ) : (
          <span className="text-[clamp(2rem,3.2vw,3.75rem)] font-black tracking-normal text-yellow-100 drop-shadow">
            {tile.points}
          </span>
        )}
      </button>
    );
  };

  return (
    <section className="rounded-xl border border-blue-500/50 bg-blue-950/60 p-2.5 shadow-2xl shadow-black/30 sm:p-3">
      <div className="mb-2.5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[clamp(1.65rem,2vw,2.5rem)] font-black uppercase tracking-normal text-yellow-100">Prompt-Jeopardy</h2>
          <p className="text-base text-blue-100/90 lg:text-lg">
            Välj poängruta. Uppgiften är dold tills rutan väljs.
          </p>
        </div>
        {manualSelectionEnabled ? (
          <div className="flex items-center gap-2 rounded-md border border-violet-400/60 bg-violet-500/15 px-3 py-1.5 text-base font-semibold text-violet-50">
            <MousePointerClick size={20} />
            Paret kan välja – klicka på en ledig ruta
          </div>
        ) : (
          <div className="rounded-md border border-yellow-300/50 bg-yellow-300/10 px-3 py-1.5 text-base font-semibold text-yellow-100">
            {mode === 'guided_workshop' ? 'Starta från facilitatorpanelen' : 'Första rutan slumpas'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {TOPICS.map((topic) => (
          <div
            key={topic}
            className={`flex min-h-[clamp(44px,6vh,72px)] items-center justify-center rounded-lg border px-2 py-2 text-center text-[clamp(1rem,1.15vw,1.35rem)] font-black uppercase leading-tight tracking-normal ${TOPIC_STYLES[topic].header}`}
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
