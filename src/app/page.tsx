'use client';

import { useState, useEffect } from 'react';
import { getPokemonList } from './utils/api';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [filteredList, setFilteredList] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the list of Pokemon when the component mounts
  useEffect(() => {
    async function fetchPokemon() {
      try {
        setIsLoading(true);
        const data = await getPokemonList(151); // Fetch the original 151 Pokemon
        setPokemonList(data.results);
        setFilteredList(data.results);
      } catch (err) {
        setError('Failed to fetch Pokemon. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredList(pokemonList);
      return;
    }

    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-red-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Pokémon Explorer</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredList.length > 0 ? (
              filteredList.map((pokemon) => (
                <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
                No Pokémon found matching your search.
              </p>
            )}
          </div>
        )}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PokéAPI</a></p>
        </div>
      </footer>
    </div>
  );
}
