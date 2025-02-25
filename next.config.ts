import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.pokemon.com',
        pathname: '/assets/cms2/img/pokedex/**',
      },
    ],
  },
};

export default nextConfig;
