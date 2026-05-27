import { TileTopic } from '../types';

export const TOPIC_STYLES: Record<TileTopic, {
  header: string;
  tile: string;
  active: string;
  completed: string;
  badge: string;
  glow: string;
}> = {
  'Forsta rapporten': {
    header: 'bg-blue-950 text-blue-100 border-blue-500/60',
    tile: 'bg-blue-800 border-blue-500 hover:bg-blue-700',
    active: 'bg-yellow-500 text-slate-950 border-yellow-200 ring-yellow-200/70',
    completed: 'bg-blue-950/60 text-blue-200 border-blue-700/50',
    badge: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    glow: 'bg-blue-400/30 border-blue-300 shadow-blue-400/40',
  },
  Klarsprak: {
    header: 'bg-emerald-950 text-emerald-100 border-emerald-500/60',
    tile: 'bg-emerald-800 border-emerald-500 hover:bg-emerald-700',
    active: 'bg-yellow-500 text-slate-950 border-yellow-200 ring-yellow-200/70',
    completed: 'bg-emerald-950/60 text-emerald-200 border-emerald-700/50',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    glow: 'bg-emerald-400/30 border-emerald-300 shadow-emerald-400/40',
  },
  Analysera: {
    header: 'bg-amber-950 text-amber-100 border-amber-500/60',
    tile: 'bg-amber-800 border-amber-500 hover:bg-amber-700',
    active: 'bg-yellow-500 text-slate-950 border-yellow-200 ring-yellow-200/70',
    completed: 'bg-amber-950/60 text-amber-200 border-amber-700/50',
    badge: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    glow: 'bg-amber-400/30 border-amber-300 shadow-amber-400/40',
  },
  'Skapa material': {
    header: 'bg-violet-950 text-violet-100 border-violet-500/60',
    tile: 'bg-violet-800 border-violet-500 hover:bg-violet-700',
    active: 'bg-yellow-500 text-slate-950 border-yellow-200 ring-yellow-200/70',
    completed: 'bg-violet-950/60 text-violet-200 border-violet-700/50',
    badge: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
    glow: 'bg-violet-400/30 border-violet-300 shadow-violet-400/40',
  },
  'Data och bild': {
    header: 'bg-gold-950 text-gold-100 border-gold-400/60',
    tile: 'bg-gold-800 border-gold-400 hover:bg-gold-700',
    active: 'bg-gold-400 text-slate-950 border-gold-200 ring-gold-200/70',
    completed: 'bg-gold-950/60 text-gold-200 border-gold-700/50',
    badge: 'bg-gold-400/20 text-gold-200 border-gold-400/40',
    glow: 'bg-gold-400/30 border-gold-300 shadow-gold-400/40',
  },
};
