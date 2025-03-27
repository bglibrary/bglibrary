import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gamesData from "@/data/games.json";
import { Game, GameCategory, GameType, GameDuration, categoryLabels, typeLabels, durationLabels } from "@/types/Game";
import { UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const slug = await Promise.resolve(params.slug);
  const game = gamesData.games.find((g) => g.slug === slug) as Game | undefined;

  if (!game) {
    notFound();
  }

  const playerCountText = game.playerMin === game.playerMax 
    ? `${game.playerMin}`
    : `${game.playerMin} - ${game.playerMax}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-indigo-100">
        <div className="md:flex">
          <div className="md:w-1/2 relative aspect-square bg-gray-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={game.image}
                alt={game.title}
                width={500}
                height={500}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{game.title}</h1>
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Retour à la collection
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Joueurs</h2>
                <div className="flex items-center text-indigo-600 space-x-1">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>{playerCountText}</span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Durée</h2>
                <div className="flex items-center text-indigo-600 space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{durationLabels[game.duration]}</span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Catégories</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {game.categories.map((category: GameCategory) => (
                    <span key={category} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {categoryLabels[category]}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Types</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {game.types.map((type: GameType) => (
                    <span key={type} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {typeLabels[type]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-500 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{game.shortDescription}</p>
            </div>
            {(game.rulesUrl || game.videoUrl) && (
              <div className="mt-6 space-y-2">
                {game.rulesUrl && (
                  <a
                    href={game.rulesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    Voir les règles PDF →
                  </a>
                )}
                {game.videoUrl && (
                  <a
                    href={game.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    Voir la vidéo des règles →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 