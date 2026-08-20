import { CheckCircle, Maximize2, Pause, Play, Plus, Presentation, RotateCcw, Shuffle, Undo2, XCircle } from 'lucide-react';
import { RoundPhase, Tile } from '../types';
import { TOPIC_LABELS } from '../data/tiles';
import { formatTime } from '../utils/formatTime';

interface RoundFlowProps {
  roundPhase: RoundPhase;
  timerRunning: boolean;
  timeRemaining: number;
  mode: 'guided_workshop' | 'open_board';
  onSelectRandomTile: () => void;
  onSelectRecommendedTile: () => void;
  onStartTimer: () => void;
  onAddMinute: () => void;
  onShowTask: () => void;
  onGoToPresenting: () => void;
  onSelectRandomPresenter: () => void;
  onShowPresentation: () => void;
  onMarkComplete: () => void;
  onCancelCurrentTile: () => void;
  onUndo: () => void;
  onReset: () => void;
  canMarkComplete: boolean;
  presenterName: string | null;
  reviewerName: string | null;
  activeTile: Tile | undefined;
  isFirstRound: boolean;
  nextRecommendedTile: Tile | undefined;
  currentPlannedRound: number;
  totalPlannedRounds: number;
}

const StepIndicator = ({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) => (
  <div
    className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm font-semibold ${
      active ? 'bg-yellow-300/15 text-yellow-100' : completed ? 'text-emerald-300' : 'text-slate-500'
    }`}
  >
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
        active ? 'bg-yellow-300 text-slate-950' : completed ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
      }`}
    >
      {completed ? '✓' : number}
    </span>
    {label}
  </div>
);

export default function RoundFlow({
  roundPhase,
  timerRunning,
  timeRemaining,
  mode,
  onSelectRandomTile,
  onSelectRecommendedTile,
  onStartTimer,
  onAddMinute,
  onShowTask,
  onGoToPresenting,
  onSelectRandomPresenter,
  onShowPresentation,
  onMarkComplete,
  onCancelCurrentTile,
  onUndo,
  onReset,
  canMarkComplete,
  presenterName,
  reviewerName,
  activeTile,
  isFirstRound,
  nextRecommendedTile,
  currentPlannedRound,
  totalPlannedRounds,
}: RoundFlowProps) {
  const isSelecting = roundPhase === 'selecting_tile';
  const isWorking = roundPhase === 'working';
  const isPresenting = roundPhase === 'presenting';
  const isChoosing = roundPhase === 'choosing_next_tile';

  return (
    <aside className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl lg:p-5">
      <h2 className="text-2xl font-bold text-white">Facilitatorflöde</h2>

      <div className="flex flex-wrap gap-1">
        <StepIndicator number="1" label="Välj" active={isSelecting} completed={!isSelecting} />
        <StepIndicator number="2" label="Arbeta" active={isWorking} completed={isPresenting || isChoosing} />
        <StepIndicator number="3" label="Presentera" active={isPresenting} completed={isChoosing} />
        <StepIndicator number="4" label="Poäng" active={isChoosing} completed={false} />
      </div>

      {isSelecting && (
        <div className="space-y-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
          <div className="font-semibold text-blue-200">
            {mode === 'guided_workshop'
              ? nextRecommendedTile
                ? 'Välj nästa rekommenderade runda'
                : 'Den rekommenderade banan är klar'
              : isFirstRound
                ? 'Första rutan ska slumpas'
                : 'Välj nästa ruta'}
          </div>
          <p className="text-sm text-slate-300">
            {mode === 'guided_workshop'
              ? nextRecommendedTile
                ? 'Workshopläget går från insikter till Word och infografik, och avslutas med två sammanhängande Excelrundor.'
                : 'Fortsätt fritt om ni har tid kvar eller använd slutet till gemensam summering.'
              : isFirstRound
              ? 'Starta workshopen med slumpen så att ingen styr första ämnet.'
              : 'Det presenterande paret kan välja en ledig ruta på tavlan, eller så kan du slumpa nästa ruta.'}
          </p>
          {mode === 'guided_workshop' && nextRecommendedTile && (
            <div className="rounded-md bg-slate-800 p-3">
              <div className="text-xs uppercase text-slate-400">
                Rekommenderad runda {Math.min(currentPlannedRound + 1, totalPlannedRounds)} av {totalPlannedRounds}
              </div>
              <div className="mt-1 text-sm font-bold text-white">{nextRecommendedTile.title}</div>
              <div className="mt-1 text-xs text-slate-400">
                {TOPIC_LABELS[nextRecommendedTile.topic]} · {nextRecommendedTile.points} poäng
              </div>
            </div>
          )}
          {mode === 'guided_workshop' && nextRecommendedTile && (
            <button
              type="button"
              onClick={onSelectRecommendedTile}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 py-2.5 font-semibold text-slate-950 transition-colors hover:bg-yellow-400"
            >
              <Play size={18} />
              Starta rekommenderad runda
            </button>
          )}
          <button
            type="button"
            onClick={onSelectRandomTile}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            <Shuffle size={18} />
            {mode === 'guided_workshop' ? 'Slumpa i stället' : 'Slumpa ruta'}
          </button>
        </div>
      )}

      {isWorking && activeTile && (
        <div className="space-y-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="text-lg font-bold text-emerald-200">Arbete i par</div>

          <button
            type="button"
            onClick={onShowTask}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-blue-300/50 bg-blue-600 px-4 py-3 text-lg font-black text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-500"
          >
            <Maximize2 size={24} />
            Visa uppgiften stort
          </button>

          <div className="rounded-lg bg-slate-800 p-4">
            <div className="text-sm font-bold uppercase text-slate-300">{TOPIC_LABELS[activeTile.topic]} · {activeTile.points} poäng</div>
            <div className="mt-1 text-xl font-bold text-white">{activeTile.title}</div>
            <ol className="mt-3 space-y-2 text-lg font-medium leading-snug text-white">
              {activeTile.presentationSteps.map((step, index) => (
                <li key={step} className="flex gap-2">
                  <span className="font-black text-blue-300">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-base text-emerald-50">
              <div className="mb-1 text-sm font-black uppercase text-emerald-200">Ni ska visa</div>
              {activeTile.expectedResult}
            </div>
            <div className="mt-3 rounded-lg border border-slate-600 bg-slate-950/70 p-3 text-base leading-snug text-slate-100">
              <span className="font-bold text-white">Källa:</span> {activeTile.sourceInstruction}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-100">
                {activeTile.toolFocus}
              </span>
              <span className="rounded border border-blue-400/30 bg-blue-400/10 px-2 py-1 text-blue-100">
                {activeTile.appFocus}
              </span>
            </div>
            {activeTile.bonusChallenge && (
              <div className="mt-3 rounded-lg border border-yellow-300/40 bg-yellow-300/10 p-3 text-base leading-snug text-yellow-50">
                <div className="mb-1 text-sm font-black uppercase text-yellow-200">Klart tidigt?</div>
                {activeTile.bonusChallenge}
              </div>
            )}
          </div>

          <div className="rounded-md border border-slate-700 bg-slate-950/60 p-3">
            <div className="text-sm font-bold uppercase text-slate-300">Promptrecept</div>
            <div className="mt-2 grid gap-2 text-sm text-slate-100 sm:grid-cols-2">
              <span>1. Roll eller målgrupp</span>
              <span>2. Avgränsad källa</span>
              <span>3. Tydlig uppgift</span>
              <span>4. Önskat format</span>
              <span>5. Kontrollfråga</span>
            </div>
          </div>

          <div
            className={`rounded-lg py-3 text-center font-mono text-6xl font-bold ${
              timeRemaining <= 30 ? 'bg-red-500/20 text-red-200' : 'bg-slate-800 text-white'
            }`}
            role="timer"
            aria-label={`Tid kvar: ${formatTime(timeRemaining)}`}
          >
            {formatTime(timeRemaining)}
          </div>

          {timeRemaining === 0 && (
            <div className="rounded-md border border-red-400/40 bg-red-500/10 p-3 text-center text-lg font-bold text-red-100">
              Tiden är slut. Gå vidare när rummet är redo eller ge en minut till.
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onStartTimer}
              disabled={timeRemaining === 0}
              className={`flex w-full items-center justify-center gap-2 rounded-md py-3 text-base font-semibold text-white transition-colors ${
                timeRemaining === 0
                  ? 'cursor-not-allowed bg-slate-700 text-slate-400'
                  : timerRunning
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {timerRunning ? <Pause size={18} /> : <Play size={18} />}
              {timerRunning ? 'Pausa timer' : 'Starta timer'}
            </button>
            <button
              type="button"
              onClick={onAddMinute}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-700 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-600"
            >
              <Plus size={18} />
              Ge 1 minut till
            </button>
          </div>

          <button
            type="button"
            onClick={onGoToPresenting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-700 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-600"
          >
            <Presentation size={18} />
            {timeRemaining === 0 ? 'Tiden är slut – gå till redovisning' : 'Gå till muntlig redovisning'}
          </button>

          <button
            type="button"
            onClick={onCancelCurrentTile}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 py-3 text-base font-semibold text-slate-100 transition-colors hover:bg-slate-700"
          >
            <XCircle size={18} />
            Byt ruta om uppgiften inte går att genomföra
          </button>
        </div>
      )}

      {isPresenting && (
        <div className="space-y-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <div className="font-semibold text-amber-200">Muntlig redovisning</div>
          <p className="text-sm text-slate-300">
            Slumpa ett presenterande par och ett granskarpar. Par som ännu inte haft en aktiv roll prioriteras.
          </p>

          <button
            type="button"
            onClick={onSelectRandomPresenter}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-600 py-2.5 font-semibold text-white transition-colors hover:bg-amber-500"
          >
            <Shuffle size={18} />
            Slumpa två par
          </button>

          {presenterName && (
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-md bg-slate-800 p-4 text-center">
                <div className="text-xs uppercase text-slate-400">Presenterande par</div>
                <div className="mt-1 text-2xl font-black text-white">{presenterName}</div>
              </div>
              {reviewerName && (
                <div className="rounded-md border border-yellow-300/30 bg-yellow-300/10 p-4 text-center">
                  <div className="text-xs uppercase text-yellow-100">Granskarpar</div>
                  <div className="mt-1 text-2xl font-black text-white">{reviewerName}</div>
                </div>
              )}
            </div>
          )}

          {presenterName && (
            <button
              type="button"
              onClick={onShowPresentation}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Presentation size={18} />
              Visa reflektionsfrågor
            </button>
          )}
        </div>
      )}

      {isChoosing && activeTile && (
        <div className="space-y-3 rounded-lg border border-violet-500/30 bg-violet-500/10 p-4">
          <div className="font-semibold text-violet-200">Lägg till poäng</div>
          <p className="text-sm text-slate-300">
            {mode === 'guided_workshop'
              ? 'Markera uppgiften som klar. Därefter visar panelen nästa rekommenderade runda.'
              : 'Markera uppgiften som klar. Därefter får det presenterande paret välja nästa ruta, eller så slumpas den.'}
          </p>
          <div className="rounded-md bg-slate-800 p-3">
            <div className="text-sm font-semibold text-white">{activeTile.title}</div>
            <div className="mt-1 text-xs text-slate-400">{activeTile.points} poäng · {TOPIC_LABELS[activeTile.topic]}</div>
          </div>
          <div className="rounded-md border border-yellow-300/30 bg-yellow-300/10 p-3">
            <div className="text-xs font-bold uppercase text-yellow-100">Lärdom att lyfta</div>
            <p className="mt-2 text-sm leading-relaxed text-yellow-50">{activeTile.learningGoal}</p>
          </div>
          <div className="rounded-md border border-slate-700 bg-slate-950/60 p-3">
            <div className="text-xs font-bold uppercase text-slate-400">Snabb kvalitetscheck</div>
            <div className="mt-2 grid gap-2 text-xs text-slate-200">
              <span>□ Källan var avgränsad</span>
              <span>□ Svaret hade ett tydligt format</span>
              <span>□ Något skulle kontrolleras av människa</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onMarkComplete}
            disabled={!canMarkComplete}
            className={`flex w-full items-center justify-center gap-2 rounded-md py-2.5 font-semibold transition-colors ${
              canMarkComplete
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'cursor-not-allowed bg-slate-700 text-slate-400'
            }`}
          >
            <CheckCircle size={18} />
            Markera klar och lägg till poäng
          </button>
        </div>
      )}

      <div className="space-y-2 border-t border-slate-700 pt-4">
        <button
          type="button"
          onClick={onUndo}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          <Undo2 size={16} />
          Ångra senaste klara ruta
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-slate-700"
        >
          <RotateCcw size={16} />
          Nollställ spel
        </button>
      </div>
    </aside>
  );
}
