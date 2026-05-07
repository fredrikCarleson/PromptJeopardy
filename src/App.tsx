import { useState, useEffect } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import RulesScreen from './components/RulesScreen';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import { GameConfig } from './types';

type AppScreen = 'onboarding' | 'rules' | 'setup' | 'playing';

function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [config, setConfig] = useState<GameConfig | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gameConfig');
    if (saved) {
      try {
        const parsedConfig = JSON.parse(saved);
        setConfig(parsedConfig);
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
