'use client';

import { useState, useEffect } from 'react';
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
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return typeColors[type] || 'bg-gray-400';
};

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonId = params.id as string;
  
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'moves'>('stats');

  useEffect(() => {
    async function fetchPokemonDetail() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          &larr; Back to Homepage
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Pokemon Header */}
          <div className="bg-red-600 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{formattedName}</h1>
              <span className="text-xl font-semibold">#{pokemon.id}</span>
            </div>
          </div>

          <div className="md:flex">
            {/* Pokemon Image */}
            <div className="md:w-1/3 p-6 flex justify-center items-center bg-gray-100 dark:bg-gray-700">
              <div className="relative h-64 w-64">
                <Image
                  src={imageUrl}
                  alt={formattedName}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Pokemon Details */}
            <div className="md:w-2/3 p-6">
              {/* Basic Info */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Basic Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Height</p>
                    <p className="font-medium">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Weight</p>
                    <p className="font-medium">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </div>

              {/* Types */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Types</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={`${getTypeColor(typeInfo.type.name)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((abilityInfo) => (
                    <span
                      key={abilityInfo.ability.name}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
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

              {/* Tab Content */}
              {activeTab === 'stats' ? (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
                  <div className="space-y-3">
                    {pokemon.stats.map((statInfo) => (
                      <div key={statInfo.stat.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{formatStatName(statInfo.stat.name)}</span>
                          <span>{statInfo.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Moves</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {pokemon.moves.slice(0, 15).map((moveInfo) => (
                      <span
                        key={moveInfo.move.name}
                        className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm"
                      >
                        {moveInfo.move.name.replace('-', ' ')}
                      </span>
                    ))}
                    {pokemon.moves.length > 15 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                        + {pokemon.moves.length - 15} more moves
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
