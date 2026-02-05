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

  const sectionStyle = {
    marginBottom: '40px'
  }

  const titleStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '24px',
    fontWeight: 400 as const,
    color: 'var(--accent-gold)',
    marginBottom: '16px'
  }

  const textStyle = {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: 1.8,
    fontWeight: 300 as const
  }

  const paragraphStyle = {
    ...textStyle,
    marginBottom: '14px'
  }

  const goldTextStyle = {
    ...paragraphStyle,
    color: 'var(--accent-gold)'
  }

  const stepTitleStyle = {
    color: 'var(--text-primary)',
    fontSize: '15px',
    fontWeight: 500 as const,
    marginBottom: '6px'
  }

  const listStyle = {
    ...textStyle,
    paddingLeft: '20px',
    listStyle: 'none' as const
  }

  const listItemStyle = {
    marginBottom: '10px',
    position: 'relative' as const,
    paddingLeft: '16px'
  }

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
          <section style={sectionStyle}>
            <h2 style={titleStyle}>What is The Orakl?</h2>
            <p style={paragraphStyle}>
              The Orakl is a modern oracle that helps you interpret the signs the universe is already sending you.
            </p>
            <p style={paragraphStyle}>
              You&apos;ve noticed them &#8212; the repeating numbers on the clock, the song that plays at the exact right moment, the person you run into when you were just thinking of them, the gut feeling that won&apos;t go away. These aren&apos;t coincidences. They&apos;re communication.
            </p>
            <p style={paragraphStyle}>
              But most of us don&apos;t know how to read the messages. We notice the signs, then shrug them off. We feel something, then talk ourselves out of it.
            </p>
            <p style={paragraphStyle}>
              The Orakl bridges that gap. You bring the question. You log the signs you&apos;ve noticed. Our interpretation engine &#8212; built on years of research into synchronicity, symbolism, and intuitive patterns &#8212; weaves them together into a clear answer.
            </p>
            <p style={goldTextStyle}>
              This isn&apos;t fortune-telling. It&apos;s translation. The universe has already answered. We help you understand what it said.
            </p>
          </section>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">&#9670;</span>
            <span className="divider-line"></span>
          </div>

          {/* How Does It Work */}
          <section style={sectionStyle}>
            <h2 style={titleStyle}>How Does It Work?</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={stepTitleStyle}>1. Ask your question.</h3>
              <p style={paragraphStyle}>
                What&apos;s weighing on you? What do you need clarity on? Type your question &#8212; the universe is listening.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={stepTitleStyle}>2. Log your signs.</h3>
              <p style={paragraphStyle}>
                Select the signs you&apos;ve noticed lately &#8212; repeating numbers, animal encounters, gut feelings, dreams, coincidences. Check all that apply.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={stepTitleStyle}>3. Receive your reading.</h3>
              <p style={paragraphStyle}>
                We&apos;ll interpret your signs in the context of your question and reveal what the universe is telling you. The more signs you log, the clearer the message.
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <p style={paragraphStyle}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>Quick Reading</span><br />
                Log signs from today, get an immediate interpretation. <span style={{ color: 'var(--accent-gold)' }}>Free.</span>
              </p>
              <p style={{ ...paragraphStyle, marginTop: '16px' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>Deep Reading</span><br />
                Commit to 5 days of noticing. Log signs each day. On Day 5, receive a comprehensive reading that weaves together everything the universe showed you across your journey. <span style={{ color: 'var(--accent-gold)' }}>$2.99</span>
              </p>
              <p style={{ ...textStyle, marginTop: '8px', fontStyle: 'italic', fontSize: '13px' }}>
                The longer you pay attention, the clearer the message becomes.
              </p>
            </div>
          </section>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">&#9670;</span>
            <span className="divider-line"></span>
          </div>

          {/* Is This Real */}
          <section style={sectionStyle}>
            <h2 style={titleStyle}>Is This Real?</h2>
            <p style={paragraphStyle}>
              We get it. You&apos;re skeptical. Good &#8212; you should be.
            </p>
            <p style={paragraphStyle}>
              Here&apos;s what we believe: The universe (or your subconscious, or the quantum field, or God, or whatever you want to call it) is constantly communicating. Patterns exist. Synchronicities happen. Your gut knows things your mind doesn&apos;t.
            </p>
            <p style={paragraphStyle}>
              Science calls it confirmation bias. Mystics call it divine guidance. We call it: <em>paying attention.</em>
            </p>
            <p style={paragraphStyle}>
              Whether the signs are &quot;real&quot; messages from the cosmos or your own deep intuition surfacing through symbol and pattern &#8212; does it matter? The result is the same: clarity you didn&apos;t have before.
            </p>
            <p style={paragraphStyle}>
              The Orakl doesn&apos;t predict the future. It helps you see what you already know. It gives language to the whisper you&apos;ve been ignoring. It offers permission to trust yourself.
            </p>
            <p style={goldTextStyle}>
              Try a free reading. See if it resonates. That&apos;s all we ask.
            </p>
          </section>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">&#9670;</span>
            <span className="divider-line"></span>
          </div>

          {/* Privacy & Your Data */}
          <section style={sectionStyle}>
            <h2 style={titleStyle}>Privacy &amp; Your Data</h2>
            <p style={{ ...goldTextStyle, fontSize: '16px', marginBottom: '16px' }}>
              Your questions are sacred. We treat them that way.
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&#10003;</span>
                We store your readings to let you access them later &#8212; that&apos;s it.
              </li>
              <li style={listItemStyle}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&#10003;</span>
                We don&apos;t sell your data. Ever.
              </li>
              <li style={listItemStyle}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&#10003;</span>
                We don&apos;t share your questions or signs with anyone.
              </li>
              <li style={listItemStyle}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&#10003;</span>
                Deep Reading emails are only for sending your magic link &#8212; we won&apos;t spam you.
              </li>
              <li style={listItemStyle}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&#10003;</span>
                You can request deletion of your data anytime by emailing <span style={{ color: 'var(--accent-gold)' }}>hello@theorakl.com</span>
              </li>
            </ul>
            <p style={{ ...textStyle, marginTop: '20px', fontStyle: 'italic' }}>
              The things you ask the universe are between you and the universe. We&apos;re just the translator.
            </p>
          </section>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">&#9670;</span>
            <span className="divider-line"></span>
          </div>

          <button className="btn btn-primary" onClick={() => router.push('/')}>
            Ask the Universe
          </button>

          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-dim)', 
            fontSize: '11px', 
            marginTop: '30px',
            opacity: 0.6 
          }}>
            &#169; 2026 The Orakl. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}