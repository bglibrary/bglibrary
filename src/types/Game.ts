export type PlayerCount =
  | '1'
  | '2'
  | '2 à 3'
  | '2 à 4'
  | '2 à 5'
  | '2 à 6'
  | '2 à 8'
  | '2 à 10'
  | '3 à 4'
  | '3 à 5'
  | '3 à 6'
  | '4 à 6'
  | '4 à 8'
  | '5 à 8';

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
  playerMin: number;
  playerMax: number;
  categories: GameCategory[];
  types: GameType[];
  duration: GameDuration;
  rulesUrl?: string;
  videoUrl?: string;
  addedDate: string;
  lastPlayed?: string;
  notes?: string;
} 