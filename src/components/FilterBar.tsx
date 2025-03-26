import { GameCategory, GameType, GameDuration, PlayerCount } from '@/types/Game';

interface FilterBarProps {
  selectedPlayers: PlayerCount | 'all';
  selectedCategories: GameCategory[];
  selectedTypes: GameType[];
  selectedDurations: GameDuration[];
  onPlayerChange: (player: PlayerCount | 'all') => void;
  onCategoryChange: (category: GameCategory) => void;
  onTypeChange: (type: GameType) => void;
  onDurationChange: (duration: GameDuration) => void;
  onReset: () => void;
}

export default function FilterBar({
  selectedPlayers,
  selectedCategories,
  selectedTypes,
  selectedDurations,
  onPlayerChange,
  onCategoryChange,
  onTypeChange,
  onDurationChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Players Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Players</h3>
          <div className="space-y-1">
            {(['all', '1', '2', '3', '4', '5', '6+'] as const).map((player) => (
              <label key={player} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="players"
                  value={player}
                  checked={selectedPlayers === player}
                  onChange={() => onPlayerChange(player)}
                  className="form-radio"
                />
                <span>{player === 'all' ? 'All' : player}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="space-y-1">
            {(['speed', 'memory', 'bluff', 'luck', 'guessing', 'fun', 'adventure', 'management', 'optimisation', 'battle', 'fold', 'observation'] as GameCategory[]).map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="form-checkbox"
                />
                <span className="capitalize">{category.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Types Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Types</h3>
          <div className="space-y-1">
            {(['board', 'cards', 'dice', 'fast_rules', 'cooperation'] as GameType[]).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onTypeChange(type)}
                  className="form-checkbox"
                />
                <span className="capitalize">{type.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Duration</h3>
          <div className="space-y-1">
            {(['short', 'mid', 'long'] as GameDuration[]).map((duration) => (
              <label key={duration} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDurations.includes(duration)}
                  onChange={() => onDurationChange(duration)}
                  className="form-checkbox"
                />
                <span>
                  {duration === 'short' ? '< 30min' : duration === 'mid' ? '30-60min' : '> 60min'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
} 