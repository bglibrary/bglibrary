import { GameCategory, GameType, GameDuration, categoryLabels, typeLabels, durationLabels } from '@/types/Game';

const CATEGORIES: GameCategory[] = ['speed', 'memory', 'bluff', 'luck', 'guessing', 'fun', 'adventure', 'management', 'optimisation', 'battle', 'fold', 'observation', 'knowledge'];
const TYPES: GameType[] = ['board', 'cards', 'dice', 'fast_rules', 'cooperation'];

const playerCountOptions = [
  { value: 1, label: '1 joueur' },
  { value: 2, label: '2 joueurs' },
  { value: 3, label: '3 joueurs' },
  { value: 4, label: '4 joueurs' },
  { value: 5, label: '5 joueurs' },
  { value: 6, label: '6 joueurs' },
  { value: 7, label: '7 joueurs' },
  { value: 8, label: '8 joueurs' },
  { value: 9, label: 'Plus de 8 joueurs' }
];

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlayerCount: number | null;
  onPlayerCountChange: (value: number | null) => void;
  selectedCategories: GameCategory[];
  onCategoryChange: (categories: GameCategory[]) => void;
  selectedTypes: GameType[];
  onTypeChange: (types: GameType[]) => void;
  selectedDuration: GameDuration | null;
  onDurationChange: (duration: GameDuration | null) => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedPlayerCount,
  onPlayerCountChange,
  selectedCategories,
  onCategoryChange,
  selectedTypes,
  onTypeChange,
  selectedDuration,
  onDurationChange,
}: FilterBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleCategoryChange = (category: GameCategory) => {
    onCategoryChange(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  const handleTypeChange = (type: GameType) => {
    onTypeChange(
      selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes, type]
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 border border-indigo-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedPlayerCount || ''}
              onChange={(e) => onPlayerCountChange(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            >
              <option value="">Tous les joueurs</option>
              {playerCountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedDuration || ''}
              onChange={(e) => onDurationChange(e.target.value as GameDuration || null)}
              className="px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            >
              <option value="">Toutes les durées</option>
              {Object.entries(durationLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 border border-indigo-100">
          <h3 className="text-sm font-medium text-indigo-700 mb-2">Catégories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{categoryLabels[category]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 border border-indigo-100">
          <h3 className="text-sm font-medium text-indigo-700 mb-2">Types</h3>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{typeLabels[type]}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 