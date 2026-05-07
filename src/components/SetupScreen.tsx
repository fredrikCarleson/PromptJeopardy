import { useMemo, useState } from 'react';
import { ChevronLeft, Play } from 'lucide-react';
import { TILES } from '../data/tiles';
import { GameConfig } from '../types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onBack: () => void;
}

const boardTotalScore = TILES.reduce((sum, tile) => sum + tile.points, 0);
const recommendedSixtyMinuteTarget = 2100;

export default function SetupScreen({ onStartGame, onBack }: SetupScreenProps) {
  const [numPairs, setNumPairs] = useState(25);
  const [targetScore, setTargetScore] = useState(recommendedSixtyMinuteTarget);
  const [timerMinutes, setTimerMinutes] = useState(7);
  const [presentationSeconds, setPresentationSeconds] = useState(90);
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
      numPairs: pairNames.length,
      pairNames,
      targetScore,
      timerMinutes,
      presentationSeconds,
      avoidRepeatingPresenter,
    };
    onStartGame(config);
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
              För en workshop med årsredovisningen, klarspråksmallen, M365 Copilot och ChatGPT 5.x.
            </p>
          </div>

          <div className="space-y-5">
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
                  Rekommenderat för 60 min: {recommendedSixtyMinuteTarget}. Hela tavlan: {boardTotalScore}.
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
                Undvik samma presenterande par två gånger i rad.
              </label>
            </div>

            <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-4 text-sm leading-relaxed text-blue-100">
              Med 60 minuter hinner gruppen troligen 5-6 frågor. Målet kräver att gruppen väljer
              flera svårare rutor, eftersom 2100 poäng motsvarar 350 poäng i snitt vid 6 frågor.
            </div>

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
