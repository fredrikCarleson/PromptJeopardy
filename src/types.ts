export type GameState = 'setup' | 'playing';

export type TileCategory = 'Grund' | 'Fördjupning' | 'Skapa nytt';

export type TileStatus = 'unplayed' | 'active' | 'completed';

export type RoundPhase = 'selecting_tile' | 'working' | 'presenting' | 'choosing_next_tile';

export interface Tile {
  id: number;
  title: string;
  category: TileCategory;
  points: number;
  status: TileStatus;
}

export interface GameConfig {
  numPairs: number;
  pairNames: string[];
  targetScore: number;
  timerMinutes: number;
  avoidRepeatingPresenter: boolean;
}
