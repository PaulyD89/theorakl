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
          
          <div className="header" style={{ paddingBottom: '10px' }}>
            <h1 className="logo">THE<span>O</span>RAKL</h1>
          </div>

          <div className="about-content">
            <section className="about-section">
              <h2 className="about-title">What is The Orakl?</h2>
              <div className="about-text">
                <p>
                  The Orakl is a modern oracle that helps you interpret the signs the universe is already sending you.
                </p>
                <p>
                  You&apos;ve noticed them &#8212; the repeating numbers on the clock, the song that plays at the exact right moment, the person you run into when you were just thinking of them, the gut feeling that won&apos;t go away. These aren&apos;t coincidences. They&apos;re communication.
                </p>
                <p>
                  But most of us don&apos;t know how to read the messages. We notice the signs, then shrug them off. We feel something, then talk ourselves out of it.
                </p>
                <p>
                  The Orakl bridges that gap. You bring the question. You log the signs you&apos;ve noticed. Our interpretation engine &#8212; built on years of research into synchronicity, symbolism, and intuitive patterns &#8212; weaves them together into a clear answer.
                </p>
                <p className="text-gold">
                  This isn&apos;t fortune-telling. It&apos;s translation. The universe has already answered. We help you understand what it said.
                </p>
              </div>
            </section>

            <div className="about-divider">
              <span className="divider-line"></span>
              <span className="divider-symbol">&#9670;</span>
              <span className="divider-line"></span>
            </div>

            <section className="about-section">
              <h2 className="about-title">How Does It Work?</h2>
              <div className="about-text">
                <div className="how-step">
                  <span className="step-number">1</span>
                  <div>
                    <h3>Ask your question.</h3>
                    <p>What decision is weighing on you? What do you need guidance on? Speak it clearly &#8212; the universe responds to clarity.</p>
                  </div>
                </div>

                <div className="how-step">
                  <span className="step-number">2</span>
                  <div>
                    <h3>Log your signs.</h3>
                    <p>What have you noticed lately? Repeating numbers? Animal encounters? Songs that stopped you in your tracks? Dreams you can&apos;t shake? A gut feeling? We give you categories to choose from, or you can add your own.</p>
                  </div>
                </div>

                <div className="how-step">
                  <span className="step-number">3</span>
                  <div>
                    <h3>Receive your reading.</h3>
                    <p>Our proprietary interpretation engine analyzes your specific signs &#8212; not generic horoscopes, but YOUR signs in the context of YOUR question. It finds patterns, detects meaningful combinations, and delivers a clear verdict.</p>
                  </div>
                </div>

                <div className="reading-types">
                  <div className="reading-type">
                    <h4>Quick Reading</h4>
                    <p>Log signs from today, get an immediate interpretation. <span className="text-gold">Free.</span></p>
                  </div>
                  <div className="reading-type">
                    <h4>Deep Reading</h4>
                    <p>Commit to 5 days of noticing. Log signs each day. On Day 5, receive a comprehensive reading that weaves together everything the universe showed you across your journey. <span className="text-gold">$2.99</span></p>
                    <p className="reading-type-note">The longer you pay attention, the clearer the message becomes.</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="about-divider">
              <span className="divider-line"></span>
              <span className="divider-symbol">&#9670;</span>
              <span className="divider-line"></span>
            </div>

            <section className="about-section">
              <h2 className="about-title">Is This Real?</h2>
              <div className="about-text">
                <p>
                  We get it. You&apos;re skeptical. Good &#8212; you should be.
                </p>
                <p>
                  Here&apos;s what we believe: The universe (or your subconscious, or the quantum field, or God, or whatever you want to call it) is constantly communicating. Patterns exist. Synchronicities happen. Your gut knows things your mind doesn&apos;t.
                </p>
                <p>
                  Science calls it confirmation bias. Mystics call it divine guidance. We call it: <em>paying attention.</em>
                </p>
                <p>
                  Whether the signs are &quot;real&quot; messages from the cosmos or your own deep intuition surfacing through symbol and pattern &#8212; does it matter? The result is the same: clarity you didn&apos;t have before.
                </p>
                <p>
                  The Orakl doesn&apos;t predict the future. It helps you see what you already know. It gives language to the whisper you&apos;ve been ignoring. It offers permission to trust yourself.
                </p>
                <p className="text-gold">
                  Try a free reading. See if it resonates. That&apos;s all we ask.
                </p>
              </div>
            </section>

            <div className="about-divider">
              <span className="divider-line"></span>
              <span className="divider-symbol">&#9670;</span>
              <span className="divider-line"></span>
            </div>

            <section className="about-section">
              <h2 className="about-title">Privacy &amp; Your Data</h2>
              <div className="about-text">
                <p className="text-gold" style={{ fontSize: '18px', marginBottom: '20px' }}>
                  Your questions are sacred. We treat them that way.
                </p>
                <ul className="privacy-list">
                  <li>We store your readings to let you access them later &#8212; that&apos;s it.</li>
                  <li>We don&apos;t sell your data. Ever.</li>
                  <li>We don&apos;t share your questions or signs with anyone.</li>
                  <li>Deep Reading emails are only for sending your magic link &#8212; we won&apos;t spam you.</li>
                  <li>You can request deletion of your data anytime by emailing <span className="text-gold">hello@theorakl.com</span></li>
                </ul>
                <p style={{ marginTop: '24px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  The things you ask the universe are between you and the universe. We&apos;re just the translator.
                </p>
              </div>
            </section>

            <div className="about-divider">
              <span className="divider-line"></span>
              <span className="divider-symbol">&#9670;</span>
              <span className="divider-line"></span>
            </div>

            <button className="btn btn-primary" onClick={() => router.push('/')}>
              Ask the Universe
            </button>

            <p className="about-footer">
              &#169; 2026 The Orakl. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}