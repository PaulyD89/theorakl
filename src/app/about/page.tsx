'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  useEffect(() => {
    const starsContainer = document.getElementById('stars')
    if (starsContainer && starsContainer.children.length === 0) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 4 + 's'
        starsContainer.appendChild(star)
      }
    }
  }, [])

  return (
    <>
      <div className="stars" id="stars"></div>
      
      <div className="app-container">
        <div className="screen active">
          <button className="back-btn" onClick={() => router.push('/')}>&#8592; Back</button>
          
          <div className="header">
            <h1 className="logo">THE<span>O</span>RAKL</h1>
            <p className="tagline">The signs are speaking</p>
          </div>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">&#9670;</span>
            <span className="divider-line"></span>
          </div>

          {/* What is The Orakl */}
          <div className="card">
            <h3 className="card-title">What is The Orakl?</h3>
            <p className="card-subtitle">
              A modern oracle that helps you interpret the signs the universe is already sending you.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              You&apos;ve noticed them &#8212; the repeating numbers, the songs that play at the exact right moment, the gut feeling that won&apos;t go away. These aren&apos;t coincidences. They&apos;re communication.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px', color: 'var(--accent-gold)' }}>
              This isn&apos;t fortune-telling. It&apos;s translation.
            </p>
          </div>

          {/* How It Works */}
          <div className="card">
            <h3 className="card-title">How It Works</h3>
            <p className="card-subtitle">
              <strong style={{ color: 'var(--text-primary)' }}>1. Ask your question</strong><br />
              What decision weighs on you? Speak it clearly.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>2. Log your signs</strong><br />
              Repeating numbers? Animal encounters? Dreams? We help you notice.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>3. Receive your reading</strong><br />
              Our interpretation engine weaves your signs into a clear answer.
            </p>
          </div>

          {/* Reading Types */}
          <div className="card">
            <h3 className="card-title">Choose Your Path</h3>
            <p className="card-subtitle">
              <strong style={{ color: 'var(--accent-gold)' }}>Quick Reading</strong> &#8212; Free<br />
              Log signs from today, get an immediate interpretation.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>Deep Reading</strong> &#8212; $2.99<br />
              5 days of noticing. A comprehensive reading that weaves everything together.
            </p>
          </div>

          {/* Is This Real */}
          <div className="card">
            <h3 className="card-title">Is This Real?</h3>
            <p className="card-subtitle">
              We get it. You&apos;re skeptical. Good.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              Whether the signs are messages from the cosmos or your own deep intuition surfacing through pattern &#8212; does it matter? The result is the same: clarity you didn&apos;t have before.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px', color: 'var(--accent-gold)' }}>
              Try a free reading. See if it resonates.
            </p>
          </div>

          {/* Privacy */}
          <div className="card">
            <h3 className="card-title">Your Privacy</h3>
            <p className="card-subtitle">
              Your questions are sacred. We treat them that way.
            </p>
            <p className="card-subtitle" style={{ marginTop: '12px' }}>
              We don&apos;t sell your data. We don&apos;t share your questions. The things you ask the universe are between you and the universe.
            </p>
          </div>

          <button className="btn btn-primary mt-20" onClick={() => router.push('/')}>
            Ask the Universe
          </button>

          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-dim)', 
            fontSize: '11px', 
            marginTop: '30px',
            opacity: 0.6 
          }}>
            &#169; 2026 The Orakl
          </p>
        </div>
      </div>
    </>
  )
}