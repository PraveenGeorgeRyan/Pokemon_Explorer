'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPokemonDetail, PokemonDetail } from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    const animations: Array<'rotate' | 'float' | 'bounce'> = ['rotate', 'float', 'bounce'];
    const currentIndex = animations.indexOf(animationType);
    const nextIndex = (currentIndex + 1) % animations.length;
    setAnimationType(animations[nextIndex]);
    
    if (animations[nextIndex] === 'rotate') {
      setIsRotating(true);
    } else {
      setIsRotating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center pokemon-pattern">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pokemon-pattern p-4">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error || 'Pokemon not found'}</p>
          <Link href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const getAnimationClass = (): string => {
    switch (animationType) {
      case 'rotate':
        return 'animate-spin-slow';
      case 'float':
        return 'animate-float';
      case 'bounce':
        return 'animate-bounce';
      default:
        return 'animate-float';
    }
  };

  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };
    
    return typeColors[type.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen pokemon-pattern p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-700">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div 
                  className={`relative w-48 h-48 bg-slate-700/50 rounded-full flex items-center justify-center p-4 mb-6 cursor-pointer ${isRotating ? 'animate-spin-slow' : getAnimationClass()}`}
                  onClick={toggleAnimation}
                >
                  <Image
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="object-contain"
                    priority
                  />
                </div>
                
                <div className="flex gap-2 mb-4">
                  {pokemon.types.map((typeInfo, index) => (
                    <span 
                      key={index} 
                      className={`${getTypeColor(typeInfo.type.name)} px-3 py-1 rounded-full text-white text-sm font-medium capitalize`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</div>
                  <h1 className="text-3xl font-bold text-white capitalize">{pokemon.name}</h1>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center w-full">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Height</div>
                    <div className="text-white font-medium">{pokemon.height / 10} m</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Weight</div>
                    <div className="text-white font-medium">{pokemon.weight / 10} kg</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex border-b border-slate-700 mb-4">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('stats')}
                  >
                    Stats
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'moves' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('moves')}
                  >
                    Moves
                  </button>
                </div>
                
                {activeTab === 'stats' ? (
                  <div className="space-y-4">
                    {pokemon.stats.map((stat, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">{formatStatName(stat.stat.name)}</span>
                          <span className="text-sm font-medium text-white">{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white mb-2">Abilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.abilities.map((ability, index) => (
                          <span 
                            key={index} 
                            className={`bg-slate-700 px-3 py-1 rounded-full text-white text-sm capitalize ${ability.is_hidden ? 'border border-yellow-500' : ''}`}
                          >
                            {ability.ability.name.replace('-', ' ')}
                            {ability.is_hidden && <span className="ml-1 text-yellow-500">(Hidden)</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-2">
                      {pokemon.moves.slice(0, 20).map((moveInfo, index) => (
                        <div 
                          key={index} 
                          className="bg-slate-700/50 px-3 py-2 rounded-lg text-white text-sm capitalize"
                        >
                          {moveInfo.move.name.replace('-', ' ')}
                        </div>
                      ))}
                    </div>
                    {pokemon.moves.length > 20 && (
                      <div className="text-center mt-4 text-gray-400 text-sm">
                        Showing 20 of {pokemon.moves.length} moves
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 p-4 flex justify-between items-center">
            <Link 
              href={`/pokemon/${Number(pokemonId) - 1}`}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${Number(pokemonId) <= 1 ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              aria-disabled={Number(pokemonId) <= 1}
              onClick={(e) => Number(pokemonId) <= 1 && e.preventDefault()}
            >
              Previous
            </Link>
            
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors duration-200"
            >
              Back to List
            </Link>
            
            <Link 
              href={`/pokemon/${Number(pokemonId) + 1}`}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${Number(pokemonId) >= 151 ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              aria-disabled={Number(pokemonId) >= 151}
              onClick={(e) => Number(pokemonId) >= 151 && e.preventDefault()}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
