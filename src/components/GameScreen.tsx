import { useCallback, useEffect, useRef, useState } from 'react';
import { GameConfig, RoundPhase, Tile } from '../types';
import { TILES } from '../data/tiles';
import GameBoard from './GameBoard';
import PresentationScreen from './PresentationScreen';
import RoundFlow from './RoundFlow';
import TileModal from './TileModal';
import TileRevealAnimation from './TileRevealAnimation';
import TopBar from './TopBar';

interface GameProgress {
  currentScore: number;
  roundCount: number;
  tiles: Tile[];
  currentActiveTileId: number | null;
  lastPresenterIndex: number | null;
  history: Array<{ tileId: number; points: number; presenterIndex: number | null }>;
}

interface RoundState {
  phase: RoundPhase;
  activeTileId: number | null;
  presenterIndex: number | null;
  timerRunning: boolean;
  timeRemaining: number;
}

interface GameScreenProps {
  config: GameConfig;
  onResetGame: () => void;
}

const createInitialProgress = (): GameProgress => ({
  currentScore: 0,
  roundCount: 0,
  tiles: TILES.map((tile) => ({ ...tile })),
  currentActiveTileId: null,
  lastPresenterIndex: null,
  history: [],
});

const isSavedProgressCompatible = (value: unknown): value is GameProgress => {
  if (!value || typeof value !== 'object') return false;
  const progress = value as Partial<GameProgress>;
  return Array.isArray(progress.tiles) && progress.tiles.every((tile) => 'topic' in tile && 'task' in tile);
};

export default function GameScreen({ config, onResetGame }: GameScreenProps) {
  const timerMinutes = config.timerMinutes || 7;
  const presentationSeconds = config.presentationSeconds || 90;

  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isSavedProgressCompatible(parsed)) return parsed;
      } catch {
        // Ignore incompatible saved sessions from older versions.
      }
    }
    return createInitialProgress();
  });

  const [roundState, setRoundState] = useState<RoundState>({
    phase: 'selecting_tile',
    activeTileId: null,
    presenterIndex: null,
    timerRunning: false,
    timeRemaining: timerMinutes * 60,
  });

  const [selectedTileForModal, setSelectedTileForModal] = useState<number | null>(null);
  const [showPresentationScreen, setShowPresentationScreen] = useState(false);
  const [goalReached, setGoalReached] = useState(progress.currentScore >= config.targetScore);
  const [revealAnimation, setRevealAnimation] = useState<{ targetTile: Tile } | null>(null);
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const persistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roundStateRef = useRef(roundState);
  roundStateRef.current = roundState;

  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    persistTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('gameProgress', JSON.stringify(progress));
    }, 300);
    return () => {
      if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    };
  }, [progress]);

  useEffect(() => {
    setGoalReached(progress.currentScore >= config.targetScore);
  }, [config.targetScore, progress.currentScore]);

  useEffect(() => {
    if (!roundState.timerRunning) return;

    const timer = setInterval(() => {
      setRoundState((prev) => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, timeRemaining: 0, timerRunning: false };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [roundState.timerRunning]);

  useEffect(() => {
    if (roundState.phase === 'working' && roundState.timeRemaining === 0 && !roundState.timerRunning) {
      setRoundState((prev) => ({
        ...prev,
        phase: 'presenting',
        timerRunning: false,
      }));
    }
  }, [roundState.phase, roundState.timeRemaining, roundState.timerRunning]);

  useEffect(() => {
    setSelectedTileForModal(null);
  }, [roundState.phase]);

  const selectTile = useCallback(
    (tileId: number, source: 'manual' | 'random' = 'manual') => {
      const tile = progressRef.current.tiles.find((candidate) => candidate.id === tileId);
      if (!tile) return;

      const currentPhase = roundStateRef.current.phase;
      const isFirstRound = progressRef.current.roundCount === 0 && progressRef.current.history.length === 0;

      if (currentPhase === 'selecting_tile') {
        if (isFirstRound && source !== 'random') return;
        if (tile.status !== 'unplayed') return;

        setProgress((prev) => ({
          ...prev,
          tiles: prev.tiles.map((candidate) =>
            candidate.id === tileId ? { ...candidate, status: 'active' } : candidate
          ),
          currentActiveTileId: tileId,
        }));
        setRoundState({
          phase: 'working',
          activeTileId: tileId,
          presenterIndex: null,
          timerRunning: false,
          timeRemaining: timerMinutes * 60,
        });
        return;
      }

      if (tile.id === roundStateRef.current.activeTileId) {
        setSelectedTileForModal(tileId);
      }
    },
    [timerMinutes]
  );

  const selectRandomStartTile = useCallback(() => {
    const unplayedTiles = progressRef.current.tiles.filter((tile) => tile.status === 'unplayed');
    if (unplayedTiles.length === 0) return;

    const randomTile = unplayedTiles[Math.floor(Math.random() * unplayedTiles.length)];
    setRevealAnimation({ targetTile: randomTile });
  }, []);

  const handleRevealAnimationComplete = useCallback(() => {
    if (!revealAnimation) return;
    selectTile(revealAnimation.targetTile.id, 'random');
    setRevealAnimation(null);
  }, [revealAnimation, selectTile]);

  const startTimer = useCallback(() => {
    setRoundState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  }, []);

  const goToPresenting = useCallback(() => {
    setRoundState((prev) => ({
      ...prev,
      phase: 'presenting',
      timerRunning: false,
    }));
  }, []);

  const selectRandomPresenter = useCallback(() => {
    let selectedIndex = Math.floor(Math.random() * config.numPairs);
    const lastPresenter = progressRef.current.lastPresenterIndex;

    if (config.avoidRepeatingPresenter && config.numPairs > 1 && lastPresenter !== null) {
      while (selectedIndex === lastPresenter) {
        selectedIndex = Math.floor(Math.random() * config.numPairs);
      }
    }

    setRoundState((prev) => ({
      ...prev,
      presenterIndex: selectedIndex,
      phase: 'presenting',
    }));
  }, [config.avoidRepeatingPresenter, config.numPairs]);

  const showPresentation = useCallback(() => {
    setShowPresentationScreen(true);
  }, []);

  const finishPresentation = useCallback(() => {
    setShowPresentationScreen(false);
    setRoundState((prev) => ({
      ...prev,
      phase: 'choosing_next_tile',
      timerRunning: false,
    }));
  }, []);

  const markTileComplete = useCallback(() => {
    const currentRoundState = roundStateRef.current;
    const currentProgress = progressRef.current;
    const activeTileId = currentRoundState.activeTileId;
    if (activeTileId === null) return;

    const tile = currentProgress.tiles.find((candidate) => candidate.id === activeTileId);
    if (!tile) return;

    const newScore = currentProgress.currentScore + tile.points;
    const newRoundCount = currentProgress.roundCount + 1;
    const presenterIndex = currentRoundState.presenterIndex;
    setLastPointsAdded(tile.points);

    setProgress((prev) => ({
      ...prev,
      currentScore: newScore,
      roundCount: newRoundCount,
      tiles: prev.tiles.map((candidate) =>
        candidate.id === activeTileId ? { ...candidate, status: 'completed' } : candidate
      ),
      currentActiveTileId: null,
      lastPresenterIndex: presenterIndex,
      history: [...prev.history, { tileId: activeTileId, points: tile.points, presenterIndex }],
    }));

    setRoundState({
      phase: 'selecting_tile',
      activeTileId: null,
      presenterIndex,
      timerRunning: false,
      timeRemaining: timerMinutes * 60,
    });
  }, [timerMinutes]);

  const undoLastMove = useCallback(() => {
    const currentProgress = progressRef.current;
    if (currentProgress.history.length === 0) return;

    const lastMove = currentProgress.history[currentProgress.history.length - 1];
    setProgress((prev) => ({
      ...prev,
      currentScore: prev.currentScore - lastMove.points,
      roundCount: Math.max(0, prev.roundCount - 1),
      tiles: prev.tiles.map((tile) =>
        tile.id === lastMove.tileId ? { ...tile, status: 'unplayed' } : tile
      ),
      currentActiveTileId: null,
      lastPresenterIndex: prev.history.length > 1 ? prev.history[prev.history.length - 2].presenterIndex : null,
      history: prev.history.slice(0, -1),
    }));
    setLastPointsAdded(0);
    setRoundState({
      phase: 'selecting_tile',
      activeTileId: null,
      presenterIndex: null,
      timerRunning: false,
      timeRemaining: timerMinutes * 60,
    });
  }, [timerMinutes]);

  const confirmReset = useCallback(() => {
    if (window.confirm('Är du säker på att du vill nollställa spelet? Denna åtgärd kan inte ångras.')) {
      onResetGame();
    }
  }, [onResetGame]);

  const activeTile = roundState.activeTileId
    ? progress.tiles.find((tile) => tile.id === roundState.activeTileId)
    : undefined;

  const unplayedTiles = progress.tiles.filter((tile) => tile.status === 'unplayed');
  const completedCount = progress.tiles.filter((tile) => tile.status === 'completed').length;
  const allTilesPlayed = unplayedTiles.length === 0 && !goalReached && progress.currentScore < config.targetScore;
  const isFirstRound = progress.roundCount === 0 && progress.history.length === 0;

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white lg:p-6">
      {revealAnimation && (
        <TileRevealAnimation
          tiles={progress.tiles}
          targetTile={revealAnimation.targetTile}
          onComplete={handleRevealAnimationComplete}
        />
      )}

      {showPresentationScreen && roundState.presenterIndex !== null && (
        <PresentationScreen
          pairName={config.pairNames[roundState.presenterIndex]}
          activeTile={activeTile}
          durationSeconds={presentationSeconds}
          onFinish={finishPresentation}
        />
      )}

      {!showPresentationScreen && (
        <>
          {allTilesPlayed && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-950/80 p-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-red-100">Alla rutor spelade</h2>
              <p className="text-red-200">
                Gruppen fick {progress.currentScore} av {config.targetScore} poäng.
              </p>
            </div>
          )}

          <TopBar
            currentScore={progress.currentScore}
            targetScore={config.targetScore}
            roundCount={progress.roundCount}
            completedCount={completedCount}
            totalTiles={progress.tiles.length}
            lastPresenter={
              progress.lastPresenterIndex !== null
                ? config.pairNames[progress.lastPresenterIndex]
                : null
            }
            goalReached={goalReached}
            lastPointsAdded={lastPointsAdded}
          />

          <div className="mt-6 flex flex-col gap-6 xl:flex-row">
            <div className="min-w-0 flex-1">
              <GameBoard
                tiles={progress.tiles}
                onSelectTile={selectTile}
                activeTileId={roundState.activeTileId}
                roundPhase={roundState.phase}
                manualSelectionEnabled={!isFirstRound}
              />
            </div>

            <div className="w-full xl:w-[27rem] xl:shrink-0">
              <RoundFlow
                roundPhase={roundState.phase}
                timerRunning={roundState.timerRunning}
                timeRemaining={roundState.timeRemaining}
                onSelectRandomTile={selectRandomStartTile}
                onStartTimer={startTimer}
                onGoToPresenting={goToPresenting}
                onSelectRandomPresenter={selectRandomPresenter}
                onShowPresentation={showPresentation}
                onMarkComplete={markTileComplete}
                onUndo={undoLastMove}
                onReset={confirmReset}
                canMarkComplete={roundState.activeTileId !== null}
                presenterName={
                  roundState.presenterIndex !== null
                    ? config.pairNames[roundState.presenterIndex]
                    : null
                }
                activeTile={activeTile}
                isFirstRound={isFirstRound}
              />
            </div>
          </div>
        </>
      )}

      {selectedTileForModal !== null && (
        <TileModal
          tile={progress.tiles.find((tile) => tile.id === selectedTileForModal)!}
          onClose={() => setSelectedTileForModal(null)}
        />
      )}
    </div>
  );
}
