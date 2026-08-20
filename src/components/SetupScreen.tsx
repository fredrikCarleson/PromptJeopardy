import { useMemo, useState } from 'react';
import { CheckSquare, ChevronLeft, Download, Play } from 'lucide-react';
import { GUIDED_WORKSHOP_TILE_IDS, TILES } from '../data/tiles';
import { GameConfig } from '../types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onBack: () => void;
}

const boardTotalScore = TILES.reduce((sum, tile) => sum + tile.points, 0);
const guidedWorkshopTarget = GUIDED_WORKSHOP_TILE_IDS.reduce((sum, tileId) => {
  const tile = TILES.find((candidate) => candidate.id === tileId);
  return sum + (tile?.points ?? 0);
}, 0);
const openBoardTarget = 2100;

export default function SetupScreen({ onStartGame, onBack }: SetupScreenProps) {
  const [mode, setMode] = useState<GameConfig['mode']>('guided_workshop');
  const [numPairs, setNumPairs] = useState(15);
  const [targetScore, setTargetScore] = useState(guidedWorkshopTarget);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [presentationSeconds, setPresentationSeconds] = useState(75);
  const [avoidRepeatingPresenter, setAvoidRepeatingPresenter] = useState(true);
  const [pairNamesInput, setPairNamesInput] = useState('');

  const defaultPairNames = useMemo(
    () => Array.from({ length: numPairs }, (_, index) => `Par ${index + 1}`),
    [numPairs]
  );

  const getPairNames = () => {
    if (pairNamesInput.trim() === '') return defaultPairNames;
    return pairNamesInput
      .split('\n')
      .map((name) => name.trim())
      .filter(Boolean);
  };

  const handleStartGame = () => {
    const pairNames = getPairNames();
    const config: GameConfig = {
      mode,
      numPairs: pairNames.length,
      pairNames,
      targetScore,
      timerMinutes,
      presentationSeconds,
      avoidRepeatingPresenter,
      plannedTileIds: mode === 'guided_workshop' ? GUIDED_WORKSHOP_TILE_IDS : [],
    };
    onStartGame(config);
  };

  const applyMode = (nextMode: GameConfig['mode']) => {
    setMode(nextMode);
    if (nextMode === 'guided_workshop') {
      setTargetScore(guidedWorkshopTarget);
      setTimerMinutes(5);
      setPresentationSeconds(75);
      return;
    }

    setTargetScore(openBoardTarget);
    setTimerMinutes(7);
    setPresentationSeconds(90);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white lg:p-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-blue-300 transition-colors hover:text-blue-200"
        >
          <ChevronLeft size={20} />
          Tillbaka
        </button>

        <section className="rounded-lg border border-blue-500/30 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black text-white lg:text-5xl">Spelinställningar</h1>
            <p className="mt-3 text-slate-300">
              För en workshop med årsredovisningen och Copilot i Chat, Word, Excel och Create.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Spelformat</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => applyMode('guided_workshop')}
                  className={`rounded-md border px-4 py-3 text-left transition-colors ${
                    mode === 'guided_workshop'
                      ? 'border-yellow-300 bg-yellow-300/10 text-yellow-100'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-bold">60 min workshop</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-300">
                    Fem rekommenderade rutor, tydlig progression och realistisk tid för lärande.
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => applyMode('open_board')}
                  className={`rounded-md border px-4 py-3 text-left transition-colors ${
                    mode === 'open_board'
                      ? 'border-yellow-300 bg-yellow-300/10 text-yellow-100'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-bold">Fri tavla</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-300">
                    Klassisk Jeopardy-känsla med slumpad start och valfri fortsättning.
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Antal par</label>
              <input
                type="number"
                min="1"
                value={numPairs}
                onChange={(event) => setNumPairs(Math.max(1, Number.parseInt(event.target.value, 10) || 1))}
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2.5 text-white outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Parnamn, ett per rad
              </label>
              <textarea
                value={pairNamesInput}
                onChange={(event) => setPairNamesInput(event.target.value)}
                placeholder="Lämna tomt för Par 1, Par 2, ..."
                rows={5}
                className="w-full resize-none rounded-md border border-slate-600 bg-slate-800 px-4 py-2.5 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                {pairNamesInput.trim() === ''
                  ? `Auto-genererar ${defaultPairNames.length} par.`
                  : `${getPairNames().length} par inlästa.`}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Poängmål</label>
                <input
                  type="number"
                  min="100"
                  value={targetScore}
                  onChange={(event) => setTargetScore(Math.max(100, Number.parseInt(event.target.value, 10) || 100))}
                  className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2.5 text-white outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {mode === 'guided_workshop'
                    ? `Rekommenderad femrundors bana: ${guidedWorkshopTarget}.`
                    : `Rekommenderat för öppen tavla: ${openBoardTarget}.`}{' '}
                  Hela tavlan: {boardTotalScore}.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Arbetstid</label>
                <input
                  type="number"
                  min="1"
                  value={timerMinutes}
                  onChange={(event) => setTimerMinutes(Math.max(1, Number.parseInt(event.target.value, 10) || 1))}
                  className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2.5 text-white outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <p className="mt-1 text-xs text-slate-500">Minuter per ruta</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Redovisning</label>
                <input
                  type="number"
                  min="30"
                  value={presentationSeconds}
                  onChange={(event) => setPresentationSeconds(Math.max(30, Number.parseInt(event.target.value, 10) || 30))}
                  className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2.5 text-white outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <p className="mt-1 text-xs text-slate-500">Sekunder per muntlig reflektion</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-800 p-4">
              <input
                type="checkbox"
                id="avoidRepeat"
                checked={avoidRepeatingPresenter}
                onChange={(event) => setAvoidRepeatingPresenter(event.target.checked)}
                className="h-4 w-4 rounded accent-blue-500"
              />
              <label htmlFor="avoidRepeat" className="flex-1 cursor-pointer text-sm text-slate-200">
                Prioritera par som ännu inte har presenterat eller granskat.
              </label>
            </div>

            <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-4 text-sm leading-relaxed text-blue-100">
              {mode === 'guided_workshop'
                ? 'Workshopläget använder fem planerade rutor och tre korta muntliga specialmoment mellan rundorna: Vad saknas?, Förbättra prompten och Farlig detalj.'
                : 'Fri tavla passar när du vill ha mer spelshow-känsla. Med 60 minuter hinner gruppen oftast 5-6 frågor, så 2100 poäng kräver flera svårare rutor.'}
            </div>

            {mode === 'guided_workshop' && (
              <section className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4">
                <h2 className="flex items-center gap-2 text-base font-bold text-emerald-100">
                  <CheckSquare size={20} />
                  Kontrollera före start
                </h2>
                <p className="mt-1 text-xs text-emerald-100/80">Checklistan är ett stöd och blockerar inte starten.</p>
                <div className="mt-3 grid gap-2 text-sm text-slate-100 sm:grid-cols-2">
                  {[
                    'Årsredovisningen är tillgänglig.',
                    'Klarspråksdokumentet är tillgängligt.',
                    'Excelövningen är sparad i OneDrive eller SharePoint och öppnad i Excel.',
                    'Copilot i Word, Excel och Create är testat.',
                    'Projektorn visar appen i helskärm och texten går att läsa längst bak.',
                  ].map((item) => (
                    <label key={item} className="flex cursor-pointer items-start gap-2 rounded bg-slate-950/40 p-2.5">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded accent-emerald-500" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <a
                  href={`${import.meta.env.BASE_URL}ovningsfiler/Semesterplan-demo.xlsx`}
                  download
                  className="mt-3 flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  <Download size={18} />
                  Ladda ner Excelövningen
                </a>
              </section>
            )}

            <button
              type="button"
              onClick={handleStartGame}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3.5 text-lg font-bold text-white transition-colors hover:bg-blue-500"
            >
              <Play size={22} />
              Starta spel
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
