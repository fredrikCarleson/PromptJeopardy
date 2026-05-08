import { TileCategory } from '../types';

export const CATEGORY_STYLES: Record<TileCategory, {
  color: 'emerald' | 'blue' | 'violet';
  badge: string;
  border: string;
  text: string;
  bgHover: string;
  gradient: string;
  glow: string;
  description: string;
}> = {
  'Grund': {
    color: 'emerald',
    badge: 'bg-emerald-400/20 text-emerald-300',
    border: 'border-emerald-500',
    text: 'text-emerald-300',
    bgHover: 'bg-emerald-600/80 border-emerald-500/50 hover:bg-emerald-500/80 hover:border-emerald-400',
    gradient: 'from-emerald-500 to-emerald-600',
    glow: 'bg-emerald-400/30 border-emerald-400 shadow-emerald-400/40',
    description: 'Grundläggande AI-promptning. Bra startpunkt för att förstå systemet.',
  },
  'Fördjupning': {
    color: 'blue',
    badge: 'bg-blue-400/20 text-blue-300',
    border: 'border-blue-500',
    text: 'text-blue-300',
    bgHover: 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-500/80 hover:border-blue-400',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'bg-blue-400/30 border-blue-400 shadow-blue-400/40',
    description: 'Mer avancerad uppgift som kräver djupare kunskap och experimentation.',
  },
  'Skapa nytt': {
    color: 'violet',
    badge: 'bg-violet-400/20 text-violet-300',
    border: 'border-violet-500',
    text: 'text-violet-300',
    bgHover: 'bg-violet-600/80 border-violet-500/50 hover:bg-violet-500/80 hover:border-violet-400',
    gradient: 'from-violet-500 to-violet-600',
    glow: 'bg-violet-400/30 border-violet-400 shadow-violet-400/40',
    description: 'Kreativ uppgift med högre poäng. Ofta en mer öppen tolkning av vad som fungerar.',
  },
};

export const CATEGORY_COLOR_MAP: Record<TileCategory, string> = {
  'Grund': 'bg-emerald-600 text-white',
  'Fördjupning': 'bg-blue-600 text-white',
  'Skapa nytt': 'bg-violet-600 text-white',
};
