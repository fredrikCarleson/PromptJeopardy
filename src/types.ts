export type GameState = 'setup' | 'playing';

export type TileTopic =
  | 'Forsta rapporten'
  | 'Klarsprak'
  | 'Analysera'
  | 'Skapa material'
  | 'Data och bild';

export type PointValue = 100 | 200 | 300 | 400 | 500;

export type ToolFocus = 'Microsoft 365 Copilot Chat';

export type AppFocus =
  | 'Copilot Chat'
  | 'Copilot Chat -> OneDrive/SharePoint/Search'
  | 'Copilot Chat -> OneDrive/SharePoint'
  | 'Copilot Chat -> klarspråkstext'
  | 'Copilot Chat -> klarspråksgranskning'
  | 'Copilot Chat -> Word-dokument'
  | 'Copilot Chat -> arbetskontext'
  | 'Copilot Chat -> dokumentunderlag'
  | 'Copilot Chat -> PowerPoint'
  | 'Copilot Chat -> bild + PowerPoint'
  | 'Copilot Chat -> Excel'
  | 'Copilot Chat -> bild';

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
  mode: 'guided_workshop' | 'open_board';
  numPairs: number;
  pairNames: string[];
  targetScore: number;
  timerMinutes: number;
  presentationSeconds: number;
  avoidRepeatingPresenter: boolean;
  plannedTileIds: number[];
}
