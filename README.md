# Pokémon Explorer

<div align="center">
  <img src="public/assets/images/pikachu and ash.jpg" alt="Pokémon Explorer" width="600" />
</div>

A modern, responsive web application that allows users to explore information about Pokémon using data from the PokéAPI.

## Live Demo

The application is deployed and can be accessed at: [https://pokemon-explorer-two.vercel.app/](https://pokemon-explorer-two.vercel.app/)

## Overview

This application was developed as part of a full-stack developer assignment. It demonstrates proficiency in:

- Modern React development with Next.js
- TypeScript for type safety
- Responsive UI design with Tailwind CSS
- API integration and data fetching
- State management and component architecture

## Features

- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Pokémon Listing**: Browse through the original 151 Pokémon
- **Real-time Search**: Filter Pokémon by name as you type with an interactive dropdown
- **Detailed Information**: View comprehensive details about each Pokémon including stats, types, and abilities
- **Interactive UI Elements**: Engaging animations and loading indicators for better user experience
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Technology Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: PokéAPI (https://pokeapi.co/)
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
pokemon_explorer/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── components/       # Reusable UI components
│   │   │   ├── LoadingSpinner.tsx  # Loading indicator component
│   │   │   ├── PokemonCard.tsx     # Card component for Pokémon listing
│   │   │   └── SearchBar.tsx       # Search component with real-time filtering
│   │   ├── pokemon/          # Pokemon detail page routes
│   │   │   └── [id]/         # Dynamic route for Pokemon details
│   │   │       └── page.tsx  # Pokemon detail page component
│   │   ├── utils/            # Utility functions
│   │   │   └── api.ts        # API integration with PokéAPI
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout component
│   │   ├── not-found.tsx     # 404 page component
│   │   └── page.tsx          # Homepage component with Pokémon listing
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
4. **User Experience**: Designing an intuitive and visually appealing interface with real-time feedback
5. **Code Quality**: Writing clean, maintainable code with proper documentation
6. **Accessibility**: Ensuring the application is accessible to all users

## Key Features Implementation

### Real-time Search
- The search functionality filters Pokémon as the user types
- Search results appear in a dropdown with a maximum of 3 results to prevent UI clutter
- Results are properly positioned with appropriate z-index to avoid overlapping with other elements

### Interactive UI
- Loading spinner appears during data fetching operations
- Pokémon cards have hover effects for better interaction feedback
- Pokémon detail page includes interactive elements like tabs and animations

## Future Enhancements

- Add pagination for browsing more Pokémon
- Implement advanced filtering by type, ability, etc.
- Add favorites functionality with local storage
- Add unit and integration tests

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon data
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
