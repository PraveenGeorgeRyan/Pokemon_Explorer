'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setIsSearching(true);
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
          const data = await response.json();
          const filteredResults = data.results.filter((pokemon: any) => 
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).slice(0, 3); // Limit to only 3 results
          setSearchResults(filteredResults);
        } catch (error) {
          console.error('Error searching Pokémon:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Call the onSearch prop whenever searchTerm changes
  useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleResultClick = (pokemonName: string) => {
    // Find the ID based on the name
    const getPokemonId = (name: string) => {
      // This is a simplified approach. In a real app, you would fetch this from the API
      const pokemonList = [
        'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
        'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree'
      ];
      const index = pokemonList.findIndex(p => p === name.toLowerCase());
      return index >= 0 ? index + 1 : 1; // Default to 1 if not found
    };
    
    const id = getPokemonId(pokemonName);
    router.push(`/pokemon/${id}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-16"> {/* Added margin bottom */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon..."
            className="w-full py-3 px-4 pl-12 rounded-full bg-slate-800/50 text-white border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
          <ul>
            {searchResults.map((result, index) => (
              <li 
                key={index}
                onClick={() => handleResultClick(result.name)}
                className="px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors duration-200 capitalize border-b border-slate-700 last:border-b-0 text-white"
              >
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isSearching && (
        <div className="absolute z-50 mt-2 w-full bg-slate-800 rounded-lg shadow-lg p-4 text-center text-white">
          Searching...
        </div>
      )}
    </div>
  );
}
