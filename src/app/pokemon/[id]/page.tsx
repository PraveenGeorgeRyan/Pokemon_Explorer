'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPokemonDetail, PokemonDetail } from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

// Helper function to format Pokemon stats
const formatStatName = (stat: string): string => {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  return statMap[stat] || stat.replace('-', ' ');
};

// Helper function to get color based on Pokemon type
const getTypeColor = (type: string): string => {
  return `type-${type}`;
};

export default function PokemonDetailPage(): React.ReactNode {
  const params = useParams();
  const pokemonId = params.id as string;
  
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'moves'>('stats');
  const [isRotating, setIsRotating] = useState(false);
  const [animationType, setAnimationType] = useState<'rotate' | 'float' | 'bounce'>('float');

  useEffect(() => {
    async function fetchPokemonDetail(): Promise<void> {
      try {
        setIsLoading(true);
        const data = await getPokemonDetail(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError('Failed to fetch Pokemon details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemonDetail();
  }, [pokemonId]);

  const toggleAnimation = (): void => {
    if (!isRotating) {
      setIsRotating(true);
      setAnimationType('rotate');
    } else {
      // Cycle through animation types
      if (animationType === 'rotate') {
        setAnimationType('float');
      } else if (animationType === 'float') {
        setAnimationType('bounce');
      } else {
        setIsRotating(false);
        setAnimationType('float');
      }
    }
  };

  const getAnimationClass = (): string => {
    if (!isRotating) return '';
    switch (animationType) {
      case 'rotate': return 'animate-rotate';
      case 'float': return 'animate-float';
      case 'bounce': return 'animate-bounce-slow';
      default: return '';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !pokemon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error || 'Pokemon not found'}</span>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Homepage
        </Link>
      </div>
    );
  }

  // Format Pokemon name for display
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Get the official artwork image
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pokemon-pattern">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-6 shadow-md">
          &larr; Back to Homepage
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Pokemon Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{formattedName}</h1>
              <span className="text-xl font-semibold">#{pokemon.id}</span>
            </div>
          </div>

          <div className="md:flex">
            {/* Pokemon Image */}
            <div className="md:w-1/3 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 rounded-lg m-4">
              <div className="relative h-64 w-64 cursor-pointer" onClick={toggleAnimation}>
                <Image
                  src={imageUrl}
                  alt={formattedName}
                  fill
                  className={`object-contain transition-all duration-300 ${getAnimationClass()}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
                Click on the Pokémon to {isRotating ? 'change animation' : 'animate'}!
              </p>
            </div>

            {/* Pokemon Details */}
            <div className="md:w-2/3 p-6">
              {/* Basic Info */}
              <div className="mb-6 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Basic Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">Height</p>
                    <p className="font-medium text-gray-800 dark:text-white">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">Weight</p>
                    <p className="font-medium text-gray-800 dark:text-white">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </div>

              {/* Types */}
              <div className="mb-6 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={`type-${typeInfo.type.name} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div className="mb-6 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((abilityInfo) => (
                    <span
                      key={abilityInfo.ability.name}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {abilityInfo.ability.name.replace('-', ' ')}
                      {abilityInfo.is_hidden && ' (Hidden)'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs for Stats and Moves */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'stats'
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Stats
                  </button>
                  <button
                    onClick={() => setActiveTab('moves')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'moves'
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Moves
                  </button>
                </nav>
              </div>

              {/* Stats Tab Content */}
              {activeTab === 'stats' && (
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Base Stats</h2>
                  <div className="space-y-4">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{formatStatName(stat.stat.name)}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Moves Tab Content */}
              {activeTab === 'moves' && (
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Moves</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {pokemon.moves.slice(0, 15).map((moveInfo) => (
                      <span
                        key={moveInfo.move.name}
                        className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded text-sm capitalize"
                      >
                        {moveInfo.move.name.replace('-', ' ')}
                      </span>
                    ))}
                    {pokemon.moves.length > 15 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                        +{pokemon.moves.length - 15} more moves
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
