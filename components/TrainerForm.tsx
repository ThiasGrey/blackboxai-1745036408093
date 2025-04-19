'use client'

import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Treinador, Natureza, Rank } from '../types/treinador'

const naturezas: Natureza[] = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
]

const ranks: Rank[] = ['Starter', 'Beginner', 'Amateur', 'Ace', 'Professional']

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  idade: z.number().min(0, 'Idade inválida'),
  natureza: z.enum(naturezas),
  ocupacao: z.string().min(1, 'Ocupação é obrigatória'),
  rank: z.enum(ranks),
  atributos: z.object({
    strength: z.number().min(0),
    dexterity: z.number().min(0),
    vitality: z.number().min(0),
    insight: z.number().min(0),
    tough: z.number().min(0),
    cute: z.number().min(0),
    cool: z.number().min(0),
    beauty: z.number().min(0),
    clever: z.number().min(0),
  }),
  skills: z.object({
    brawl: z.number().min(0),
    throw: z.number().min(0),
    evasion: z.number().min(0),
    alert: z.number().min(0),
    athletic: z.number().min(0),
    nature: z.number().min(0),
    stealth: z.number().min(0),
    empathy: z.number().min(0),
    etiquette: z.number().min(0),
    intimidate: z.number().min(0),
    perform: z.number().min(0),
    crafts: z.number().min(0),
    lore: z.number().min(0),
    medicine: z.number().min(0),
    science: z.number().min(0),
  }),
  itens: z.object({
    potions: z.array(z.string()),
    batalha: z.array(z.string()),
    outros: z.array(z.string()),
  }),
  pokedex: z.object({
    vistos: z.number().min(0),
    capturados: z.number().min(0),
  }),
})

type FormData = z.infer<typeof schema>

interface TrainerFormProps {
  onSubmit: (data: FormData) => void
  defaultValues?: FormData
}

export default function TrainerForm({ onSubmit, defaultValues }: TrainerFormProps) {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  // Calculate Will Points and HP based on attributes and rank
  const rankWillPointsMap: Record<Rank, number> = {
    Starter: 2,
    Beginner: 4,
    Amateur: 6,
    Ace: 8,
    Professional: 10,
  }

  const vitality = watch('atributos.vitality') || 0
  const insight = watch('atributos.insight') || 0
  const rank = watch('rank') || 'Starter'

  useEffect(() => {
    const willPoints = insight + 2
    setValue('willPoints', willPoints)
    const baseHP = 10 // Assuming base HP is 10, can be adjusted
    const hp = baseHP + vitality
    setValue('hp', hp)
  }, [insight, vitality, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white rounded shadow max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Nome</label>
          <input {...register('nome')} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Idade</label>
          <input type="number" {...register('idade', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.idade && <p className="text-red-600 text-sm">{errors.idade.message}</p>}
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
          <label className="block font-semibold mb-1">Ocupação/Conceito</label>
          <input {...register('ocupacao')} className="w-full border border-gray-300 rounded px-3 py-2" />
          {errors.ocupacao && <p className="text-red-600 text-sm">{errors.ocupacao.message}</p>}
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
      </div>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Atributos</legend>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries({
            strength: 'Strength',
            dexterity: 'Dexterity',
            vitality: 'Vitality',
            insight: 'Insight',
            tough: 'Tough',
            cute: 'Cute',
            cool: 'Cool',
            beauty: 'Beauty',
            clever: 'Clever',
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

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Skills</legend>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries({
            brawl: 'Brawl',
            throw: 'Throw',
            evasion: 'Evasion',
            alert: 'Alert',
            athletic: 'Athletic',
            nature: 'Nature',
            stealth: 'Stealth',
            empathy: 'Empathy',
            etiquette: 'Etiquette',
            intimidate: 'Intimidate',
            perform: 'Perform',
            crafts: 'Crafts',
            lore: 'Lore',
            medicine: 'Medicine',
            science: 'Science',
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="number"
                {...register(`skills.${key}` as const, { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.skills?.[key as keyof typeof errors.skills] && (
                <p className="text-red-600 text-sm">
                  {errors.skills[key as keyof typeof errors.skills]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Itens</legend>
        <div>
          <label className="block font-semibold mb-1">Potions (separadas por vírgula)</label>
          <input
            {...register('itens.potions')}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: Potion, Super Potion"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Batalha (separadas por vírgula)</label>
          <input
            {...register('itens.batalha')}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: Poké Ball, Great Ball"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Outros (separadas por vírgula)</label>
          <input
            {...register('itens.outros')}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: Bicycle, Map"
          />
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold mb-2">Pokédex</legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Pokémon Vistos</label>
            <input
              type="number"
              {...register('pokedex.vistos', { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Pokémon Capturados</label>
            <input
              type="number"
              {...register('pokedex.capturados', { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Salvar Treinador
      </button>
    </form>
  )
}
