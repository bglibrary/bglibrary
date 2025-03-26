import { notFound } from "next/navigation";
import Link from "next/link";
import gamesData from "@/data/games.json";
import { GameDuration } from "@/types/Game";

interface GamePageProps {
  params: {
    slug: string;
  };
}

const durationMap: Record<GameDuration, string> = {
  short: "< 30 minutes",
  mid: "30-60 minutes",
  long: "> 60 minutes",
};

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData.games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={game.image}
              alt={game.title}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{game.title}</h1>
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Back to Collection
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Players</h2>
                <p className="text-gray-900">{game.playerCount}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Duration</h2>
                <p className="text-gray-900">{durationMap[game.duration]}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Categories</h2>
                <p className="text-gray-900">{game.categories.join(", ")}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Types</h2>
                <p className="text-gray-900">{game.types.join(", ")}</p>
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
                    className="block text-blue-500 hover:text-blue-700"
                  >
                    View Rules PDF →
                  </a>
                )}
                {game.videoUrl && (
                  <a
                    href={game.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-500 hover:text-blue-700"
                  >
                    Watch Rules Video →
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