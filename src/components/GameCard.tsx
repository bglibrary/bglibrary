import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/Game';
import { UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const playerCountText = game.playerMin === game.playerMax 
    ? `${game.playerMin}`
    : `${game.playerMin} - ${game.playerMax}`;

  const durationText = game.duration === 'short' ? '< 30min' : game.duration === 'mid' ? '30-60min' : '> 60min';

  return (
    <Link href={`/games/${game.slug}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-indigo-100 hover:border-indigo-200">
        <div className="relative w-full aspect-square bg-gray-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={game.image}
              alt={game.title}
              width={300}
              height={300}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{game.title}</h3>
          <div className="flex items-center text-xs text-indigo-600 space-x-2">
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>{playerCountText}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>{durationText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 