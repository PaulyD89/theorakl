import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const question = searchParams.get('question') || 'What should I do?'
  const verdict = searchParams.get('verdict') || 'Trust the timing'
  
  // Truncate if too long
  const truncatedQuestion = question.length > 80 ? question.substring(0, 77) + '...' : question
  const truncatedVerdict = verdict.length > 60 ? verdict.substring(0, 57) + '...' : verdict

  // Generate SVG card (1080x1920 for Instagram stories)
  const svg = `
    <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e"/>
          <stop offset="50%" style="stop-color:#0a0a0f"/>
          <stop offset="100%" style="stop-color:#151520"/>
        </linearGradient>
        <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#8a7340"/>
          <stop offset="50%" style="stop-color:#c9a55c"/>
          <stop offset="100%" style="stop-color:#8a7340"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1080" height="1920" fill="url(#bg)"/>
      
      <!-- Stars -->
      ${generateStars(50)}
      
      <!-- Glowing orb behind verdict -->
      <ellipse cx="540" cy="960" rx="300" ry="200" fill="#c9a55c" opacity="0.03" filter="url(#softGlow)"/>
      
      <!-- Top decorative line -->
      <line x1="340" y1="400" x2="740" y2="400" stroke="url(#goldGlow)" stroke-width="1" opacity="0.5"/>
      <circle cx="540" cy="400" r="4" fill="#c9a55c" opacity="0.7"/>
      
      <!-- Logo -->
      <text x="540" y="320" font-family="Georgia, serif" font-size="72" fill="#e8e4dc" text-anchor="middle" letter-spacing="12">
        THE<tspan fill="#c9a55c">O</tspan>RAKL
      </text>
      <text x="540" y="370" font-family="Arial, sans-serif" font-size="18" fill="#8a8680" text-anchor="middle" letter-spacing="8">
        THE SIGNS ARE SPEAKING
      </text>
      
      <!-- Question section -->
      <text x="540" y="580" font-family="Arial, sans-serif" font-size="20" fill="#5a5650" text-anchor="middle" letter-spacing="4">
        I ASKED THE UNIVERSE
      </text>
      
      <text x="540" y="680" font-family="Georgia, serif" font-size="42" fill="#8a8680" text-anchor="middle" font-style="italic">
        "${truncatedQuestion}"
      </text>
      
      <!-- Decorative divider -->
      <line x1="390" y1="780" x2="690" y2="780" stroke="url(#goldGlow)" stroke-width="1" opacity="0.3"/>
      <text x="540" y="788" font-family="Georgia, serif" font-size="24" fill="#c9a55c" text-anchor="middle" opacity="0.7">◆</text>
      
      <!-- Verdict section -->
      <text x="540" y="920" font-family="Arial, sans-serif" font-size="20" fill="#5a5650" text-anchor="middle" letter-spacing="6">
        THE UNIVERSE ANSWERED
      </text>
      
      <text x="540" y="1060" font-family="Georgia, serif" font-size="64" fill="#c9a55c" text-anchor="middle" filter="url(#glow)">
        ${truncatedVerdict}
      </text>
      
      <!-- Bottom decorative elements -->
      <line x1="340" y1="1200" x2="740" y2="1200" stroke="url(#goldGlow)" stroke-width="1" opacity="0.3"/>
      
      <!-- Sparkles around verdict -->
      <text x="280" y="1040" font-family="Georgia, serif" font-size="32" fill="#c9a55c" opacity="0.6">✦</text>
      <text x="800" y="1080" font-family="Georgia, serif" font-size="24" fill="#c9a55c" opacity="0.4">✦</text>
      <text x="320" y="1120" font-family="Georgia, serif" font-size="20" fill="#c9a55c" opacity="0.3">✧</text>
      <text x="760" y="1000" font-family="Georgia, serif" font-size="28" fill="#c9a55c" opacity="0.5">✧</text>
      
      <!-- CTA -->
      <text x="540" y="1720" font-family="Arial, sans-serif" font-size="28" fill="#8a8680" text-anchor="middle">
        Ask your own question
      </text>
      <text x="540" y="1780" font-family="Georgia, serif" font-size="36" fill="#c9a55c" text-anchor="middle" letter-spacing="4">
        theorakl.com
      </text>
      
      <!-- Bottom decorative line -->
      <line x1="420" y1="1840" x2="660" y2="1840" stroke="url(#goldGlow)" stroke-width="1" opacity="0.5"/>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}

function generateStars(count: number): string {
  let stars = ''
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 1080)
    const y = Math.floor(Math.random() * 1920)
    const size = Math.random() * 2 + 1
    const opacity = Math.random() * 0.5 + 0.1
    stars += `<circle cx="${x}" cy="${y}" r="${size}" fill="#c9a55c" opacity="${opacity}"/>`
  }
  return stars
}