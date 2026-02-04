import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Theorakl — The Signs Are Speaking',
  description: 'The universe sends signs every day. Learn to see them. Let them guide you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
