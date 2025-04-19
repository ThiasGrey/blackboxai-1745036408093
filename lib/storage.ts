import { Treinador } from '../types/treinador'
import { Pokemon } from '../types/pokemon'

const TREINADOR_KEY = 'pokerole_treinador'
const POKEMONS_KEY = 'pokerole_pokemons'

export function saveTreinador(treinador: Treinador) {
  localStorage.setItem(TREINADOR_KEY, JSON.stringify(treinador))
}

export function loadTreinador(): Treinador | null {
  const data = localStorage.getItem(TREINADOR_KEY)
  if (!data) return null
  try {
    return JSON.parse(data) as Treinador
  } catch {
    return null
  }
}

export function savePokemons(pokemons: Pokemon[]) {
  localStorage.setItem(POKEMONS_KEY, JSON.stringify(pokemons))
}

export function loadPokemons(): Pokemon[] {
  const data = localStorage.getItem(POKEMONS_KEY)
  if (!data) return []
  try {
    return JSON.parse(data) as Pokemon[]
  } catch {
    return []
  }
}

export function clearStorage() {
  localStorage.removeItem(TREINADOR_KEY)
  localStorage.removeItem(POKEMONS_KEY)
}
