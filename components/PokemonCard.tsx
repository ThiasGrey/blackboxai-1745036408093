'use client'

import React from 'react'
import { Pokemon } from '../types/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="border rounded p-4 bg-white shadow max-w-sm">
      <h2 className="text-xl font-bold mb-2">{pokemon.apelido || pokemon.nome}</h2>
      <p><strong>Espécie:</strong> {pokemon.especie} (#{pokemon.numeroPokedex})</p>
      <p><strong>Tipo(s):</strong> {pokemon.tipos.join(', ')}</p>
      <p><strong>Rank:</strong> {pokemon.rank}</p>
      <p><strong>Natureza:</strong> {pokemon.natureza}</p>
      <p><strong>Tamanho:</strong> {pokemon.tamanho} cm</p>
      <p><strong>Peso:</strong> {pokemon.peso} kg</p>
      <p><strong>HP:</strong> {pokemon.hp}</p>
      <p><strong>Will Points:</strong> {pokemon.willPoints}</p>
      <p><strong>Iniciativa:</strong> {pokemon.iniciativa}</p>
      <p><strong>Defesa Física:</strong> {pokemon.defesaFisica}</p>
      <p><strong>Defesa Especial:</strong> {pokemon.defesaEspecial}</p>
      <p><strong>Status:</strong> {pokemon.status}</p>
      <p><strong>Habilidade:</strong> {pokemon.habilidade}</p>
      <p><strong>Moves:</strong> {pokemon.moves.join(', ')}</p>
      <p><strong>Felicidade:</strong> {pokemon.felicidade}</p>
      <p><strong>Lealdade:</strong> {pokemon.lealdade}</p>
      <p><strong>Batalhas:</strong> {pokemon.historico.batalhas}</p>
      <p><strong>Vitórias:</strong> {pokemon.historico.vitorias}</p>
      <p><strong>Está na Party?</strong> {pokemon.estaNaParty ? 'Sim' : 'Não'}</p>
    </div>
  )
}
