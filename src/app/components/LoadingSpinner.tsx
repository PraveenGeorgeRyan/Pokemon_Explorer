import React from 'react';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pokemon-pattern bg-opacity-90 dark:bg-opacity-90 z-50">
      <div className="relative">
        <div className="w-32 h-32 relative animate-bounce-slow">
          <Image 
            src="/assets/images/pokeball.png" 
            alt="Pokéball" 
            width={128} 
            height={128} 
            className="animate-rotate"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse-slow"></div>
          </div>
        </div>
        
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-black/20 dark:bg-white/20 rounded-full filter blur-sm animate-pulse-slow"></div>
      </div>
      
      <p className="mt-12 text-xl font-bold text-gray-800 dark:text-white animate-pulse-slow">Catching Pokémon...</p>
    </div>
  );
}
