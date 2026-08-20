import { useCallback, useEffect, useRef, useState } from 'react';
import { GameConfig, RoundPhase, Tile, TileStatus } from '../types';
import { TILES } from '../data/tiles';
import GameBoard from './GameBoard';
import PresentationScreen from './PresentationScreen';
import RoundFlow from './RoundFlow';
import TileModal from './TileModal';
import TileRevealAnimation from './TileRevealAnimation';
import TopBar from './TopBar';
import SpecialMomentScreen from './SpecialMomentScreen';
import { SPECIAL_MOMENTS, SpecialMoment, SpecialMomentId } from '../data/specialMoments';
import {
  playGoalFanfare,
  playPresenterReveal,
  playScoreChime,
  playTileReveal,
  playTimerWarning,
  unlockAudio,
} from '../utils/soundEffects';

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

interface StoredGameProgress {
  currentScore: number;
  roundCount: number;
  tileStatuses: Record<number, TileStatus>;
  currentActiveTileId: number | null;
  lastPresenterIndex: number | null;
  history: Array<{ tileId: number; points: number; presenterIndex: number | null }>;
  roundState?: Omit<RoundState, 'timerRunning'>;
  completedSpecialMomentIds?: SpecialMomentId[];
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

const createInitialRoundState = (timerMinutes: number): RoundState => ({
  phase: 'selecting_tile',
  activeTileId: null,
  presenterIndex: null,
  timerRunning: false,
  timeRemaining: timerMinutes * 60,
});

const createTilesWithStatuses = (tileStatuses: Record<number, TileStatus> | undefined) =>
  TILES.map((tile) => ({
    ...tile,
    status: tileStatuses?.[tile.id] ?? 'unplayed',
  }));

const isStoredProgressCompatible = (value: unknown): value is StoredGameProgress => {
  if (!value || typeof value !== 'object') return false;
  const progress = value as Partial<StoredGameProgress>;
  return (
    typeof progress.currentScore === 'number' &&
    typeof progress.roundCount === 'number' &&
    !!progress.tileStatuses &&
    typeof progress.tileStatuses === 'object' &&
    Array.isArray(progress.history)
  );
};

const isLegacyProgressCompatible = (value: unknown): value is GameProgress => {
  if (!value || typeof value !== 'object') return false;
  const progress = value as Partial<GameProgress>;
  return Array.isArray(progress.tiles) && progress.tiles.every((tile) => 'id' in tile && 'status' in tile);
};

const loadInitialSession = (timerMinutes: number): { progress: GameProgress; roundState: RoundState } => {
  const fallback = {
    progress: createInitialProgress(),
    roundState: createInitialRoundState(timerMinutes),
  };
  const saved = localStorage.getItem('gameProgress');
  if (!saved) return fallback;

  try {
    const parsed = JSON.parse(saved);

    if (isStoredProgressCompatible(parsed)) {
      const activeTileId = parsed.currentActiveTileId;
      const tiles = createTilesWithStatuses(parsed.tileStatuses);
      const activeTileStillExists = activeTileId !== null && tiles.some((tile) => tile.id === activeTileId);
      const restoredRoundState = parsed.roundState;

      return {
        progress: {
          currentScore: parsed.currentScore,
          roundCount: parsed.roundCount,
          tiles,
          currentActiveTileId: activeTileStillExists ? activeTileId : null,
          lastPresenterIndex: parsed.lastPresenterIndex,
          history: parsed.history,
        },
        roundState:
          activeTileStillExists && restoredRoundState
            ? {
                ...restoredRoundState,
                activeTileId,
                timerRunning: false,
              }
            : createInitialRoundState(timerMinutes),
      };
    }

    if (isLegacyProgressCompatible(parsed)) {
      const tileStatuses = Object.fromEntries(parsed.tiles.map((tile) => [tile.id, tile.status]));
      const activeTileId =
        parsed.currentActiveTileId ??
        parsed.tiles.find((tile) => tile.status === 'active')?.id ??
        null;

      return {
        progress: {
          currentScore: parsed.currentScore,
          roundCount: parsed.roundCount,
          tiles: createTilesWithStatuses(tileStatuses),
          currentActiveTileId: activeTileId,
          lastPresenterIndex: parsed.lastPresenterIndex,
          history: parsed.history,
        },
        roundState:
          activeTileId !== null
            ? {
                phase: 'working',
                activeTileId,
                presenterIndex: null,
                timerRunning: false,
                timeRemaining: timerMinutes * 60,
              }
            : createInitialRoundState(timerMinutes),
      };
    }
  } catch {
    // Ignore incompatible saved sessions from older versions.
  }

  return fallback;
};

export default function GameScreen({ config, onResetGame }: GameScreenProps) {
  const timerMinutes = config.timerMinutes || 7;
  const presentationSeconds = config.presentationSeconds || 90;
  const initialSessionRef = useRef<ReturnType<typeof loadInitialSession> | null>(null);
  if (!initialSessionRef.current) {
    initialSessionRef.current = loadInitialSession(timerMinutes);
  }

  const [progress, setProgress] = useState<GameProgress>(initialSessionRef.current.progress);
  const [roundState, setRoundState] = useState<RoundState>(initialSessionRef.current.roundState);

  const [selectedTileForModal, setSelectedTileForModal] = useState<number | null>(null);
  const [showPresentationScreen, setShowPresentationScreen] = useState(false);
  const [goalReached, setGoalReached] = useState(progress.currentScore >= config.targetScore);
  const [revealAnimation, setRevealAnimation] = useState<{ targetTile: Tile } | null>(null);
  const [activeSpecialMoment, setActiveSpecialMoment] = useState<SpecialMoment | null>(null);
  const [showSpecialMomentAnswers, setShowSpecialMomentAnswers] = useState(false);
  const [completedSpecialMomentIds, setCompletedSpecialMomentIds] = useState<SpecialMomentId[]>(() => {
    const saved = localStorage.getItem('gameProgress');
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved) as Partial<StoredGameProgress>;
      return parsed.completedSpecialMomentIds ?? [];
    } catch {
      return [];
    }
  });
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('soundEnabled') !== 'false');
  const persistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousGoalReachedRef = useRef(goalReached);

  const roundStateRef = useRef(roundState);
  roundStateRef.current = roundState;

  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    persistTimeoutRef.current = setTimeout(() => {
      const persistedProgress: StoredGameProgress = {
        currentScore: progress.currentScore,
        roundCount: progress.roundCount,
        tileStatuses: Object.fromEntries(progress.tiles.map((tile) => [tile.id, tile.status])),
        currentActiveTileId: progress.currentActiveTileId,
        lastPresenterIndex: progress.lastPresenterIndex,
        history: progress.history,
        completedSpecialMomentIds,
        roundState: {
          phase: roundState.phase,
          activeTileId: roundState.activeTileId,
          presenterIndex: roundState.presenterIndex,
          timeRemaining: roundState.timeRemaining,
        },
      };
      localStorage.setItem('gameProgress', JSON.stringify(persistedProgress));
    }, 300);
    return () => {
      if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
    };
  }, [completedSpecialMomentIds, progress, roundState]);

  useEffect(() => {
    setGoalReached(progress.currentScore >= config.targetScore);
  }, [config.targetScore, progress.currentScore]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    if (soundEnabled && !previousGoalReachedRef.current && goalReached) {
      playGoalFanfare();
    }
    previousGoalReachedRef.current = goalReached;
  }, [goalReached, soundEnabled]);

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
    if (soundEnabled && roundState.phase === 'working' && roundState.timeRemaining === 30) {
      playTimerWarning();
    }
  }, [roundState.phase, roundState.timeRemaining, soundEnabled]);

  useEffect(() => {
    setSelectedTileForModal(null);
  }, [roundState.phase]);

  const selectTile = useCallback(
    (tileId: number, source: 'manual' | 'random' | 'planned' = 'manual') => {
      const tile = progressRef.current.tiles.find((candidate) => candidate.id === tileId);
      if (!tile) return;

      const currentPhase = roundStateRef.current.phase;
      const isFirstRound = progressRef.current.roundCount === 0 && progressRef.current.history.length === 0;

      if (currentPhase === 'selecting_tile') {
        if (config.mode === 'open_board' && isFirstRound && source !== 'random') return;
        if (tile.status !== 'unplayed') return;
        if (soundEnabled && source !== 'random') playTileReveal();

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
    [config.mode, soundEnabled, timerMinutes]
  );

  const selectRandomStartTile = useCallback(() => {
    const unplayedTiles = progressRef.current.tiles.filter((tile) => tile.status === 'unplayed');
    if (unplayedTiles.length === 0) return;

    const randomTile = unplayedTiles[Math.floor(Math.random() * unplayedTiles.length)];
    setRevealAnimation({ targetTile: randomTile });
  }, []);

  const nextRecommendedTile = config.plannedTileIds
    .map((tileId) => progress.tiles.find((tile) => tile.id === tileId))
    .find((tile): tile is Tile => !!tile && tile.status === 'unplayed');

  const selectRecommendedTile = useCallback(() => {
    if (!nextRecommendedTile) return;
    selectTile(nextRecommendedTile.id, 'planned');
  }, [nextRecommendedTile, selectTile]);

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

  const showActiveTask = useCallback(() => {
    const activeTileId = roundStateRef.current.activeTileId;
    if (activeTileId !== null) setSelectedTileForModal(activeTileId);
  }, []);

  const goToPresenting = useCallback(() => {
    setRoundState((prev) => ({
      ...prev,
      phase: 'presenting',
      timerRunning: false,
    }));
  }, []);

  const cancelCurrentTile = useCallback(() => {
    const activeTileId = roundStateRef.current.activeTileId;
    if (activeTileId === null) return;

    setProgress((prev) => ({
      ...prev,
      tiles: prev.tiles.map((tile) =>
        tile.id === activeTileId ? { ...tile, status: 'unplayed' } : tile
      ),
      currentActiveTileId: null,
    }));
    setRoundState(createInitialRoundState(timerMinutes));
  }, [timerMinutes]);

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
    if (soundEnabled) playPresenterReveal();
  }, [config.avoidRepeatingPresenter, config.numPairs, soundEnabled]);

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
    if (soundEnabled) playScoreChime();

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

    const completedGuidedRoundCount = config.plannedTileIds.filter((tileId) =>
      [...currentProgress.history, { tileId: activeTileId, points: tile.points, presenterIndex }].some(
        (move) => move.tileId === tileId
      )
    ).length;
    const nextSpecialMoment =
      config.mode === 'guided_workshop'
        ? SPECIAL_MOMENTS.find(
            (moment) =>
              moment.afterGuidedRound === completedGuidedRoundCount &&
              !completedSpecialMomentIds.includes(moment.id)
          )
        : undefined;

    setRoundState({
      ...createInitialRoundState(timerMinutes),
      presenterIndex,
    });
    if (nextSpecialMoment) {
      setActiveSpecialMoment(nextSpecialMoment);
      setShowSpecialMomentAnswers(false);
    }
  }, [completedSpecialMomentIds, config.mode, config.plannedTileIds, soundEnabled, timerMinutes]);

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
    setRoundState(createInitialRoundState(timerMinutes));
  }, [timerMinutes]);

  const confirmReset = useCallback(() => {
    if (window.confirm('Är du säker på att du vill nollställa spelet? Denna åtgärd kan inte ångras.')) {
      onResetGame();
    }
  }, [onResetGame]);

  const toggleSound = useCallback(() => {
    unlockAudio();
    setSoundEnabled((prev) => !prev);
  }, []);

  const finishSpecialMoment = useCallback(() => {
    if (!activeSpecialMoment) return;
    setCompletedSpecialMomentIds((prev) =>
      prev.includes(activeSpecialMoment.id) ? prev : [...prev, activeSpecialMoment.id]
    );
    setActiveSpecialMoment(null);
    setShowSpecialMomentAnswers(false);
  }, [activeSpecialMoment]);

  const activeTile = roundState.activeTileId
    ? progress.tiles.find((tile) => tile.id === roundState.activeTileId)
    : undefined;

  const completedCount = progress.tiles.filter((tile) => tile.status === 'completed').length;
  const allTilesPlayed = completedCount === progress.tiles.length && !goalReached && progress.currentScore < config.targetScore;
  const isFirstRound = progress.roundCount === 0 && progress.history.length === 0;
  const currentPlannedRound = config.plannedTileIds.filter((tileId) =>
    progress.history.some((move) => move.tileId === tileId)
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 p-2 text-white lg:p-3">
      {revealAnimation && (
        <TileRevealAnimation
          tiles={progress.tiles}
          targetTile={revealAnimation.targetTile}
          soundEnabled={soundEnabled}
          onComplete={handleRevealAnimationComplete}
        />
      )}

      {showPresentationScreen && roundState.presenterIndex !== null && (
        <PresentationScreen
          pairName={config.pairNames[roundState.presenterIndex]}
          activeTile={activeTile}
          durationSeconds={presentationSeconds}
          soundEnabled={soundEnabled}
          onFinish={finishPresentation}
        />
      )}

      {activeSpecialMoment && (
        <SpecialMomentScreen
          moment={activeSpecialMoment}
          showAnswers={showSpecialMomentAnswers}
          onRevealAnswers={() => setShowSpecialMomentAnswers(true)}
          onFinish={finishSpecialMoment}
        />
      )}

      {!showPresentationScreen && !activeSpecialMoment && (
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
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />

          <div className="mt-2 flex flex-col gap-4 2xl:flex-row">
            <div className="min-w-0 flex-1">
              <GameBoard
                tiles={progress.tiles}
                onSelectTile={selectTile}
                activeTileId={roundState.activeTileId}
                roundPhase={roundState.phase}
                manualSelectionEnabled={!isFirstRound}
                mode={config.mode}
              />
            </div>

            <div className="w-full 2xl:w-[30rem] 2xl:shrink-0">
              <RoundFlow
                roundPhase={roundState.phase}
                timerRunning={roundState.timerRunning}
                timeRemaining={roundState.timeRemaining}
                mode={config.mode}
                onSelectRandomTile={selectRandomStartTile}
                onSelectRecommendedTile={selectRecommendedTile}
                onStartTimer={startTimer}
                onShowTask={showActiveTask}
                onGoToPresenting={goToPresenting}
                onSelectRandomPresenter={selectRandomPresenter}
                onShowPresentation={showPresentation}
                onMarkComplete={markTileComplete}
                onCancelCurrentTile={cancelCurrentTile}
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
                nextRecommendedTile={nextRecommendedTile}
                currentPlannedRound={currentPlannedRound}
                totalPlannedRounds={config.plannedTileIds.length}
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
