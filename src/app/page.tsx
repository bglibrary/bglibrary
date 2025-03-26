'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import FilterBar from '@/components/FilterBar';
import { Game, GameCategory, GameType, GameDuration, PlayerCount } from '@/types/Game';
import gamesData from '@/data/games.json';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerCount | 'all'>('all');
  const [selectedCategories, setSelectedCategories] = useState<GameCategory[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<GameType[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<GameDuration[]>([]);

  useEffect(() => {
    // Cast the games data to match our types
    const typedGames = gamesData.games.map(game => ({
      ...game,
      playerCount: game.playerCount as PlayerCount,
      categories: game.categories as GameCategory[],
      types: game.types as GameType[],
      duration: game.duration as GameDuration,
    }));
    setGames(typedGames);
    setFilteredGames(typedGames);
  }, []);

  useEffect(() => {
    let filtered = [...games];

    // Filter by players
    if (selectedPlayers !== 'all') {
      filtered = filtered.filter(game => game.playerCount === selectedPlayers);
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(game =>
        selectedCategories.some(category => game.categories.includes(category))
      );
    }

    // Filter by types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(game =>
        selectedTypes.some(type => game.types.includes(type))
      );
    }

    // Filter by duration
    if (selectedDurations.length > 0) {
      filtered = filtered.filter(game =>
        selectedDurations.includes(game.duration)
      );
    }

    setFilteredGames(filtered);
  }, [selectedPlayers, selectedCategories, selectedTypes, selectedDurations, games]);

  const handlePlayerChange = (player: PlayerCount | 'all') => {
    setSelectedPlayers(player);
  };

  const handleCategoryChange = (category: GameCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type: GameType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleDurationChange = (duration: GameDuration) => {
    setSelectedDurations(prev =>
      prev.includes(duration)
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  const handleReset = () => {
    setSelectedPlayers('all');
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedDurations([]);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Board Game Collection</h1>
      
      <FilterBar
        selectedPlayers={selectedPlayers}
        selectedCategories={selectedCategories}
        selectedTypes={selectedTypes}
        selectedDurations={selectedDurations}
        onPlayerChange={handlePlayerChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onDurationChange={handleDurationChange}
        onReset={handleReset}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No games found matching your filters.
        </div>
      )}
    </main>
  );
}
