import { GameCategory, GameType, GameDuration } from '@/types/Game';

const CATEGORIES: GameCategory[] = ['speed', 'memory', 'bluff', 'luck', 'guessing', 'fun', 'adventure', 'management', 'optimisation', 'battle', 'fold', 'observation'];
const TYPES: GameType[] = ['board', 'cards', 'dice', 'fast_rules', 'cooperation'];
const PLAYER_COUNTS = ['1', '2', '2 à 3', '2 à 4', '2 à 5', '2 à 6', '2 à 8', '2 à 10', '3 à 4', '3 à 5', '3 à 6', '4 à 6', '4 à 8', '5 à 8'];

interface FilterBarProps {
  filters: {
    players: string;
    categories: GameCategory[];
    types: GameType[];
    duration: GameDuration | '';
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (category: GameCategory) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category],
    });
  };

  const handleTypeChange = (type: GameType) => {
    onFilterChange({
      ...filters,
      types: filters.types.includes(type)
        ? filters.types.filter(t => t !== type)
        : [...filters.types, type],
    });
  };

  const handleDurationChange = (duration: GameDuration) => {
    onFilterChange({
      ...filters,
      duration: filters.duration === duration ? '' : duration,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 border border-indigo-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search games..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filters.players}
              onChange={(e) => onFilterChange({ ...filters, players: e.target.value })}
              className="px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            >
              <option value="">All Players</option>
              {PLAYER_COUNTS.map((count) => (
                <option key={count} value={count}>
                  {count} Players
                </option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => handleDurationChange(e.target.value as GameDuration)}
              className="px-3 py-2 border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
            >
              <option value="">All Durations</option>
              <option value="short">Short (&lt; 30min)</option>
              <option value="mid">Medium (30-60min)</option>
              <option value="long">Long (&gt; 60min)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 border border-indigo-100">
          <h3 className="text-sm font-medium text-indigo-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
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
                  checked={filters.types.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 