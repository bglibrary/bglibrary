'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import FilterBar from '@/components/FilterBar';
import gamesData from '@/data/games.json';
import { Game, GameCategory, GameType, GameDuration } from '@/types/Game';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<GameCategory[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<GameType[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<GameDuration | null>(null);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  // Fonction pour mélanger un tableau
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Mélanger les jeux uniquement au chargement initial
  useEffect(() => {
    setAllGames(shuffleArray(gamesData.games as Game[]));
  }, []); // Tableau de dépendances vide = exécution uniquement au montage

  // Filtrer les jeux en fonction des critères sélectionnés
  useEffect(() => {
    const filtered = allGames.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlayerCount = !selectedPlayerCount || 
        (game.playerMin <= selectedPlayerCount && game.playerMax >= selectedPlayerCount);
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.every(category => game.categories.includes(category));
      const matchesTypes = selectedTypes.length === 0 || 
        selectedTypes.every(type => game.types.includes(type));
      const matchesDuration = !selectedDuration || game.duration === selectedDuration;

      return matchesSearch && matchesPlayerCount && matchesCategories && matchesTypes && matchesDuration;
    });
    setFilteredGames(filtered);
  }, [allGames, searchTerm, selectedPlayerCount, selectedCategories, selectedTypes, selectedDuration]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Bibliothèque de Jeux</h1>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPlayerCount={selectedPlayerCount}
        onPlayerCountChange={setSelectedPlayerCount}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        selectedTypes={selectedTypes}
        onTypeChange={setSelectedTypes}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
      />

      <div className="text-center text-gray-600 mb-6">
        Affichage de {filteredGames.length} sur {gamesData.games.length} jeux
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
