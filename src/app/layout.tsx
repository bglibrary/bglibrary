import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Board Game Collection",
  description: "A collection of board games with filtering and search capabilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen`}>
        <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16 px-4">
              <Link href="/" className="text-xl font-bold text-white hover:text-blue-100 transition-colors">
                Board Game Collection
              </Link>
              <div className="flex space-x-4">
                <Link
                  href="/admin"
                  className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-blue-500/20 hover:bg-blue-500/30"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
