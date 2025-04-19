'use client'

import React, { useEffect, useState } from 'react'
import TrainerForm from '../../components/TrainerForm'
import { Treinador } from '../../types/treinador'
import { loadTreinador, saveTreinador } from '../../lib/storage'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function TreinadorPage() {
  const [treinador, setTreinador] = useState<Treinador | null>(null)
  const router = useRouter()

  useEffect(() => {
    const saved = loadTreinador()
    if (saved) {
      setTreinador(saved)
    }
  }, [])

  function handleSave(data: Treinador) {
    if (!data.id) {
      data.id = uuidv4()
    }
    saveTreinador(data)
    setTreinador(data)
    alert('Ficha do Treinador salva com sucesso!')
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Ficha do Treinador</h1>
      <TrainerForm onSubmit={handleSave} defaultValues={treinador ?? undefined} />
    </main>
  )
}
