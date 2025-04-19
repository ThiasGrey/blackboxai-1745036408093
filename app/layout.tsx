import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Pokérole Manager',
  description: 'Gerencie suas fichas de Pokérole 2.0',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
