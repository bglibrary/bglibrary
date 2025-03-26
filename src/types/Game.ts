export type PlayerCount = string;

export type GameCategory =
  | 'speed'
  | 'memory'
  | 'bluff'
  | 'luck'
  | 'guessing'
  | 'fun'
  | 'adventure'
  | 'management'
  | 'optimisation'
  | 'battle'
  | 'fold'
  | 'observation'
  | 'knowledge';

export type GameType =
  | 'board'
  | 'cards'
  | 'dice'
  | 'fast_rules'
  | 'cooperation';

export type GameDuration = 'short' | 'mid' | 'long';

export interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  playerCount: PlayerCount;
  categories: GameCategory[];
  types: GameType[];
  duration: GameDuration;
  rulesUrl?: string;
  videoUrl?: string;
  addedDate: string;
  lastPlayed?: string;
  notes?: string;
} 