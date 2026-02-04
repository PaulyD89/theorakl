'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface JourneyData {
  id: string
  email: string
  question: string
  start_date: string
  current_day: number
  daily_signs: { [day: number]: string[] }
  completed: boolean
  reading_text: string | null
  verdict: string | null
}

// Sign categories (same as main page)
const basicSignCategories = [
  {
    id: 'numbers',
    icon: '✧',
    title: 'Numbers',
    signs: [
      'Repeated numbers (111, 222, 333...)',
      'Saw my lucky number',
      'A specific number kept appearing'
    ]
  },
  {
    id: 'animals',
    icon: '◈',
    title: 'Animals',
    signs: [
      'Bird crossed my path',
      'Butterfly appeared',
      'Ladybug landed on me',
      'Unexpected animal encounter'
    ]
  },
  {
    id: 'sounds',
    icon: '○',
    title: 'Sounds',
    signs: [
      'Ringing in my left ear',
      'Ringing in my right ear',
      'Meaningful song came on',
      'Heard my name called',
      'Sudden silence'
    ]
  },
  {
    id: 'people',
    icon: '◇',
    title: 'People',
    signs: [
      'Ran into someone unexpected',
      'Stranger said something that hit me',
      'Someone from my past reached out',
      'Overheard a meaningful conversation'
    ]
  },
  {
    id: 'body',
    icon: '◎',
    title: 'Body & Feeling',
    signs: [
      'Strong gut feeling',
      'Chills or goosebumps',
      'Sudden emotion out of nowhere',
      'Déjà vu'
    ]
  },
  {
    id: 'objects',
    icon: '□',
    title: 'Objects & Environment',
    signs: [
      'Found something meaningful',
      'Lost something',
      'Something broke',
      'Door was open/closed meaningfully',
      'Lights flickered'
    ]
  },
  {
    id: 'words',
    icon: '▽',
    title: 'Words & Messages',
    signs: [
      'Saw a word/phrase that stood out',
      'Billboard/sign felt like a message',
      'Book fell open to a page',
      'Random text/email felt like a sign'
    ]
  },
  {
    id: 'nature',
    icon: '☽',
    title: 'Nature & Weather',
    signs: [
      'Unexpected weather change',
      'Rainbow appeared',
      'Sun broke through clouds',
      'Wind picked up suddenly'
    ]
  },
  {
    id: 'dreams-basic',
    icon: '☾',
    title: 'Dreams',
    signs: [
      'Vivid dream I remembered',
      'Recurring dream theme',
      'Woke up with a strong feeling',
      'Dream about someone I know',
      'Dream that felt meaningful'
    ]
  }
]

const premiumSignCategories = [
  {
    id: 'angel-numbers',
    icon: '𓂀',
    title: 'Angel Numbers',
    signs: [
      '111 — New beginnings, manifestation',
      '222 — Balance, trust, divine timing',
      '333 — Spiritual support, creativity',
      '444 — Angels are near, protection',
      '555 — Major change coming',
      '666 — Refocus on what matters',
      '777 — Spiritual awakening, luck',
      '888 — Abundance flowing to you',
      '999 — Completion, chapter ending',
      '1111 — Portal opening, make a wish',
      '1234 — Steps aligning, keep going'
    ]
  },
  {
    id: 'spirit-messages',
    icon: '🪶',
    title: 'Messages from Spirit',
    signs: [
      'Found a feather in unusual place',
      'Found a penny or dime',
      'Smelled a familiar scent (perfume, tobacco, etc.)',
      'Felt a presence nearby',
      'Felt sudden warmth or cold spot',
      'Electronics glitched unexpectedly',
      'Saw their favorite bird or animal',
      'Heard their favorite song randomly',
      'Clock stopped at meaningful time',
      'Object moved on its own'
    ]
  },
  {
    id: 'dreams-advanced',
    icon: '🌙',
    title: 'Advanced Dreams & Visions',
    signs: [
      'Prophetic dream that came true',
      'Visited by deceased loved one in dream',
      'Received a specific message in dream',
      'Lucid dream where I had control',
      'Dream about flying or floating',
      'Dream about water (ocean, river, rain)',
      'Dream about snakes or transformation',
      'Dream about death or rebirth',
      'Dream with a spirit guide or angel',
      'Nightmare that felt like a warning',
      'Woke up crying from emotional dream',
      'Dream revealed a hidden truth',
      'Sleep paralysis experience',
      'Dream within a dream',
      'Shared dream with someone else'
    ]
  },
  {
    id: 'synchronicity',
    icon: '∞',
    title: 'Deep Synchronicities',
    signs: [
      'Thought of someone, they called/texted',
      'Same theme appeared 3+ times today',
      'Right person appeared at right moment',
      'Answer came through unexpected source',
      'Received exactly what I needed',
      'Events aligned too perfectly to be chance',
      'Heard the exact words I needed to hear',
      'Found something I had been looking for',
      'Missed something that turned out to be a blessing',
      'Perfect timing saved me from something'
    ]
  },
  {
    id: 'animals-deep',
    icon: '🦋',
    title: 'Animal Messengers',
    signs: [
      'Cardinal appeared (loved one visiting)',
      'Hawk or eagle flew overhead',
      'Owl sighting or heard owl',
      'Dragonfly crossed my path',
      'Spider appeared repeatedly',
      'Snake crossed my path',
      'Deer made eye contact with me',
      'Crow or raven appeared',
      'White animal sighting',
      'Unusual animal behaved strangely'
    ]
  },
  {
    id: 'physical',
    icon: '✋',
    title: 'Physical Sensations',
    signs: [
      'Third eye pressure or tingling',
      'Heart fluttering or expanding feeling',
      'Ears ringing at specific frequency',
      'Tingling on crown of head',
      'Sudden rush of energy up spine',
      'Felt pulled in a direction',
      'Hands felt hot or tingly',
      'Stomach dropped (intuition warning)',
      'Full-body shivers of truth',
      'Felt frozen in place momentarily'
    ]
  },
  {
    id: 'timing',
    icon: '⏰',
    title: 'Divine Timing',
    signs: [
      'Looked at clock at exact meaningful time',
      'Something happened on anniversary date',
      'Event occurred at birth time',
      'Delay that turned into protection',
      'Arrived at the perfect moment',
      'Almost missed something important',
      'Woke up at 3am or 4am',
      'Transaction total was meaningful number',
      'Timer/alarm went off unexpectedly',
      'Everything aligned in sequence'
    ]
  },
  {
    id: 'nature-deep',
    icon: '🌸',
    title: 'Nature Signs',
    signs: [
      'Found a four-leaf clover',
      'Double rainbow appeared',
      'Lightning without rain',
      'Unusual cloud formation',
      'Flower bloomed out of season',
      'Leaf or petal landed on me',
      'Saw shooting star',
      'Moon felt unusually powerful',
      'Sunrise/sunset was breathtaking',
      'Storm cleared suddenly'
    ]
  }
]

type Screen = 'loading' | 'not-found' | 'signs' | 'saved' | 'generating' | 'reading'

export default function JourneyPage() {
  const params = useParams()
  const router = useRouter()
  const journeyId = params.id as string

  const [screen, setScreen] = useState<Screen>('loading')
  const [journey, setJourney] = useState<JourneyData | null>(null)
  const [selectedSigns, setSelectedSigns] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [customSignInput, setCustomSignInput] = useState('')
  const [customSigns, setCustomSigns] = useState<string[]>([])
  const [reading, setReading] = useState({ text: '', verdict: '' })
  const [copySuccess, setCopySuccess] = useState(false)

  // Load journey on mount
  useEffect(() => {
    const loadJourney = async () => {
      try {
        const response = await fetch(`/api/journey?id=${journeyId}`)
        if (!response.ok) {
          setScreen('not-found')
          return
        }
        const data = await response.json()
        
        // Calculate current day based on start date
        const startDate = new Date(data.start_date)
        const today = new Date()
        const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        data.current_day = Math.min(daysDiff, 5)
        
        setJourney(data)
        
        if (data.completed && data.reading_text) {
          setReading({ text: data.reading_text, verdict: data.verdict || '' })
          setScreen('reading')
        } else if (data.daily_signs[data.current_day]) {
          setScreen('saved')
        } else {
          setScreen('signs')
        }
      } catch (error) {
        console.error('Error loading journey:', error)
        setScreen('not-found')
      }
    }

    loadJourney()
  }, [journeyId])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleSign = (signText: string) => {
    setSelectedSigns(prev =>
      prev.includes(signText)
        ? prev.filter(s => s !== signText)
        : [...prev, signText]
    )
  }

  const addCustomSign = () => {
    const signText = customSignInput.trim()
    if (signText && !selectedSigns.includes(signText)) {
      setSelectedSigns(prev => [...prev, signText])
      setCustomSigns(prev => [...prev, signText])
      setCustomSignInput('')
    }
  }

  const saveDaySigns = async () => {
    if (!journey || selectedSigns.length === 0) {
      alert('Please log at least one sign')
      return
    }

    const updatedSigns = {
      ...journey.daily_signs,
      [journey.current_day]: selectedSigns
    }

    try {
      await fetch('/api/journey', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: journeyId,
          daily_signs: updatedSigns
        })
      })

      setJourney({ ...journey, daily_signs: updatedSigns })

      if (journey.current_day >= 5) {
        generateReading(updatedSigns)
      } else {
        setScreen('saved')
      }
    } catch (error) {
      console.error('Error saving signs:', error)
      alert('Failed to save. Please try again.')
    }
  }

  const generateReading = async (allSigns: { [day: number]: string[] }) => {
    if (!journey) return
    
    setScreen('generating')
    const signsList = Object.values(allSigns).flat()

    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: journey.question,
          signs: signsList,
          pathType: 'deep',
          isDeepReading: true,
          dayCount: 5
        })
      })

      if (!response.ok) throw new Error('Failed to generate reading')

      const data = await response.json()
      
      // Save reading to database
      await fetch('/api/journey', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: journeyId,
          completed: true,
          reading_text: data.reading,
          verdict: data.verdict
        })
      })

      setReading({ text: data.reading, verdict: data.verdict })
      setJourney({ ...journey, completed: true, reading_text: data.reading, verdict: data.verdict })
      setScreen('reading')
    } catch (error) {
      console.error('Error generating reading:', error)
      alert('Failed to generate reading. Please try again.')
      setScreen('signs')
    }
  }

  const formatReading = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))
  }

  const getReadingText = () => {
    if (!journey) return ''
    const signs = Object.values(journey.daily_signs).flat()
    
    return `✨ MY THEORAKL READING ✨

Question: "${journey.question}"

Signs I noticed:
${signs.map(s => `• ${s}`).join('\n')}

---

${reading.text}

---

THE UNIVERSE SAYS: ${reading.verdict}

---
Get your own reading at theorakl.com`
  }

  const copyReading = async () => {
    try {
      await navigator.clipboard.writeText(getReadingText())
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareReading = async () => {
    const text = getReadingText()
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Theorakl Reading', text, url: 'https://theorakl.com' })
      } catch {
        copyReading()
      }
    } else {
      copyReading()
    }
  }

  const emailReading = () => {
    const subject = encodeURIComponent('My Theorakl Reading')
    const body = encodeURIComponent(getReadingText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const downloadShareCard = async () => {
    if (!journey) return
    const cardUrl = `/api/share-card?question=${encodeURIComponent(journey.question)}&verdict=${encodeURIComponent(reading.verdict)}`
    
    try {
      const response = await fetch(cardUrl)
      const svgText = await response.text()
      
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')
      
      const img = new Image()
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = 'my-theorakl-reading.png'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(downloadUrl)
          }
        }, 'image/png')
      }
      
      img.src = url
    } catch (error) {
      console.error('Error generating share card:', error)
    }
  }

  const shareCardToSocial = async () => {
    if (!journey) return
    const cardUrl = `/api/share-card?question=${encodeURIComponent(journey.question)}&verdict=${encodeURIComponent(reading.verdict)}`
    
    try {
      const response = await fetch(cardUrl)
      const svgText = await response.text()
      
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')
      
      const img = new Image()
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = async () => {
        ctx?.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)
        
        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], 'my-theorakl-reading.png', { type: 'image/png' })
            try {
              await navigator.share({
                title: 'My Theorakl Reading',
                text: `The universe answered my question: "${reading.verdict}" ✨ Ask yours at theorakl.com`,
                files: [file]
              })
            } catch {
              downloadShareCard()
            }
          } else {
            downloadShareCard()
          }
        }, 'image/png')
      }
      
      img.src = url
    } catch (error) {
      console.error('Error:', error)
      downloadShareCard()
    }
  }

  const getTotalSignsLogged = () => {
    if (!journey) return 0
    return Object.values(journey.daily_signs).flat().length
  }

  // Generate stars
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
        {/* Loading Screen */}
        {screen === 'loading' && (
          <div className="screen active">
            <div className="loading">
              <div className="loading-orb"></div>
              <p className="loading-text">Loading your journey...</p>
            </div>
          </div>
        )}

        {/* Not Found Screen */}
        {screen === 'not-found' && (
          <div className="screen active">
            <div className="header">
              <h1 className="logo">THE<span>O</span>RAKL</h1>
              <p className="tagline">The signs are speaking</p>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                Journey not found. This link may have expired.
              </p>
              <button className="btn btn-primary" onClick={() => router.push('/')}>
                Start New Reading
              </button>
            </div>
          </div>
        )}

        {/* Signs Screen */}
        {screen === 'signs' && journey && (
          <div className="screen active">
            <div className="header">
              <h1 className="logo">THE<span>O</span>RAKL</h1>
            </div>

            <div className="progress-container">
              <p className="progress-label">Day {journey.current_day} of 5</p>
              <div className="progress-dots">
                {[1, 2, 3, 4, 5].map(day => (
                  <div 
                    key={day}
                    className={`progress-dot ${
                      journey.daily_signs[day] ? 'completed' : 
                      day === journey.current_day ? 'current' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="page-title">Log Your Signs</h2>
            <p className="page-subtitle">What has the universe shown you today?</p>

            <div className="card" style={{ marginBottom: '20px', background: 'rgba(201, 165, 92, 0.05)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Your question: <em style={{ color: 'var(--text-primary)' }}>"{journey.question}"</em>
              </p>
            </div>

            {/* Selected signs summary */}
            <div className="selected-signs-summary">
              <p className="summary-title">Signs Logged Today</p>
              <div className="summary-tags">
                {selectedSigns.length === 0 ? (
                  <span className="summary-empty">No signs selected yet</span>
                ) : (
                  selectedSigns.map((sign, i) => (
                    <span key={i} className="summary-tag">{sign}</span>
                  ))
                )}
              </div>
            </div>

            {/* All Sign Categories */}
            {[...basicSignCategories, ...premiumSignCategories].map(category => (
              <div key={category.id} className="sign-category">
                <div 
                  className={`category-header ${expandedCategories.includes(category.id) ? 'expanded' : ''}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-title">{category.title}</span>
                  <span className="category-expand">▼</span>
                </div>
                <div className={`sign-options ${expandedCategories.includes(category.id) ? 'expanded' : ''}`}>
                  {category.signs.map((sign, i) => (
                    <div 
                      key={i}
                      className={`sign-option ${selectedSigns.includes(sign) ? 'checked' : ''}`}
                      onClick={() => toggleSign(sign)}
                    >
                      <span className="sign-checkbox"></span>
                      <span className="sign-text">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Something Else */}
            <div className="sign-category">
              <div 
                className={`category-header ${expandedCategories.includes('other') ? 'expanded' : ''}`}
                onClick={() => toggleCategory('other')}
              >
                <span className="category-icon">✦</span>
                <span className="category-title">Something Else</span>
                <span className="category-expand">▼</span>
              </div>
              <div className={`sign-options ${expandedCategories.includes('other') ? 'expanded' : ''}`}>
                <div className="add-sign-input">
                  <input 
                    type="text" 
                    value={customSignInput}
                    onChange={(e) => setCustomSignInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSign()}
                    placeholder="Describe the sign you noticed..."
                  />
                  <button className="add-sign-btn" onClick={addCustomSign}>+</button>
                </div>
                {customSigns.map((sign, i) => (
                  <div 
                    key={i}
                    className={`sign-option ${selectedSigns.includes(sign) ? 'checked' : ''}`}
                    onClick={() => toggleSign(sign)}
                  >
                    <span className="sign-checkbox"></span>
                    <span className="sign-text">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary mt-30" onClick={saveDaySigns}>
              {journey.current_day >= 5 ? 'Reveal My Reading' : "Save Today's Signs"}
            </button>
          </div>
        )}

        {/* Saved Screen */}
        {screen === 'saved' && journey && (
          <div className="screen active">
            <div className="header">
              <h1 className="logo">THE<span>O</span>RAKL</h1>
            </div>

            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: 'var(--accent-gold)' }}>✓</div>
              <h2 className="page-title" style={{ marginBottom: '16px' }}>Day {journey.current_day} Complete</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
                Your signs have been recorded.<br />
                The universe is weaving your answer.
              </p>

              <div className="progress-container" style={{ marginBottom: '30px' }}>
                <div className="progress-dots">
                  {[1, 2, 3, 4, 5].map(day => (
                    <div 
                      key={day}
                      className={`progress-dot ${day <= journey.current_day ? 'completed' : ''}`}
                    />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '12px' }}>
                  {5 - journey.current_day} days remaining • {getTotalSignsLogged()} signs logged
                </p>
              </div>

              <div className="card">
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  Return tomorrow to log more signs. On Day 5, you'll receive your complete reading.
                </p>
              </div>

              <p style={{ color: 'var(--text-dim)', fontSize: '12px', marginTop: '30px' }}>
                Bookmark this page to return easily
              </p>
            </div>
          </div>
        )}

        {/* Generating Screen */}
        {screen === 'generating' && (
          <div className="screen active">
            <div className="loading">
              <div className="loading-orb"></div>
              <p className="loading-text">The universe is speaking...</p>
            </div>
          </div>
        )}

        {/* Reading Screen */}
        {screen === 'reading' && journey && (
          <div className="screen active">
            <div className="header">
              <h1 className="logo">THE<span>O</span>RAKL</h1>
            </div>
            
            <div className="reading-container">
              <p className="reading-question">&ldquo;{journey.question}&rdquo;</p>
              
              <div className="reading-signs">
                {Object.values(journey.daily_signs).flat().map((sign, i) => (
                  <span key={i} className="reading-sign-tag">{sign}</span>
                ))}
              </div>

              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-symbol">◆</span>
                <span className="divider-line"></span>
              </div>

              <div className="reading-text">
                {formatReading(reading.text)}
              </div>

              <div className="reading-verdict">
                <p className="verdict-label">The Universe Says</p>
                <p className="verdict-text">{reading.verdict}</p>
              </div>
            </div>

            {/* Share Options */}
            <div className="share-section">
              <p className="share-label">Save Your Reading</p>
              <div className="share-buttons">
                <button className="share-btn" onClick={copyReading}>
                  <span className="share-icon">📋</span>
                  <span>Copy</span>
                </button>
                <button className="share-btn" onClick={shareReading}>
                  <span className="share-icon">📤</span>
                  <span>Share</span>
                </button>
                <button className="share-btn" onClick={emailReading}>
                  <span className="share-icon">✉️</span>
                  <span>Email</span>
                </button>
              </div>
              {copySuccess && (
                <p className="copy-success">✓ Copied to clipboard</p>
              )}
            </div>

            {/* Share Card for Social */}
            <div className="share-card-section">
              <p className="share-label">Share on Social</p>
              <button className="btn btn-secondary share-card-btn" onClick={shareCardToSocial}>
                <span style={{ marginRight: '10px' }}>✨</span>
                Download Story Card
              </button>
              <p className="share-card-hint">Perfect for Instagram & TikTok stories</p>
            </div>

            <button className="btn btn-secondary mt-30" onClick={() => router.push('/')}>
              Start New Reading
            </button>
          </div>
        )}
      </div>
    </>
  )
}