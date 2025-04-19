'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Pokemon, Natureza, Rank, Status } from '../types/pokemon'

const naturezas: Natureza[] = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
]

const ranks: Rank[] = ['Starter', 'Beginner', 'Amateur', 'Ace', 'Professional']

const statuses: Status[] = [
  'Healthy', 'Poisoned', 'Paralyzed', 'Burned', 'Frozen', 'Asleep', 'Fainted'
]

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  apelido: z.string().optional(),
  especie: z.string().min(1, 'Espécie é obrigatória'),
  numeroPokedex: z.number().min(1, 'Número Pokédex inválido'),
  tipos: z.array(z.string()).min(1).max(2),
  rank: z.enum(ranks),
  natureza: z.enum(naturezas),
  tamanho: z.number().min(0),
  peso: z.number().min(0),
  atributos: z.object({
    strength: z.number().min(0),
    dexterity: z.number().min(0),
    vitality: z.number().min(0),
    insight: z.number().min(0),
  }),
  hp: z.number().min(0),
  willPoints: z.number().min(0),
  iniciativa: z.number().min(0),
  defesaFisica: z.number().min(0),
  defesaEspecial: z.number().min(0),
  status: z.enum(statuses),
  habilidade: z.string().min(1),
  moves: z.array(z.string()).max(10), // max = insight + 2, validation can be dynamic
  felicidade: z.number().min(0).max(5),
  lealdade: z.number().min(0).max(5),
  historico: z.object({
    batalhas: z.number().min(0),
    vitorias: z.number().min(0),
  }),
  estaNaParty: z.boolean(),
})

type FormData = z.infer<typeof schema>

interface PokemonFormProps {
  onSubmit: (data: FormData) => void
  defaultValues?: FormData
}

export default function PokemonForm({ onSubmit, defaultValues }: PokemonFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const insight = watch('atributos.insight') || 0
  const moves = watch('moves') || []

  // Enforce max moves = insight + 2
  useEffect(() => {
    if (moves.length > insight + 2) {
      setValue('moves', moves.slice(0, insight + 2))
    }
  }, [insight, moves, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white rounded shadow max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Nome</label>
          <input {...register('nome')} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Apelido</label>
          <input {...register('apelido')} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.apelido && <p className="text-red-600 text-sm">{errors.apelido.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Espécie</label>
          <input {...register('especie')} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.especie && <p className="text-red-600 text-sm">{errors.especie.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Número Pokédex</label>
          <input type="number" {...register('numeroPokedex', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.numeroPokedex && <p className="text-red-600 text-sm">{errors.numeroPokedex.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Tipos (separados por vírgula)</label>
          <input
            {...register('tipos', {
              setValueAs: (v) => v.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0).slice(0, 2),
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: Fire, Flying"
          />
          {errors.tipos && <p className="text-red-600 text-sm">{errors.tipos.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Rank</label>
          <select {...register('rank')} className="w-full border border-gray-300 rounded px-3 py-2">
            {ranks.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.rank && <p className="text-red-600 text-sm">{errors.rank.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Natureza</label>
          <select {...register('natureza')} className="w-full border border-gray-300 rounded px-3 py-2">
            {naturezas.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.natureza && <p className="text-red-600 text-sm">{errors.natureza.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Tamanho (cm)</label>
          <input type="number" {...register('tamanho', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.tamanho && <p className="text-red-600 text-sm">{errors.tamanho.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Peso (kg)</label>
          <input type="number" {...register('peso', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.peso && <p className="text-red-600 text-sm">{errors.peso.message}</p>}
        </div>
      </div>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Atributos</legend>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries({
            strength: 'Strength',
            dexterity: 'Dexterity',
            vitality: 'Vitality',
            insight: 'Insight',
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="number"
                {...register(`atributos.${key}` as const, { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.atributos?.[key as keyof typeof errors.atributos] && (
                <p className="text-red-600 text-sm">
                  {errors.atributos[key as keyof typeof errors.atributos]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block font-semibold mb-1">HP</label>
          <input type="number" {...register('hp', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.hp && <p className="text-red-600 text-sm">{errors.hp.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Will Points</label>
          <input type="number" {...register('willPoints', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.willPoints && <p className="text-red-600 text-sm">{errors.willPoints.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Iniciativa</label>
          <input type="number" {...register('iniciativa', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.iniciativa && <p className="text-red-600 text-sm">{errors.iniciativa.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Defesa Física</label>
          <input type="number" {...register('defesaFisica', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.defesaFisica && <p className="text-red-600 text-sm">{errors.defesaFisica.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Defesa Especial</label>
          <input type="number" {...register('defesaEspecial', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.defesaEspecial && <p className="text-red-600 text-sm">{errors.defesaEspecial.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Status</label>
        <select {...register('status')} className="w-full border border-gray-300 rounded px-3 py-2">
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Habilidade</label>
        <input {...register('habilidade')} className="w-full border border-gray-300 rounded px-3 py-2" />
        {errors.habilidade && <p className="text-red-600 text-sm">{errors.habilidade.message}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Moves (separados por vírgula, máximo {insight + 2})</label>
        <input
          {...register('moves', {
            setValueAs: (v) => v.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0).slice(0, insight + 2),
          })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ex: Tackle, Growl"
        />
        {errors.moves && <p className="text-red-600 text-sm">{errors.moves.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Felicidade (0 a 5)</label>
          <input type="number" {...register('felicidade', { valueAsNumber: true })} min={0} max={5} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.felicidade && <p className="text-red-600 text-sm">{errors.felicidade.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Lealdade (0 a 5)</label>
          <input type="number" {...register('lealdade', { valueAsNumber: true })} min={0} max={5} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.lealdade && <p className="text-red-600 text-sm">{errors.lealdade.message}</p>}
        </div>
      </div>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Histórico</legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Número de batalhas</label>
            <input type="number" {...register('historico.batalhas', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
            {errors.historico?.batalhas && <p className="text-red-600 text-sm">{errors.historico.batalhas.message}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Número de vitórias</label>
            <input type="number" {...register('historico.vitorias', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
            {errors.historico?.vitorias && <p className="text-red-600 text-sm">{errors.historico.vitorias.message}</p>}
          </div>
        </div>
      </fieldset>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input type="checkbox" {...register('estaNaParty')} className="mr-2" />
          Está na Party?
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mt-6"
      >
        Salvar Pokémon
      </button>
    </form>
  )
}
