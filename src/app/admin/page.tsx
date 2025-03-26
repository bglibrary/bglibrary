'use client';

import { useState } from 'react';
import { Game, GameCategory, GameType, GameDuration, PlayerCount } from '@/types/Game';

export default function AdminPage() {
  const [game, setGame] = useState<Partial<Game>>({
    id: '',
    title: '',
    description: '',
    shortDescription: '',
    imageUrl: '',
    playerCount: '2',
    categories: [],
    types: [],
    duration: 'mid',
    bggUrl: '',
    addedDate: new Date().toISOString().split('T')[0],
    rating: undefined,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would typically:
    // 1. Validate the form data
    // 2. Create a commit to the repository with the new game data
    // 3. Show a success message
    console.log('Form submitted:', game);
  };

  const handleCategoryChange = (category: GameCategory) => {
    setGame(prev => ({
      ...prev,
      categories: prev.categories?.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...(prev.categories || []), category],
    }));
  };

  const handleTypeChange = (type: GameType) => {
    setGame(prev => ({
      ...prev,
      types: prev.types?.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...(prev.types || []), type],
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Game</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={game.title}
                  onChange={e => setGame(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <input
                  type="text"
                  value={game.shortDescription}
                  onChange={e => setGame(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Description</label>
                <textarea
                  value={game.description}
                  onChange={e => setGame(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={game.imageUrl}
                  onChange={e => setGame(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Game Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Players</label>
                <select
                  value={game.playerCount}
                  onChange={e => setGame(prev => ({ ...prev, playerCount: e.target.value as PlayerCount }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {(['1', '2', '3', '4', '5', '6+'] as PlayerCount[]).map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  value={game.duration}
                  onChange={e => setGame(prev => ({ ...prev, duration: e.target.value as GameDuration }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {(['short', 'mid', 'long'] as GameDuration[]).map(duration => (
                    <option key={duration} value={duration}>
                      {duration === 'short' ? '< 30min' : duration === 'mid' ? '30-60min' : '> 60min'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 gap-2">
              {(['speed', 'memory', 'bluff', 'luck', 'guessing', 'fun', 'adventure', 'management', 'optimisation', 'battle', 'fold', 'observation'] as GameCategory[]).map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={game.categories?.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Types */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Types</h2>
            <div className="grid grid-cols-2 gap-2">
              {(['board', 'cards', 'dice', 'fast_rules', 'cooperation'] as GameType[]).map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={game.types?.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">BoardGameGeek URL</label>
                <input
                  type="url"
                  value={game.bggUrl}
                  onChange={e => setGame(prev => ({ ...prev, bggUrl: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={game.rating || ''}
                  onChange={e => setGame(prev => ({ ...prev, rating: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={game.notes}
                  onChange={e => setGame(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Game
          </button>
        </div>
      </form>
    </main>
  );
} 