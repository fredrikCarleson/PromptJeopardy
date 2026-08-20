import { useState, useEffect } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import RulesScreen from './components/RulesScreen';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import { GameConfig } from './types';
import { GUIDED_WORKSHOP_TILE_IDS, TILES } from './data/tiles';

type AppScreen = 'onboarding' | 'rules' | 'setup' | 'playing';

const guidedWorkshopTarget = GUIDED_WORKSHOP_TILE_IDS.reduce((sum, tileId) => {
  const tile = TILES.find((candidate) => candidate.id === tileId);
  return sum + (tile?.points ?? 0);
}, 0);

function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [config, setConfig] = useState<GameConfig | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gameConfig');
    if (saved) {
      try {
        const parsedConfig = JSON.parse(saved) as Partial<GameConfig>;
        const mode = parsedConfig.mode ?? 'guided_workshop';
        const normalizedConfig: GameConfig = {
          mode,
          numPairs: parsedConfig.numPairs ?? parsedConfig.pairNames?.length ?? 15,
          pairNames:
            parsedConfig.pairNames ??
            Array.from({ length: parsedConfig.numPairs ?? 15 }, (_, index) => `Par ${index + 1}`),
          targetScore:
            mode === 'guided_workshop' && parsedConfig.targetScore === 1700
              ? guidedWorkshopTarget
              : parsedConfig.targetScore ?? (mode === 'guided_workshop' ? guidedWorkshopTarget : 2100),
          timerMinutes: parsedConfig.timerMinutes ?? 5,
          presentationSeconds: parsedConfig.presentationSeconds ?? 75,
          avoidRepeatingPresenter: parsedConfig.avoidRepeatingPresenter ?? true,
          plannedTileIds: mode === 'open_board' ? [] : GUIDED_WORKSHOP_TILE_IDS,
        };
        setConfig(normalizedConfig);
        setScreen('playing');
      } catch {
        setScreen('onboarding');
      }
    }
  }, []);

  const handleStartGame = (newConfig: GameConfig) => {
    setConfig(newConfig);
    setScreen('playing');
    localStorage.setItem('gameConfig', JSON.stringify(newConfig));
  };

  const handleResetGame = () => {
    setScreen('onboarding');
    setConfig(null);
    localStorage.removeItem('gameConfig');
    localStorage.removeItem('gameProgress');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {screen === 'onboarding' && (
        <OnboardingScreen
          onStartSetup={() => setScreen('setup')}
          onViewRules={() => setScreen('rules')}
        />
      )}
      {screen === 'rules' && <RulesScreen onBack={() => setScreen('onboarding')} />}
      {screen === 'setup' && (
        <SetupScreen onStartGame={handleStartGame} onBack={() => setScreen('onboarding')} />
      )}
      {screen === 'playing' && config && (
        <GameScreen config={config} onResetGame={handleResetGame} />
      )}
    </div>
  );
}

export default App;
