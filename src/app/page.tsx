'use client';

import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { getPokemonList } from './utils/api';
import type { PokemonListItem } from './utils/api';

export default function Home(): React.ReactNode {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await getPokemonList(151);
        setAllPokemon(data);
        setFilteredPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPokemon(allPokemon);
    } else {
      const filtered = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [searchTerm, allPokemon]);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };
  
  const getPokemonTypes = (id: number): string[] => {
    const typeMap: Record<number, string[]> = {
      1: ['Grass', 'Poison'], 
      2: ['Grass', 'Poison'], 
      3: ['Grass', 'Poison'], 
      4: ['Fire'], 
      5: ['Fire'], 
      6: ['Fire', 'Flying'], 
      7: ['Water'], 
      8: ['Water'], 
      9: ['Water'], 
    };
    
    return typeMap[id] || ['Normal'];
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pokemon-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text animate-float">
            Pokémon Explorer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover and learn about your favorite Pokémon
          </p>
        </div>
        
        <div className="relative mb-12"> 
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map(pokemon => {
                const pokemonId = allPokemon.findIndex(p => p.name === pokemon.name) + 1;
                return (
                  <PokemonCard 
                    key={pokemonId} 
                    id={pokemonId} 
                    name={pokemon.name} 
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    types={getPokemonTypes(pokemonId)}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-lg text-gray-600 dark:text-gray-300">No Pokémon found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
