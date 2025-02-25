import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound(): React.ReactNode {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pokemon-pattern">
      <div className="max-w-3xl w-full bg-slate-800/70 rounded-2xl p-8 text-center shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-500">404 - Not Found!</h1>
        
        <div className="relative w-full max-w-md mx-auto my-8">
          <Image 
            src="/assets/images/ash throwing pokeball.jpg" 
            alt="Ash throwing a Pokéball" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg"
          />
          <div className="absolute -top-4 -right-4 w-24 h-24 animate-bounce-slow">
            <Image 
              src="/assets/images/pokeball.png" 
              alt="Pokéball" 
              width={96} 
              height={96} 
              className="animate-rotate"
            />
          </div>
        </div>
        
        <p className="text-xl mb-8 text-gray-300">
          Oops! Looks like the Pokémon you&apos;re looking for has escaped into the tall grass!
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors duration-300"
        >
          Return to Pokédex
        </Link>
      </div>
    </div>
  );
}
