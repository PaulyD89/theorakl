import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Orakl — The Signs Are Speaking',
  description: 'The universe sends signs every day. Learn to see them. Let them guide you. Ask your question, log your signs, receive your answer.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'The Orakl',
  },
  openGraph: {
    title: 'The Orakl — The Signs Are Speaking',
    description: 'The universe sends signs every day. Learn to see them. Let them guide you.',
    url: 'https://theorakl.com',
    siteName: 'The Orakl',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Orakl — The Signs Are Speaking',
    description: 'The universe sends signs every day. Learn to see them. Let them guide you.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}