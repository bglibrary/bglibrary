import Link from 'next/link';
import { Game } from '@/types/Game';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const playerCountText = game.playerMin === game.playerMax 
    ? `${game.playerMin}`
    : `${game.playerMin} - ${game.playerMax}`;

  return (
    <Link href={`/games/${game.slug}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-indigo-100 hover:border-indigo-200">
        <div className="relative h-32">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{game.title}</h3>
          <div className="flex items-center text-xs text-indigo-600 space-x-2">
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>{playerCountText}</span>
            </div>
            <span>•</span>
            <span>{game.duration === 'short' ? '< 30min' : game.duration === 'mid' ? '30-60min' : '> 60min'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 