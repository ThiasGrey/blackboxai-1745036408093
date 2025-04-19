export type Natureza =
  | 'Hardy' | 'Lonely' | 'Brave' | 'Adamant' | 'Naughty'
  | 'Bold' | 'Docile' | 'Relaxed' | 'Impish' | 'Lax'
  | 'Timid' | 'Hasty' | 'Serious' | 'Jolly' | 'Naive'
  | 'Modest' | 'Mild' | 'Quiet' | 'Bashful' | 'Rash'
  | 'Calm' | 'Gentle' | 'Sassy' | 'Careful' | 'Quirky';

export type Rank = 'Starter' | 'Beginner' | 'Amateur' | 'Ace' | 'Professional';

export type Status =
  | 'Healthy'
  | 'Poisoned'
  | 'Paralyzed'
  | 'Burned'
  | 'Frozen'
  | 'Asleep'
  | 'Fainted';

export interface Atributos {
  strength: number;
  dexterity: number;
  vitality: number;
  insight: number;
}

export interface Moves {
  name: string;
  power?: number;
  type?: string;
}

export interface Pokemon {
  id: string;
  nome: string;
  apelido?: string;
  especie: string;
  numeroPokedex: number;
  tipos: string[]; // one or two types
  rank: Rank;
  natureza: Natureza;
  tamanho: number; // in cm
  peso: number; // in kg
  atributos: Atributos;
  hp: number;
  willPoints: number;
  iniciativa: number;
  defesaFisica: number;
  defesaEspecial: number;
  status: Status;
  habilidade: string;
  moves: Moves[];
  felicidade: number; // 0 to 5
  lealdade: number; // 0 to 5
  historico: {
    batalhas: number;
    vitorias: number;
  };
  estaNaParty: boolean;
}
