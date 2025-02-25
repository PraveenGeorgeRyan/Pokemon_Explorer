// This file contains functions to fetch data from the PokeAPI

// Define types for the API responses
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
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
 * @param limit - Number of Pokemon to fetch
 * @param offset - Starting position for pagination
 * @returns Promise with the Pokemon list data
 */
export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  // Using the built-in fetch API to make a GET request
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }
  
  // Parse the JSON response
  const data = await response.json();
  return data;
}

/**
 * Fetches detailed information about a specific Pokemon
 * @param nameOrId - The name or ID of the Pokemon
 * @returns Promise with the Pokemon details
 */
export async function getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}
