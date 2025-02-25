import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types?: string[];
}

export default function PokemonCard({ id, name, types = [] }: PokemonCardProps) {
  const paddedId = String(id).padStart(3, '0');
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
  const mainType = types.length > 0 ? types[0].toLowerCase() : 'normal';

  return (
    <Link href={`/pokemon/${id}`}>
      <div className={`pokemon-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 pokemon-card-bg-${mainType}`}>
        <div className="relative w-full pt-[100%] overflow-hidden bg-slate-800/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={name}
              width={150}
              height={150}
              className="w-3/4 h-3/4 object-contain transform transition-transform duration-300 hover:scale-110 z-10"
              priority
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-black/20 dark:bg-white/20 rounded-full filter blur-sm"></div>
          </div>
        </div>
        <div className="p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold capitalize">{name}</h2>
            <span className="text-sm font-semibold text-gray-300">#{id}</span>
          </div>
          {types.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {types.map((type) => (
                <span 
                  key={type} 
                  className={`type-pill type-${type.toLowerCase()}`}
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
