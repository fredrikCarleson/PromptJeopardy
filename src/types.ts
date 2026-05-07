export type GameState = 'setup' | 'playing';

export type TileTopic =
  | 'Forsta rapporten'
  | 'Klarsprak'
  | 'Analysera'
  | 'Skapa material'
  | 'Data och bild';

export type PointValue = 100 | 200 | 300 | 400 | 500;

export type ToolFocus = 'M365 Copilot' | 'ChatGPT 5.x' | 'Valfritt verktyg';

export type AppFocus =
  | 'Copilot Chat'
  | 'Word'
  | 'PowerPoint'
  | 'Excel'
  | 'Outlook'
  | 'Images'
  | 'Teams'
  | 'ChatGPT';

export type TileStatus = 'unplayed' | 'active' | 'completed';

export type RoundPhase = 'selecting_tile' | 'working' | 'presenting' | 'choosing_next_tile';

export interface Tile {
  id: number;
  topic: TileTopic;
  points: PointValue;
  title: string;
  shortLabel: string;
  task: string;
  toolFocus: ToolFocus;
  appFocus: AppFocus;
  learningGoal: string;
  sourceInstruction: string;
  verbalPresentationPrompt: string[];
  status: TileStatus;
}

export interface GameConfig {
  numPairs: number;
  pairNames: string[];
  targetScore: number;
  timerMinutes: number;
  presentationSeconds: number;
  avoidRepeatingPresenter: boolean;
}
