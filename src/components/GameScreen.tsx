import { useState, useEffect, useCallback, useRef } from 'react';
import { GameConfig, Tile, RoundPhase } from '../types';
import { TILES } from '../data/tiles';
import GameBoard from './GameBoard';
import TopBar from './TopBar';
import RoundFlow from './RoundFlow';
import TileModal from './TileModal';
import PresentationScreen from './PresentationScreen';
import TileRevealAnimation from './TileRevealAnimation';

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

export default function GameScreen({ config, onResetGame }: GameScreenProps) {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fall through
      }
    }
    return {
      currentScore: 0,
      roundCount: 0,
      tiles: TILES.map((t) => ({ ...t })),
      currentActiveTileId: null,
      lastPresenterIndex: null,
      history: [],
    };
  });

  const [roundState, setRoundState] = useState<RoundState>({
    phase: 'selecting_tile',
    activeTileId: null,
    presenterIndex: null,
    timerRunning: false,
    timeRemaining: config.timerMinutes * 60,
  });

  const [selectedTileForModal, setSelectedTileForModal] = useState<number | null>(null);
  const [showPresentationScreen, setShowPresentationScreen] = useState(false);
  const [goalReached, setGoalReached] = useState(false);
  const [revealAnimation, setRevealAnimation] = useState<{ targetTile: Tile } | null>(null);
  const [lastPointsAdded, setLastPointsAdded] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const persistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use refs for values needed in callbacks to avoid stale closures
  const roundStateRef = useRef(roundState);
  roundStateRef.current = roundState;

  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Persist progress (debounced)
  useEffect(() => {
    if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    persistTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('gameProgress', JSON.stringify(progress));
    }, 300);
    return () => {
      if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    };
  }, [progress]);

  // Timer logic
  useEffect(() => {
    if (roundState.timerRunning && roundState.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setRoundState((prev) => {
          if (prev.timeRemaining <= 1) {
            return { ...prev, timeRemaining: 0, timerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [roundState.timerRunning]);

  // Auto-transition when timer hits 0
  useEffect(() => {
    if (roundState.phase === 'working' && roundState.timeRemaining === 0 && !roundState.timerRunning) {
      setRoundState((prev) => ({
        ...prev,
        phase: 'presenting',
        timerRunning: false,
      }));
    }
  }, [roundState.phase, roundState.timeRemaining, roundState.timerRunning]);

  // Clear modal on phase change
  useEffect(() => {
    setSelectedTileForModal(null);
  }, [roundState.phase]);

  const selectTile = useCallback(
    (tileId: number) => {
      const tile = progressRef.current.tiles.find((t) => t.id === tileId);
      if (!tile) return;

      const currentPhase = roundStateRef.current.phase;

      if (currentPhase === 'selecting_tile' || currentPhase === 'choosing_next_tile') {
        if (tile.status === 'unplayed') {
          setProgress((prev) => ({
            ...prev,
            tiles: prev.tiles.map((t) =>
              t.id === tileId ? { ...t, status: 'active' } : t
            ),
            currentActiveTileId: tileId,
          }));
          setRoundState({
            phase: 'working',
            activeTileId: tileId,
            presenterIndex: null,
            timerRunning: false,
            timeRemaining: config.timerMinutes * 60,
          });
        }
      } else {
        setSelectedTileForModal(tileId);
      }
    },
    [config.timerMinutes]
  );

  const selectRandomStartTile = useCallback(() => {
    const unplayedTiles = progressRef.current.tiles.filter((t) => t.status === 'unplayed');
    if (unplayedTiles.length > 0) {
      const randomTile = unplayedTiles[Math.floor(Math.random() * unplayedTiles.length)];
      setRevealAnimation({ targetTile: randomTile });
    }
  }, []);

  const handleRevealAnimationComplete = useCallback(() => {
    if (revealAnimation) {
      selectTile(revealAnimation.targetTile.id);
      setRevealAnimation(null);
    }
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
      let attempts = 0;
      while (selectedIndex === lastPresenter && attempts < 50) {
        selectedIndex = Math.floor(Math.random() * config.numPairs);
        attempts++;
      }
    }
    setRoundState((prev) => ({
      ...prev,
      presenterIndex: selectedIndex,
      phase: 'presenting',
    }));
  }, [config.numPairs, config.avoidRepeatingPresenter]);

  const showPresentation = useCallback(() => {
    setShowPresentationScreen(true);
  }, []);

  const finishPresentation = useCallback(() => {
    setShowPresentationScreen(false);
    setRoundState((prev) => ({
      ...prev,
      phase: 'choosing_next_tile',
    }));
  }, []);

  const markTileComplete = useCallback(() => {
    const currentRoundState = roundStateRef.current;
    const currentProgress = progressRef.current;
    const activeTileId = currentRoundState.activeTileId;
    if (activeTileId === null) return;

    const tile = currentProgress.tiles.find((t) => t.id === activeTileId);
    if (!tile) return;

    const newScore = currentProgress.currentScore + tile.points;
    const newRoundCount = currentProgress.roundCount + 1;
    const presenterIndex = currentRoundState.presenterIndex;
    setLastPointsAdded(tile.points);

    setProgress((prev) => ({
      ...prev,
      currentScore: newScore,
      roundCount: newRoundCount,
      tiles: prev.tiles.map((t) =>
        t.id === activeTileId ? { ...t, status: 'completed' } : t
      ),
      currentActiveTileId: null,
      lastPresenterIndex: presenterIndex,
      history: [
        ...prev.history,
        { tileId: activeTileId, points: tile.points, presenterIndex },
      ],
    }));

    if (newScore >= config.targetScore) {
      setGoalReached(true);
      setRoundState((prev) => ({
        ...prev,
        phase: 'selecting_tile',
        activeTileId: null,
        timerRunning: false,
        timeRemaining: config.timerMinutes * 60,
      }));
    } else {
      setRoundState((prev) => ({
        ...prev,
        phase: 'selecting_tile',
        activeTileId: null,
        presenterIndex: null,
        timerRunning: false,
        timeRemaining: config.timerMinutes * 60,
      }));
    }
  }, [config.targetScore, config.timerMinutes]);

  const undoLastMove = useCallback(() => {
    const currentProgress = progressRef.current;
    if (currentProgress.history.length === 0) return;

    const lastMove = currentProgress.history[currentProgress.history.length - 1];
    setProgress((prev) => ({
      ...prev,
      currentScore: prev.currentScore - lastMove.points,
      roundCount: Math.max(0, prev.roundCount - 1),
      tiles: prev.tiles.map((t) =>
        t.id === lastMove.tileId ? { ...t, status: 'unplayed' } : t
      ),
      currentActiveTileId: null,
      lastPresenterIndex: prev.history.length > 1 ? prev.history[prev.history.length - 2].presenterIndex : null,
      history: prev.history.slice(0, -1),
    }));
    setGoalReached(false);
    setRoundState({
      phase: 'selecting_tile',
      activeTileId: null,
      presenterIndex: null,
      timerRunning: false,
      timeRemaining: config.timerMinutes * 60,
    });
  }, [config.timerMinutes]);

  const confirmReset = useCallback(() => {
    if (window.confirm('Är du säker på att du vill nollställa spelet? Denna åtgärd kan inte ångras.')) {
      onResetGame();
    }
  }, [onResetGame]);

  const activeTile = roundState.activeTileId
    ? progress.tiles.find((t) => t.id === roundState.activeTileId)
    : undefined;

  const unplayedTiles = progress.tiles.filter((t) => t.status === 'unplayed');
  const allTilesPlayed = unplayedTiles.length === 0 && !goalReached && progress.currentScore < config.targetScore;

  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-6">
      {/* Tile reveal animation overlay */}
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
          onFinish={finishPresentation}
        />
      )}

      {!showPresentationScreen && (
        <>
          {allTilesPlayed && (
            <div className="mb-6 bg-gradient-to-r from-red-900/80 to-red-800/80 border border-red-500/50 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-red-200 mb-2">Alla rutor spelade!</h2>
              <p className="text-red-300 mb-1">Poängmålet nåddes inte. Ni fick {progress.currentScore} av {config.targetScore} poäng.</p>
              <p className="text-sm text-red-400">Använd "Ångra" för att spela om rutor, eller "Nollställ" för att börja om.</p>
            </div>
          )}

          <TopBar
            currentScore={progress.currentScore}
            targetScore={config.targetScore}
            roundCount={progress.roundCount}
            lastPresenter={
              progress.lastPresenterIndex !== null
                ? config.pairNames[progress.lastPresenterIndex]
                : null
            }
            goalReached={goalReached}
            lastPointsAdded={lastPointsAdded}
          />

          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <GameBoard
                tiles={progress.tiles}
                onSelectTile={selectTile}
                activeTileId={roundState.activeTileId}
                roundPhase={roundState.phase}
              />
            </div>

            <div className="w-full lg:w-96 shrink-0">
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
              />
            </div>
          </div>
        </>
      )}

      {selectedTileForModal !== null && (
        <TileModal
          tile={progress.tiles.find((t) => t.id === selectedTileForModal)!}
          onSetActive={() => {
            const tile = progress.tiles.find((t) => t.id === selectedTileForModal);
            if (tile && tile.status === 'unplayed') {
              selectTile(selectedTileForModal);
            }
            setSelectedTileForModal(null);
          }}
          onMarkComplete={() => {
            if (selectedTileForModal === roundState.activeTileId) {
              markTileComplete();
            }
            setSelectedTileForModal(null);
          }}
          onClose={() => setSelectedTileForModal(null)}
          canMarkComplete={selectedTileForModal === roundState.activeTileId}
          canSetActive={
            progress.tiles.find((t) => t.id === selectedTileForModal)?.status === 'unplayed' &&
            (roundState.phase === 'selecting_tile' || roundState.phase === 'choosing_next_tile')
          }
        />
      )}
    </div>
  );
}
