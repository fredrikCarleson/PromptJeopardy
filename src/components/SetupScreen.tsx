import { useState, useMemo } from 'react';
import { GameConfig } from '../types';
import { Play, ChevronLeft } from 'lucide-react';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onBack: () => void;
}

export default function SetupScreen({ onStartGame, onBack }: SetupScreenProps) {
  const [numPairs, setNumPairs] = useState(25);
  const [targetScore, setTargetScore] = useState(1600);
  const [timerMinutes, setTimerMinutes] = useState(7);
  const [avoidRepeatingPresenter, setAvoidRepeatingPresenter] = useState(true);
  const [pairNamesInput, setPairNamesInput] = useState('');

  const defaultPairNames = useMemo(
    () => Array.from({ length: numPairs }, (_, i) => `Par ${i + 1}`),
    [numPairs]
  );

  const getPairNames = () => {
    if (pairNamesInput.trim() === '') {
      return defaultPairNames;
    }
    return pairNamesInput
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name !== '');
  };

  const handleStartGame = () => {
    const pairNames = getPairNames();
    const config: GameConfig = {
      numPairs: pairNames.length,
      pairNames,
      targetScore,
      timerMinutes,
      avoidRepeatingPresenter,
    };
    onStartGame(config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Tillbaka
        </button>

        <div className="bg-slate-800/80 rounded-xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Spelinställningar</h1>
            <p className="text-lg text-slate-300">Konfigurera ditt spel</p>
          </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Antal par
            </label>
            <input
              type="number"
              min="1"
              value={numPairs}
              onChange={(e) => setNumPairs(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Parnamn (valfritt, en per rad)
            </label>
            <textarea
              value={pairNamesInput}
              onChange={(e) => setPairNamesInput(e.target.value)}
              placeholder="Lämna tomt för auto-generering (Par 1, Par 2, ...)"
              rows={5}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              {pairNamesInput.trim() === ''
                ? `Auto-genererar: ${defaultPairNames.slice(0, 3).join(', ')}, ...`
                : `${getPairNames().length} par inlästa`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Målpoäng
              </label>
              <input
                type="number"
                min="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Math.max(100, parseInt(e.target.value) || 100))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Runda-timer (minuter)
              </label>
              <input
                type="number"
                min="1"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
            <input
              type="checkbox"
              id="avoidRepeat"
              checked={avoidRepeatingPresenter}
              onChange={(e) => setAvoidRepeatingPresenter(e.target.checked)}
              className="w-4 h-4 accent-blue-500 rounded"
            />
            <label htmlFor="avoidRepeat" className="text-sm text-slate-200 cursor-pointer flex-1">
              Undvik samma presenterande par två gånger i rad
            </label>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
          >
            <Play size={22} />
            Starta spel
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
