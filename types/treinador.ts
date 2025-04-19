export type Natureza =
  | 'Hardy' | 'Lonely' | 'Brave' | 'Adamant' | 'Naughty'
  | 'Bold' | 'Docile' | 'Relaxed' | 'Impish' | 'Lax'
  | 'Timid' | 'Hasty' | 'Serious' | 'Jolly' | 'Naive'
  | 'Modest' | 'Mild' | 'Quiet' | 'Bashful' | 'Rash'
  | 'Calm' | 'Gentle' | 'Sassy' | 'Careful' | 'Quirky';

export type Rank = 'Starter' | 'Beginner' | 'Amateur' | 'Ace' | 'Professional';

export interface Atributos {
  strength: number;
  dexterity: number;
  vitality: number;
  insight: number;
  tough: number;
  cute: number;
  cool: number;
  beauty: number;
  clever: number;
}

export interface Skills {
  brawl: number;
  throw: number;
  evasion: number;
  alert: number;
  athletic: number;
  nature: number;
  stealth: number;
  empathy: number;
  etiquette: number;
  intimidate: number;
  perform: number;
  crafts: number;
  lore: number;
  medicine: number;
  science: number;
}

export interface Itens {
  potions: string[];
  batalha: string[];
  outros: string[];
}

export interface Pokedex {
  vistos: number;
  capturados: number;
}

export interface Treinador {
  id: string;
  nome: string;
  idade: number;
  natureza: Natureza;
  ocupacao: string;
  rank: Rank;
  atributos: Atributos;
  skills: Skills;
  willPoints: number;
  hp: number;
  pokedex: Pokedex;
  itens: Itens;
  party: string[]; // array of Pokemon IDs
  box: string[];   // array of Pokemon IDs
}
