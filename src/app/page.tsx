'use client';

import { useState } from 'react';
import GameCard from '@/components/GameCard';
import FilterBar from '@/components/FilterBar';
import gamesData from '@/data/games.json';
import { Game, GameCategory, GameType, GameDuration } from '@/types/Game';

export default function Home() {
  const [filters, setFilters] = useState({
    players: '',
    categories: [] as GameCategory[],
    types: [] as GameType[],
    duration: '' as GameDuration | '',
    search: '',
  });

  const filteredGames = gamesData.games.filter((game) => {
    // Search filter
    if (filters.search && !game.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Player count filter
    if (filters.players && game.playerCount !== filters.players) {
      return false;
    }

    // Categories filter
    if (filters.categories.length > 0 && !filters.categories.some(cat => game.categories.includes(cat))) {
      return false;
    }

    // Types filter
    if (filters.types.length > 0 && !filters.types.some(type => game.types.includes(type))) {
      return false;
    }

    // Duration filter
    if (filters.duration && game.duration !== filters.duration) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredGames.length} of {gamesData.games.length} games
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
