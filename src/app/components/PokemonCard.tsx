'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract the Pokemon ID from the URL
  const id = url.split('/').filter(Boolean).pop();
  
  // Format the Pokemon name to be more readable
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Image URL for the Pokemon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link href={`/pokemon/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
          <Image
            src={imageUrl}
            alt={formattedName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-contain p-4 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="font-semibold text-lg mb-1">{formattedName}</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">#{id}</div>
        </div>
      </div>
    </Link>
  );
}
