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

export function generateStaticParams() {
  return gamesData.games.map((game) => ({
    slug: game.id,
  }));
}

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData.games.find((g) => g.id === params.slug);

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
              src={game.imageUrl}
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
                <p className="text-gray-900">{durationMap[game.duration as GameDuration]}</p>
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
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 mb-2">Rating</h2>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="ml-1 text-gray-900">{game.rating}/10</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-500 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{game.description}</p>
            </div>
            {game.bggUrl && (
              <div className="mt-6">
                <a
                  href={game.bggUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  View on BoardGameGeek →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 