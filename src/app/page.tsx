'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Basic sign categories (available to all)
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

// Premium sign categories (only for paid users)
const premiumSignCategories = [
  {
    id: 'angel-numbers',
    icon: '𓂀',
    title: 'Angel Numbers',
    premium: true,
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
    premium: true,
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
    premium: true,
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
    premium: true,
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
    premium: true,
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
    premium: true,
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
    premium: true,
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
    premium: true,
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

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/00wdR9cm8atWbQ2d3Cew802'

type Screen = 'home' | 'question' | 'path' | 'signs' | 'loading' | 'reading' | 'about' | 'deep-journey'
type PathType = 'quick' | 'deep' | null

interface DeepJourneyData {
  question: string
  startDate: string
  currentDay: number
  dailySigns: { [day: number]: string[] }
  completed: boolean
}

function TheoraklApp() {
  const searchParams = useSearchParams()
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedPath, setSelectedPath] = useState<PathType>(null)
  const [userQuestion, setUserQuestion] = useState('')
  const [selectedSigns, setSelectedSigns] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [customSignInput, setCustomSignInput] = useState('')
  const [customSigns, setCustomSigns] = useState<string[]>([])
  const [reading, setReading] = useState({ text: '', verdict: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deepJourney, setDeepJourney] = useState<DeepJourneyData | null>(null)
  const [hasPaid, setHasPaid] = useState(false)

  // Check for payment return and load saved journey
  useEffect(() => {
    const paid = searchParams.get('paid')
    const savedQuestion = localStorage.getItem('theorakl_pending_question')
    
    if (paid === 'true' && savedQuestion) {
      const newJourney: DeepJourneyData = {
        question: savedQuestion,
        startDate: new Date().toISOString(),
        currentDay: 1,
        dailySigns: {},
        completed: false
      }
      localStorage.setItem('theorakl_deep_journey', JSON.stringify(newJourney))
      localStorage.removeItem('theorakl_pending_question')
      setDeepJourney(newJourney)
      setUserQuestion(savedQuestion)
      setSelectedPath('deep')
      setHasPaid(true)
      setCurrentScreen('signs')
      window.history.replaceState({}, '', '/')
    } else {
      const savedJourney = localStorage.getItem('theorakl_deep_journey')
      if (savedJourney) {
        const journey = JSON.parse(savedJourney) as DeepJourneyData
        const startDate = new Date(journey.startDate)
        const today = new Date()
        const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        journey.currentDay = Math.min(daysDiff, 5)
        setDeepJourney(journey)
        setUserQuestion(journey.question)
        setHasPaid(true)
      }
    }
  }, [searchParams])

  // Generate stars on mount
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

  const showScreen = (screen: Screen) => {
    setCurrentScreen(screen)
    window.scrollTo(0, 0)
  }

  const selectPath = (path: PathType) => {
    setSelectedPath(path)
  }

  const goToPathSelection = () => {
    if (!userQuestion.trim()) {
      alert('Please enter your question')
      return
    }
    showScreen('path')
  }

  const goToSigns = () => {
    if (!selectedPath) return
    
    if (selectedPath === 'deep' && !hasPaid) {
      localStorage.setItem('theorakl_pending_question', userQuestion)
      window.location.href = STRIPE_PAYMENT_LINK
      return
    }
    
    showScreen('signs')
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleSign = (signText: string, isPremium: boolean = false) => {
    if (isPremium && selectedPath !== 'deep') {
      return // Don't allow selecting premium signs on free tier
    }
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

  const saveDaySigns = () => {
    if (!deepJourney || selectedSigns.length === 0) {
      alert('Please log at least one sign')
      return
    }

    const updatedJourney = {
      ...deepJourney,
      dailySigns: {
        ...deepJourney.dailySigns,
        [deepJourney.currentDay]: selectedSigns
      }
    }

    localStorage.setItem('theorakl_deep_journey', JSON.stringify(updatedJourney))
    setDeepJourney(updatedJourney)

    if (deepJourney.currentDay >= 5) {
      generateDeepReading(updatedJourney)
    } else {
      showScreen('deep-journey')
    }
  }

  const generateDeepReading = async (journey: DeepJourneyData) => {
    setIsLoading(true)
    setError(null)
    showScreen('loading')

    const allSigns = Object.values(journey.dailySigns).flat()

    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: journey.question,
          signs: allSigns,
          pathType: 'deep',
          isDeepReading: true,
          dayCount: 5
        })
      })

      if (!response.ok) throw new Error('Failed to generate reading')

      const data = await response.json()
      setReading({ text: data.reading, verdict: data.verdict })

      const completedJourney = { ...journey, completed: true }
      localStorage.setItem('theorakl_deep_journey', JSON.stringify(completedJourney))
      setDeepJourney(completedJourney)

      showScreen('reading')
    } catch (err) {
      console.error('Error:', err)
      setError('Something went wrong. Please try again.')
      showScreen('signs')
    } finally {
      setIsLoading(false)
    }
  }

  const generateReading = async () => {
    if (selectedSigns.length === 0) {
      alert('Please log at least one sign')
      return
    }

    if (selectedPath === 'deep' && deepJourney) {
      saveDaySigns()
      return
    }

    setIsLoading(true)
    setError(null)
    showScreen('loading')

    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion,
          signs: selectedSigns,
          pathType: selectedPath
        })
      })

      if (!response.ok) throw new Error('Failed to generate reading')

      const data = await response.json()
      setReading({ text: data.reading, verdict: data.verdict })
      showScreen('reading')
    } catch (err) {
      console.error('Error:', err)
      setError('Something went wrong. Please try again.')
      showScreen('signs')
    } finally {
      setIsLoading(false)
    }
  }

  const resetApp = () => {
    setSelectedPath(null)
    setUserQuestion('')
    setSelectedSigns([])
    setExpandedCategories([])
    setCustomSignInput('')
    setCustomSigns([])
    setReading({ text: '', verdict: '' })
    setError(null)
    showScreen('home')
  }

  const continueJourney = () => {
    if (deepJourney) {
      setSelectedPath('deep')
      setUserQuestion(deepJourney.question)
      setSelectedSigns([])
      showScreen('signs')
    }
  }

  const startNewJourney = () => {
    localStorage.removeItem('theorakl_deep_journey')
    setDeepJourney(null)
    setHasPaid(false)
    resetApp()
  }

  const formatReading = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))
  }

  const getTotalSignsLogged = () => {
    if (!deepJourney) return 0
    return Object.values(deepJourney.dailySigns).flat().length
  }

  const todayAlreadyLogged = () => {
    if (!deepJourney) return false
    return !!deepJourney.dailySigns[deepJourney.currentDay]
  }

  const isPremiumUnlocked = selectedPath === 'deep'

  return (
    <>
      <div className="stars" id="stars"></div>
      
      <div className="app-container">
        {/* Home Screen */}
        <div className={`screen ${currentScreen === 'home' ? 'active' : ''}`}>
          <div className="header">
            <h1 className="logo">THE<span>O</span>RAKL</h1>
            <p className="tagline">The signs are speaking</p>
          </div>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">◆</span>
            <span className="divider-line"></span>
          </div>

          <p className="intro-text">
            The universe sends signs every day.<br />
            Learn to see them. Let them guide you.
          </p>

          {deepJourney && !deepJourney.completed && (
            <div className="card" style={{ marginBottom: '20px', borderColor: 'var(--accent-gold)' }}>
              <h3 className="card-title">Your Journey Continues</h3>
              <p className="card-subtitle">
                Day {deepJourney.currentDay} of 5 — {getTotalSignsLogged()} signs logged so far
              </p>
              {todayAlreadyLogged() ? (
                <p style={{ color: 'var(--accent-gold)', fontSize: '13px' }}>
                  ✓ Today&apos;s signs logged. Return tomorrow for Day {Math.min(deepJourney.currentDay + 1, 5)}.
                </p>
              ) : (
                <button className="btn btn-primary" onClick={continueJourney} style={{ marginTop: '12px' }}>
                  Log Today&apos;s Signs
                </button>
              )}
            </div>
          )}

          <button className="btn btn-primary" onClick={() => showScreen('question')}>
            {deepJourney && !deepJourney.completed ? 'Start New Reading' : 'Begin Your Reading'}
          </button>

          <button className="btn btn-secondary mt-20" onClick={() => showScreen('about')}>
            How It Works
          </button>
        </div>

        {/* Question Screen */}
        <div className={`screen ${currentScreen === 'question' ? 'active' : ''}`}>
          <button className="back-btn" onClick={() => showScreen('home')}>← Back</button>
          
          <h2 className="page-title">What do you seek?</h2>
          <p className="page-subtitle">Ask the question weighing on your mind.</p>

          <div className="form-group">
            <label className="form-label">Your Question</label>
            <textarea 
              className="form-textarea" 
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Should I take the new job offer?

Is this relationship meant to be?

Is now the right time to..."
            />
          </div>

          <button className="btn btn-primary" onClick={goToPathSelection}>
            Continue
          </button>
        </div>

        {/* Path Selection Screen */}
        <div className={`screen ${currentScreen === 'path' ? 'active' : ''}`}>
          <button className="back-btn" onClick={() => showScreen('question')}>← Back</button>
          
          <h2 className="page-title">Choose Your Path</h2>
          <p className="page-subtitle">How deep do you wish to go?</p>

          <div 
            className={`card path-card ${selectedPath === 'quick' ? 'selected' : ''}`}
            onClick={() => selectPath('quick')}
          >
            <h3 className="card-title">Quick Reading</h3>
            <p className="card-subtitle">Log the signs you&apos;ve noticed today and receive an instant interpretation from the universe.</p>
            <span className="card-price">FREE</span>
          </div>

          <div 
            className={`card path-card ${selectedPath === 'deep' ? 'selected' : ''}`}
            onClick={() => selectPath('deep')}
          >
            <h3 className="card-title">Deep Reading</h3>
            <p className="card-subtitle">Commit to 5 days of sign tracking. Unlock 8 additional sign categories including Angel Numbers, Spirit Messages, and Dreams.</p>
            <span className="card-price">$2.99</span>
          </div>

          {selectedPath === 'deep' && !hasPaid && (
            <div className="card" style={{ 
              marginTop: '20px', 
              background: 'rgba(201, 165, 92, 0.1)',
              borderColor: 'var(--accent-gold)'
            }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                <strong>Your 5-Day Journey Includes:</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>
                ✦ 8 premium sign categories unlocked
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>
                ✦ Angel Numbers with specific meanings
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>
                ✦ Messages from Spirit & deceased loved ones
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>
                ✦ Dreams, Visions & Premonitions
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                ✦ Deeper, more personalized final reading
              </p>
            </div>
          )}

          <button 
            className="btn btn-primary mt-30" 
            onClick={goToSigns} 
            disabled={!selectedPath}
          >
            {selectedPath === 'deep' && !hasPaid ? 'Continue to Payment — $2.99' : 'Continue'}
          </button>
        </div>

        {/* Signs Screen */}
        <div className={`screen ${currentScreen === 'signs' ? 'active' : ''}`}>
          <button className="back-btn" onClick={() => showScreen('path')}>← Back</button>
          
          {selectedPath === 'deep' && deepJourney && (
            <div className="progress-container">
              <p className="progress-label">Day {deepJourney.currentDay} of 5</p>
              <div className="progress-dots">
                {[1, 2, 3, 4, 5].map(day => (
                  <div 
                    key={day}
                    className={`progress-dot ${
                      day < deepJourney.currentDay ? 'completed' : 
                      day === deepJourney.currentDay ? 'current' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <h2 className="page-title">Log Your Signs</h2>
          <p className="page-subtitle">What has the universe shown you today?</p>

          {error && (
            <div style={{ 
              background: 'rgba(255,100,100,0.1)', 
              border: '1px solid rgba(255,100,100,0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px',
              color: '#ff6b6b',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

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

          {/* Basic Sign Categories */}
          {basicSignCategories.map(category => (
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

          {/* Premium Sign Categories */}
          {premiumSignCategories.map(category => (
            <div key={category.id} className="sign-category">
              <div 
                className={`category-header ${expandedCategories.includes(category.id) ? 'expanded' : ''} ${!isPremiumUnlocked ? 'locked' : ''}`}
                onClick={() => toggleCategory(category.id)}
                style={!isPremiumUnlocked ? { opacity: 0.6 } : {}}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-title">
                  {category.title}
                  {!isPremiumUnlocked && (
                    <span style={{ 
                      marginLeft: '8px', 
                      fontSize: '10px', 
                      background: 'var(--accent-gold)', 
                      color: 'var(--bg-deep)',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      verticalAlign: 'middle'
                    }}>
                      DEEP
                    </span>
                  )}
                </span>
                <span className="category-expand">▼</span>
              </div>
              <div className={`sign-options ${expandedCategories.includes(category.id) ? 'expanded' : ''}`}>
                {category.signs.map((sign, i) => (
                  <div 
                    key={i}
                    className={`sign-option ${selectedSigns.includes(sign) ? 'checked' : ''} ${!isPremiumUnlocked ? 'locked' : ''}`}
                    onClick={() => toggleSign(sign, true)}
                    style={!isPremiumUnlocked ? { 
                      opacity: 0.4, 
                      cursor: 'not-allowed',
                      pointerEvents: 'none'
                    } : {}}
                  >
                    <span className="sign-checkbox"></span>
                    <span className="sign-text">{sign}</span>
                  </div>
                ))}
                {!isPremiumUnlocked && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: 'var(--accent-gold)', 
                    marginTop: '8px',
                    fontStyle: 'italic'
                  }}>
                    Unlock with Deep Reading ($2.99)
                  </p>
                )}
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

          <button className="btn btn-primary mt-30" onClick={generateReading}>
            {selectedPath === 'deep' && deepJourney && deepJourney.currentDay < 5 
              ? "Save Today's Signs" 
              : 'Reveal My Reading'}
          </button>
        </div>

        {/* Deep Journey Progress Screen */}
        <div className={`screen ${currentScreen === 'deep-journey' ? 'active' : ''}`}>
          <div className="header">
            <h1 className="logo">THE<span>O</span>RAKL</h1>
          </div>

          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '20px',
              color: 'var(--accent-gold)'
            }}>✓</div>
            <h2 className="page-title" style={{ marginBottom: '16px' }}>Day {deepJourney?.currentDay} Complete</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
              Your signs have been recorded.<br />
              The universe is weaving your answer.
            </p>

            {deepJourney && (
              <div className="progress-container" style={{ marginBottom: '30px' }}>
                <div className="progress-dots">
                  {[1, 2, 3, 4, 5].map(day => (
                    <div 
                      key={day}
                      className={`progress-dot ${
                        day <= deepJourney.currentDay ? 'completed' : ''
                      }`}
                    />
                  ))}
                </div>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '13px', 
                  marginTop: '12px' 
                }}>
                  {5 - deepJourney.currentDay} days remaining
                </p>
              </div>
            )}

            <div className="card">
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Return tomorrow to log more signs. On Day 5, you&apos;ll receive your complete reading based on everything the universe has shown you.
              </p>
            </div>

            <button className="btn btn-secondary mt-30" onClick={() => showScreen('home')}>
              Return Home
            </button>
          </div>
        </div>

        {/* Loading Screen */}
        <div className={`screen ${currentScreen === 'loading' ? 'active' : ''}`}>
          <div className="loading">
            <div className="loading-orb"></div>
            <p className="loading-text">The universe is speaking...</p>
          </div>
        </div>

        {/* Reading Screen */}
        <div className={`screen ${currentScreen === 'reading' ? 'active' : ''}`}>
          <button className="back-btn" onClick={startNewJourney}>← New Reading</button>
          
          <div className="reading-container">
            <p className="reading-question">&ldquo;{userQuestion}&rdquo;</p>
            
            <div className="reading-signs">
              {selectedPath === 'deep' && deepJourney 
                ? Object.values(deepJourney.dailySigns).flat().map((sign, i) => (
                    <span key={i} className="reading-sign-tag">{sign}</span>
                  ))
                : selectedSigns.map((sign, i) => (
                    <span key={i} className="reading-sign-tag">{sign}</span>
                  ))
              }
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

          <button className="btn btn-secondary mt-30" onClick={startNewJourney}>
            Ask Another Question
          </button>
        </div>

        {/* About Screen */}
        <div className={`screen ${currentScreen === 'about' ? 'active' : ''}`}>
          <button className="back-btn" onClick={() => showScreen('home')}>← Back</button>
          
          <h2 className="page-title">How It Works</h2>
          
          <div className="card">
            <h3 className="card-title">1. Ask Your Question</h3>
            <p className="card-subtitle">What decision weighs on you? What guidance do you seek? Speak it into the universe.</p>
          </div>

          <div className="card">
            <h3 className="card-title">2. Notice the Signs</h3>
            <p className="card-subtitle">The universe is always communicating—through numbers, animals, sounds, people, feelings. We help you see what&apos;s already there.</p>
          </div>

          <div className="card">
            <h3 className="card-title">3. Receive Your Reading</h3>
            <p className="card-subtitle">We interpret the signs you&apos;ve logged and reveal the message meant for you. The more you notice, the clearer the answer.</p>
          </div>

          <button className="btn btn-primary mt-20" onClick={() => showScreen('question')}>
            Begin Now
          </button>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="app-container">
        <div className="loading">
          <div className="loading-orb"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    }>
      <TheoraklApp />
    </Suspense>
  )
}