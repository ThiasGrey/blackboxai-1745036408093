import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-400 to-indigo-700 text-white">
      <h1 className="text-5xl font-extrabold mb-8">Pokérole Manager</h1>
      <p className="mb-8 text-lg max-w-xl text-center">
        Gerencie suas fichas de Treinador e Pokémon do sistema Pokérole 2.0.
      </p>
      <div className="space-x-4">
        <Link href="/treinador">
          <a className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Ficha do Treinador
          </a>
        </Link>
        <Link href="/pokemon/novo">
          <a className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Novo Pokémon
          </a>
        </Link>
      </div>
    </main>
  )
}
