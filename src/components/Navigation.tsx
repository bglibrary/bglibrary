'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-indigo-100">
            BG Library
          </Link>
          {!isHome && (
            <Link
              href="/"
              className="text-sm text-white hover:text-indigo-100 flex items-center"
            >
              ← Retour à l'accueil
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 