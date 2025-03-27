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
  | "adventure"
  | "optimisation"
  | "fold"
  | "management"
  | "speed"
  | "observation"
  | "bluff"
  | "battle"
  | "fun"
  | "guessing"
  | "knowledge"
  | "luck"
  | "memory";

export type GameType =
  | "board"
  | "cards"
  | "cooperation"
  | "fast_rules"
  | "dice";

export type GameDuration = "short" | "mid" | "long";

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

// Mapping des catégories techniques vers leurs noms en français
export const categoryLabels: Record<GameCategory, string> = {
  adventure: "Aventure",
  optimisation: "Optimisation",
  fold: "Plis",
  management: "Gestion & Dévelopement",
  speed: "Rapidité",
  observation: "Observation",
  bluff: "Bluff",
  battle: "Bataille",
  fun: "Fun",
  guessing: "Devinettes",
  knowledge: "Connaissance",
  luck: "Hasard",
  memory: "Mémoire"
};

// Mapping des types techniques vers leurs noms en français
export const typeLabels: Record<GameType, string> = {
  board: "Plateau",
  cards: "Cartes",
  cooperation: "Coopératif",
  fast_rules: "Règles rapides",
  dice: "Dés"
};

// Mapping des durées techniques vers leurs noms en français
export const durationLabels: Record<GameDuration, string> = {
  short: "< 30min",
  mid: "30-60min",
  long: "> 60min"
}; 