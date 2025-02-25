# Pokémon Explorer

A modern, responsive web application that allows users to explore information about Pokémon using data from the PokéAPI.

![Pokémon Explorer](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## Overview

This application was developed as part of a full-stack developer assignment. It demonstrates proficiency in:

- Modern React development with Next.js
- TypeScript for type safety
- Responsive UI design with Tailwind CSS
- API integration and data fetching
- State management and component architecture

## Features

- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Pokémon Listing**: Browse through Pokémon with pagination
- **Search Functionality**: Filter Pokémon by name in real-time
- **Detailed Information**: View comprehensive details about each Pokémon
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Technology Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: PokéAPI (https://pokeapi.co/)

## Project Structure

```
pokemon_explorer/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── components/       # Reusable UI components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── PokemonCard.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── pokemon/          # Pokemon detail page routes
│   │   │   └── [id]/         # Dynamic route for Pokemon details
│   │   ├── utils/            # Utility functions
│   │   │   └── api.ts        # API integration with PokéAPI
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Homepage component
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Installation and Setup

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Steps to Run the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/PraveenGeorgeRyan/Pokemon_Explorer.git
   cd pokemon_explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Development Approach

This application was built with a focus on:

1. **Component Reusability**: Creating modular components that can be reused throughout the application
2. **Type Safety**: Using TypeScript to ensure type correctness and improve developer experience
3. **Performance Optimization**: Implementing efficient data fetching and rendering strategies
4. **User Experience**: Designing an intuitive and visually appealing interface
5. **Code Quality**: Writing clean, maintainable code with proper documentation

## Deployment

The application was deployed to Vercel with minimal configuration.

## Future Enhancements

- Add pagination for browsing more Pokémon
- Implement advanced filtering by type, ability, etc.
- Add favorites functionality with local storage
- Implement server-side rendering for improved SEO and performance

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon data
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
