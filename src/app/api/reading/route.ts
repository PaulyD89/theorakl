import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSignMeaning, SignMeaning } from '@/lib/signMeanings'
import { findMatchingCombinations, getCombinationLean, SignCombination } from '@/lib/signCombinations'
import { analyzeQuestion, getQuestionGuidance, QuestionAnalysis } from '@/lib/questionAnalysis'

interface SignAnalysis {
  sign: string
  meaning: SignMeaning
  relevantContext: string
}

function buildSignAnalyses(signs: string[], questionAnalysis: QuestionAnalysis): SignAnalysis[] {
  return signs.map(sign => {
    const meaning = getSignMeaning(sign)
    
    // Select the most relevant context based on question domain
    let relevantContext = meaning.core
    switch (questionAnalysis.domain) {
      case 'relationship':
        relevantContext = meaning.relationshipContext
        break
      case 'career':
        relevantContext = meaning.careerContext
        break
      case 'spiritual':
        relevantContext = meaning.spiritualContext
        break
      default:
        relevantContext = meaning.emotionalContext
    }
    
    return { sign, meaning, relevantContext }
  })
}

function buildInterpretationContext(
  signs: string[],
  questionAnalysis: QuestionAnalysis,
  signAnalyses: SignAnalysis[],
  combinations: SignCombination[],
  combinationLean: { lean: string; confidence: number }
): string {
  let context = `
=== THEORAKL INTERPRETATION ENGINE ===

QUESTION ANALYSIS:
- Type: ${questionAnalysis.type}
- Domain: ${questionAnalysis.domain}
- Urgency: ${questionAnalysis.urgency}
- Emotional State: ${questionAnalysis.sentiment}
- Wants Permission: ${questionAnalysis.wantsPermission}
- Wants Validation: ${questionAnalysis.wantsValidation}
- Seeking Warning: ${questionAnalysis.wantsWarning}

${getQuestionGuidance(questionAnalysis)}

=== SIGN-BY-SIGN INTERPRETATION ===
`

  for (let i = 0; i < signAnalyses.length; i++) {
    const { sign, meaning, relevantContext } = signAnalyses[i]
    context += `
SIGN ${i + 1}: "${sign}"
Core Meaning: ${meaning.core}
Domain-Specific (${questionAnalysis.domain}): ${relevantContext}
Yes Energy: ${meaning.yesEnergy}
No Energy: ${meaning.noEnergy}
Wait Energy: ${meaning.waitEnergy}
Warnings: ${meaning.warnings.join('; ')}
Amplified by: ${meaning.amplifiers.join(', ')}
Contradicted by: ${meaning.contradictors.join(', ')}
---`
  }

  if (combinations.length > 0) {
    context += `

=== SPECIAL SIGN COMBINATIONS DETECTED ===
`
    for (const combo of combinations) {
      context += `
★ ${combo.name} (Power Level: ${combo.power_level}/5)
Triggers: ${combo.signs.join(' + ')}
Meaning: ${combo.meaning}
Verdict Lean: ${combo.verdict_lean.toUpperCase()}
---`
    }

    context += `

COMBINATION ANALYSIS:
Overall Lean: ${combinationLean.lean.toUpperCase()}
Confidence: ${combinationLean.confidence}%
`
  }

  // Add cross-sign analysis
  context += `

=== CROSS-SIGN ANALYSIS ===
`
  
  // Check for amplifications
  for (const analysis of signAnalyses) {
    for (const amplifier of analysis.meaning.amplifiers) {
      if (signs.some(s => s.toLowerCase().includes(amplifier.toLowerCase().split(' ')[0]))) {
        context += `AMPLIFICATION: "${analysis.sign}" is STRENGTHENED by the presence of "${amplifier}" energy in their signs.\n`
      }
    }
  }
  
  // Check for contradictions
  for (const analysis of signAnalyses) {
    for (const contradictor of analysis.meaning.contradictors) {
      if (signs.some(s => s.toLowerCase().includes(contradictor.toLowerCase().split(' ')[0]))) {
        context += `TENSION: "${analysis.sign}" is in TENSION with "${contradictor}" energy. Address this contradiction in your reading.\n`
      }
    }
  }

  // Count sign types for pattern analysis
  const numberSigns = signs.filter(s => s.toLowerCase().includes('number') || s.match(/\d{3}/)).length
  const animalSigns = signs.filter(s => s.toLowerCase().includes('animal') || s.toLowerCase().includes('bird') || s.toLowerCase().includes('butterfly')).length
  const bodySigns = signs.filter(s => s.toLowerCase().includes('gut') || s.toLowerCase().includes('chill') || s.toLowerCase().includes('feeling')).length
  const dreamSigns = signs.filter(s => s.toLowerCase().includes('dream')).length
  
  context += `

=== PATTERN ANALYSIS ===
Number/Angel Signs: ${numberSigns}
Animal/Nature Signs: ${animalSigns}
Body/Intuition Signs: ${bodySigns}
Dream Signs: ${dreamSigns}

`

  if (numberSigns >= 2) {
    context += `PATTERN NOTE: Multiple number signs suggest the universe is communicating through mathematics and divine timing. Pay special attention to the specific numbers.\n`
  }
  if (bodySigns >= 2) {
    context += `PATTERN NOTE: Multiple body signs indicate the person's physical intuition is highly active. Their body KNOWS the answer—help them trust it.\n`
  }
  if (animalSigns >= 2) {
    context += `PATTERN NOTE: Multiple animal signs suggest spirit guides are communicating through the natural world. This person has a connection to animal medicine.\n`
  }
  if (dreamSigns >= 2) {
    context += `PATTERN NOTE: Multiple dream signs indicate the person's subconscious/spiritual channel is wide open. Their dreams are prophetic right now.\n`
  }

  return context
}

export async function POST(request: NextRequest) {
  try {
    const { question, signs, pathType, isDeepReading, dayCount } = await request.json()

    // Analyze the question
    const questionAnalysis = analyzeQuestion(question)
    
    // Get sign interpretations
    const signAnalyses = buildSignAnalyses(signs, questionAnalysis)
    
    // Find special combinations
    const combinations = findMatchingCombinations(signs)
    const combinationLean = getCombinationLean(combinations)
    
    // Build the interpretation context
    const interpretationContext = buildInterpretationContext(
      signs,
      questionAnalysis,
      signAnalyses,
      combinations,
      combinationLean
    )

    const signCount = signs.length

    const quickReadingPrompt = `You are THEORAKL, a mystical oracle with a proprietary system for interpreting signs from the universe. You have access to our interpretation engine which has analyzed this person's question and signs in depth.

${interpretationContext}

=== YOUR TASK ===

Using the interpretation data above, create a reading that:

1. WEAVES every sign together into a coherent narrative (reference ALL ${signCount} signs by name)
2. Uses the DOMAIN-SPECIFIC interpretations provided (this is a ${questionAnalysis.domain} question)
3. Addresses any SPECIAL COMBINATIONS detected with their specific meanings
4. Resolves any TENSIONS between contradicting signs (if found)
5. Speaks to their PSYCHOLOGICAL NEEDS (permission: ${questionAnalysis.wantsPermission}, validation: ${questionAnalysis.wantsValidation}, warning: ${questionAnalysis.wantsWarning})
6. Builds to a CLEAR VERDICT that matches the overall lean (${combinationLean.lean}, ${combinationLean.confidence}% confidence)

STYLE GUIDELINES:
- Speak with mystical authority but warmth
- Be SPECIFIC—reference their exact signs, not generic spirituality
- Connect signs to each other: "The butterfly you saw COMBINED with the 444..."
- Build logical bridges: "This is significant because..."
- End with actionable clarity

Their question: "${question}"

Respond with JSON:
{
  "reading": "Your complete reading. 3-4 paragraphs. Reference every sign. Build connections. Address their psychological needs. End with clear reasoning for verdict.",
  "verdict": "3-8 word decisive verdict matching the lean: ${combinationLean.lean}"
}`

    const deepReadingPrompt = `You are THEORAKL, a mystical oracle with a proprietary system for interpreting signs from the universe. This person committed to a 5-DAY JOURNEY, logging ${signCount} signs total. You have access to our interpretation engine which has analyzed everything in depth.

${interpretationContext}

=== YOUR TASK: DEEP READING ===

This person waited 5 days and logged ${signCount} signs. They paid for this reading. Make it worth it.

Create a reading that:

1. HONORS their 5-day commitment—this is sacred
2. References EVERY SINGLE SIGN by name, weaving them chronologically or thematically
3. Uses the DOMAIN-SPECIFIC interpretations (this is a ${questionAnalysis.domain} question)
4. Highlights ALL SPECIAL COMBINATIONS detected—these are the power moments
5. Shows how signs BUILT ON EACH OTHER over the 5 days
6. Addresses TENSIONS between contradicting signs as nuance, not confusion
7. Speaks to their PSYCHOLOGICAL NEEDS (permission: ${questionAnalysis.wantsPermission}, validation: ${questionAnalysis.wantsValidation}, warning: ${questionAnalysis.wantsWarning})
8. Delivers a DEFINITIVE verdict with confidence (lean: ${combinationLean.lean}, ${combinationLean.confidence}% confidence)

STRUCTURE:
- Opening: Honor the journey. Set mystical tone.
- The Signs (2-3 paragraphs): Walk through each sign, explaining its meaning IN CONTEXT of their question. Show how early signs were seeds that later signs confirmed.
- The Patterns (1 paragraph): What kept appearing? What does the repetition mean?
- The Combinations (1 paragraph): Explain any special combinations detected and why they're significant.
- The Synthesis (1 paragraph): Weave it all together. Show how the TOTALITY creates a clear message.
- The Answer (1 paragraph): STATE THE VERDICT clearly with reasoning. They waited 5 days—give them certainty.

STYLE:
- Mystical but precise
- Reference specific signs constantly
- Build bridges between signs
- Create an arc of revelation
- End with power and clarity

Their question: "${question}"

Respond with JSON:
{
  "reading": "Your complete deep reading. 6-8 paragraphs. Reference every sign. Honor the journey. Build to certain conclusion.",
  "verdict": "3-8 word definitive verdict matching the lean: ${combinationLean.lean}"
}`

    const prompt = isDeepReading ? deepReadingPrompt : quickReadingPrompt

    // Generate reading using Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: isDeepReading ? 4000 : 2000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error('Failed to generate reading')
    }

    const data = await response.json()
    const content = data.content[0].text

    // Parse the JSON response
    let reading, verdict
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        reading = parsed.reading
        verdict = parsed.verdict
      } else {
        throw new Error('No JSON found')
      }
    } catch {
      console.error('Failed to parse JSON, using raw content')
      reading = content
      verdict = combinationLean.lean === 'yes' ? 'The signs point yes' : 
                combinationLean.lean === 'no' ? 'The signs urge caution' :
                combinationLean.lean === 'wait' ? 'Wait for more clarity' :
                'The universe has spoken'
    }

    // Save to Supabase with additional analysis data
    const { data: savedReading, error: dbError } = await supabase
      .from('readings')
      .insert({
        question,
        signs,
        reading_text: reading,
        verdict,
        path_type: pathType,
        question_type: questionAnalysis.type,
        question_domain: questionAnalysis.domain,
        combination_count: combinations.length,
        verdict_lean: combinationLean.lean,
        confidence_score: combinationLean.confidence
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the request if DB save fails
    }

    return NextResponse.json({
      reading,
      verdict,
      id: savedReading?.id,
      // Include analysis for potential future use
      analysis: {
        questionType: questionAnalysis.type,
        domain: questionAnalysis.domain,
        combinationsFound: combinations.length,
        verdictLean: combinationLean.lean,
        confidence: combinationLean.confidence
      }
    })

  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}