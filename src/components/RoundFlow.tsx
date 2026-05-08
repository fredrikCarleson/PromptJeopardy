import { Undo2, RotateCcw, Shuffle, Play, Pause, CheckCircle, Presentation } from 'lucide-react';
import { Tile, RoundPhase } from '../types';
import { formatTime } from '../utils/formatTime';

interface RoundFlowProps {
  roundPhase: RoundPhase;
  timerRunning: boolean;
  timeRemaining: number;
  onSelectRandomTile: () => void;
  onStartTimer: () => void;
  onGoToPresenting: () => void;
  onSelectRandomPresenter: () => void;
  onShowPresentation: () => void;
  onMarkComplete: () => void;
  onUndo: () => void;
  onReset: () => void;
  canMarkComplete: boolean;
  presenterName: string | null;
  activeTile: Tile | undefined;
}

const StepIndicator = ({ number, label, active, completed }: { number: string; label: string; active: boolean; completed: boolean }) => (
  <div className={`flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded ${
    active ? 'bg-white/10 text-white' : completed ? 'text-green-400' : 'text-slate-500'
  }`}>
    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
      active ? 'bg-blue-500 text-white' : completed ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-400'
    }`}>
      {completed ? '✓' : number}
    </span>
    {label}
  </div>
);

export default function RoundFlow({
  roundPhase,
  timerRunning,
  timeRemaining,
  onSelectRandomTile,
  onStartTimer,
  onGoToPresenting,
  onSelectRandomPresenter,
  onShowPresentation,
  onMarkComplete,
  onUndo,
  onReset,
  canMarkComplete,
  presenterName,
  activeTile,
}: RoundFlowProps) {
  const isSelecting = roundPhase === 'selecting_tile';
  const isWorking = roundPhase === 'working';
  const isPresenting = roundPhase === 'presenting';
  const isChoosing = roundPhase === 'choosing_next_tile';

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
      <h2 className="text-xl font-bold text-white">Rundflöde</h2>

      {/* Step indicators */}
      <div className="flex flex-wrap gap-1 mb-2">
        <StepIndicator number="A" label="Välj" active={isSelecting} completed={!isSelecting} />
        <StepIndicator number="B" label="Arbeta" active={isWorking} completed={!isWorking && !isSelecting} />
        <StepIndicator number="C" label="Presentera" active={isPresenting} completed={isChoosing} />
        <StepIndicator number="D" label="Välj nästa" active={isChoosing} completed={false} />
      </div>

      {/* STEP A: Select tile */}
      {isSelecting && (
        <div className="space-y-3 bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <div className="text-base font-semibold text-blue-300">Steg A: Välj startämne</div>

          <div className="bg-blue-500/20 border border-blue-500/50 p-3 rounded-lg">
            <p className="text-sm text-blue-200">
              👉 Välj en ruta för att starta denna runda.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Du kan slumpa eller välja själv. Tips: börja med grönfärgade "Grund"-rutor för att lära dig systemet.
            </p>
          </div>

          <button
            onClick={onSelectRandomTile}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Shuffle size={18} />
            Slumpa startämne
          </button>
          <p className="text-xs text-slate-400 text-center">Eller klicka en ospelad ruta på brädet</p>
        </div>
      )}

      {/* STEP B: Working */}
      {isWorking && (
        <div className="space-y-3 bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
          <div className="text-base font-semibold text-emerald-300">Steg B: Arbete i par</div>

          {activeTile && (
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <div className="text-xs text-slate-400">Aktiv uppgift</div>
              <div className="text-sm text-white font-medium leading-snug">{activeTile.title}</div>
              <div className="text-xs text-slate-400 mt-1">{activeTile.points} poäng — {activeTile.category}</div>
            </div>
          )}

          <div className={`text-5xl font-bold text-center py-3 rounded-lg font-mono ${
            timeRemaining <= 30 ? 'bg-red-500/20 text-red-300' : 'bg-slate-700/50 text-white'
          }`} role="timer" aria-label={`Tid kvar: ${formatTime(timeRemaining)}`}>
            {formatTime(timeRemaining)}
            {timeRemaining <= 10 && timeRemaining > 0 && (
              <div className="text-sm font-semibold text-red-400 mt-1">LIVSVIKTIGT!</div>
            )}
            {timeRemaining <= 30 && timeRemaining > 10 && (
              <div className="text-sm font-semibold text-amber-400 mt-1">Snart slut på tid!</div>
            )}
          </div>

          <button
            onClick={onStartTimer}
            className={`w-full font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              timerRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {timerRunning ? <Pause size={18} /> : <Play size={18} />}
            {timerRunning ? 'Pausa timer' : 'Starta timer'}
          </button>

          <button
            onClick={onGoToPresenting}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Presentation size={18} />
            Gå till presentering
          </button>
        </div>
      )}

      {/* STEP C: Presenting */}
      {isPresenting && (
        <div className="space-y-3 bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
          <div className="text-base font-semibold text-amber-300">Steg C: Presentering</div>

          <button
            onClick={onSelectRandomPresenter}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Shuffle size={18} />
            Slumpa presenterande par
          </button>

          {presenterName && (
            <div className="bg-slate-700 p-4 rounded-lg text-center">
              <div className="text-xs text-slate-400 mb-1">Presenterande par</div>
              <div className="text-2xl font-bold text-white">{presenterName}</div>
            </div>
          )}

          {presenterName && (
            <button
              onClick={onShowPresentation}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Presentation size={18} />
              Visa presentationsmall
            </button>
          )}
        </div>
      )}

      {/* STEP D: Choose next tile */}
      {isChoosing && (
        <div className="space-y-3 bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
          <div className="text-base font-semibold text-violet-300">Steg D: Välj nästa ruta</div>

          {activeTile && (
            <div className="bg-slate-700/50 p-3 rounded-lg mb-2">
              <div className="text-xs text-slate-400">Nuvarande ruta</div>
              <div className="text-sm text-white font-medium">{activeTile.title}</div>
              <div className="text-xs text-slate-400 mt-1">{activeTile.points} poäng — {activeTile.category}</div>
            </div>
          )}

          <div className="bg-violet-500/20 border border-violet-500/50 p-3 rounded-lg">
            <p className="text-sm text-violet-200 mb-2">
              {presenterName
                ? `👉 ${presenterName} — klicka en ospelad ruta på brädet för att välja nästa uppgift`
                : '👉 Klicka en ospelad ruta på brädet för att välja nästa uppgift'}
            </p>
            <p className="text-xs text-slate-400">
              Eller använd knappen nedan när du är klar med denna ruta.
            </p>
          </div>

          <button
            onClick={onMarkComplete}
            disabled={!canMarkComplete}
            className={`w-full font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              canMarkComplete
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={18} />
            Markera klar & lägg till poäng
          </button>
        </div>
      )}

      {/* Bottom actions */}
      <div className="border-t border-slate-700 pt-4 space-y-2">
        <button
          onClick={onUndo}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Undo2 size={16} />
          Ångra senaste markering
        </button>
        <button
          onClick={onReset}
          className="w-full bg-slate-700 hover:bg-slate-600 text-red-300 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw size={16} />
          Nollställ spel
        </button>
      </div>
    </div>
  );
}
