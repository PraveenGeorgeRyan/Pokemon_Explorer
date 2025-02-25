// This file contains functions to fetch data from the PokeAPI

// Types for Pokemon API responses
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

// Base URL for the PokeAPI
const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a list of Pokemon from the PokeAPI
 * @param limit Number of Pokemon to fetch (default: 151 - original Pokemon)
 * @returns Array of Pokemon list items
 */
export async function getPokemonList(limit: number = 151): Promise<PokemonListItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
    }
    
    const data: PokemonListResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return []; // Return empty array instead of throwing to prevent app crashes
  }
}

/**
 * Fetches detailed information about a specific Pokemon
 * @param idOrName Pokemon ID or name
 * @returns Detailed Pokemon information
 */
export async function getPokemonDetail(idOrName: string): Promise<PokemonDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon detail: ${response.status}`);
    }
    
    const data: PokemonDetail = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon detail for ${idOrName}:`, error);
    throw error; // We need to throw here so the UI can show an error message
  }
}
