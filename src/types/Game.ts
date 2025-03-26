export type PlayerCount = '1' | '2' | '3' | '4' | '5' | '6+';

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
  | 'observation';

export type GameType =
  | 'board'
  | 'cards'
  | 'dice'
  | 'fast_rules'
  | 'cooperation';

export type GameDuration = 'short' | 'mid' | 'long';

export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  playerCount: PlayerCount;
  categories: GameCategory[];
  types: GameType[];
  duration: GameDuration;
  rulesUrl?: string;
  bggUrl?: string;
  addedDate: string;
  lastPlayed?: string;
  rating?: number;
  notes?: string;
} 