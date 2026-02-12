import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSignMeaning, SignMeaning, calculateSignWeights, hasEnoughSigns, determineVerdictLean } from '@/lib/signMeanings'
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
  combinationLean: { lean: string; confidence: number },
  signWeightLean: { lean: string; confidence: number; reasoning: string }
): string {
  const weights = calculateSignWeights(signs)
  
  let context = `
=== INTERPRETATION DATA ===

QUESTION ANALYSIS:
- Type: ${questionAnalysis.type}
- Domain: ${questionAnalysis.domain}
- Urgency: ${questionAnalysis.urgency}
- Emotional State: ${questionAnalysis.sentiment}
- Wants Permission: ${questionAnalysis.wantsPermission}
- Wants Validation: ${questionAnalysis.wantsValidation}
- Seeking Warning: ${questionAnalysis.wantsWarning}

${getQuestionGuidance(questionAnalysis)}

=== SIGN WEIGHT ANALYSIS ===
Total Signs: ${signs.length}
Positive Energy Score: ${weights.positiveScore}
Negative Energy Score: ${weights.negativeScore}
Wait Energy Score: ${weights.waitScore}
Neutral Signs: ${weights.neutralCount}
Total Weighted Score: ${weights.totalWeight}

CALCULATED VERDICT:
- Lean: ${signWeightLean.lean.toUpperCase()}
- Confidence: ${signWeightLean.confidence}%
- Reasoning: ${signWeightLean.reasoning}

=== SIGN-BY-SIGN DATA ===
`

  for (let i = 0; i < signAnalyses.length; i++) {
    const { sign, meaning, relevantContext } = signAnalyses[i]
    context += `
SIGN ${i + 1}: "${sign}"
Verdict Weight: ${meaning.verdictWeight.toUpperCase()} (strength: ${meaning.weightStrength}/3)
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
        context += `AMPLIFICATION: "${analysis.sign}" is STRENGTHENED by "${amplifier}" energy.\n`
      }
    }
  }
  
  // Check for contradictions
  for (const analysis of signAnalyses) {
    for (const contradictor of analysis.meaning.contradictors) {
      if (signs.some(s => s.toLowerCase().includes(contradictor.toLowerCase().split(' ')[0]))) {
        context += `TENSION: "${analysis.sign}" is in TENSION with "${contradictor}" energy.\n`
      }
    }
  }

  // Count sign types for pattern analysis
  const numberSigns = signs.filter(s => s.toLowerCase().includes('number') || s.match(/\d{3}/)).length
  const animalSigns = signs.filter(s => s.toLowerCase().includes('animal') || s.toLowerCase().includes('bird') || s.toLowerCase().includes('butterfly')).length
  const bodySigns = signs.filter(s => s.toLowerCase().includes('gut') || s.toLowerCase().includes('chill') || s.toLowerCase().includes('feeling')).length
  const dreamSigns = signs.filter(s => s.toLowerCase().includes('dream')).length
  const warningSigns = signs.filter(s => s.toLowerCase().includes('broke') || s.toLowerCase().includes('lost') || s.toLowerCase().includes('nightmare') || s.toLowerCase().includes('bad')).length
  
  context += `

=== PATTERN ANALYSIS ===
Number/Angel Signs: ${numberSigns}
Animal/Nature Signs: ${animalSigns}
Body/Intuition Signs: ${bodySigns}
Dream Signs: ${dreamSigns}
Warning Signs: ${warningSigns}
`

  if (numberSigns >= 2) {
    context += `PATTERN: Multiple numbers = universe communicating through mathematics/timing.\n`
  }
  if (bodySigns >= 2) {
    context += `PATTERN: Multiple body signs = their physical intuition is very active right now.\n`
  }
  if (animalSigns >= 2) {
    context += `PATTERN: Multiple animal signs = nature/spirit guides are reaching out.\n`
  }
  if (dreamSigns >= 2) {
    context += `PATTERN: Multiple dream signs = subconscious channel is wide open.\n`
  }
  if (warningSigns >= 2) {
    context += `PATTERN: Multiple warning signs = universe sending clear caution signals.\n`
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
    
    // Calculate sign weights and determine verdict lean
    const signWeightLean = determineVerdictLean(signs)
    const signCheck = hasEnoughSigns(signs)
    
    // Combine combination lean with sign weight lean for final verdict
    let finalLean = signWeightLean.lean
    let finalConfidence = signWeightLean.confidence
    
    // If combinations found, weight them heavily
    if (combinations.length > 0 && combinationLean.confidence > 50) {
      if (combinationLean.lean === 'yes' && signWeightLean.lean !== 'no') {
        finalLean = 'yes'
        finalConfidence = Math.max(finalConfidence, combinationLean.confidence)
      } else if (combinationLean.lean === 'no') {
        finalLean = 'no'
        finalConfidence = Math.max(finalConfidence, combinationLean.confidence)
      } else if (combinationLean.lean === 'wait') {
        finalLean = 'wait'
        finalConfidence = Math.max(finalConfidence, combinationLean.confidence)
      }
    }
    
    // Build the interpretation context
    const interpretationContext = buildInterpretationContext(
      signs,
      questionAnalysis,
      signAnalyses,
      combinations,
      combinationLean,
      signWeightLean
    )

    const signCount = signs.length

    // === INSUFFICIENT SIGNS PROMPT ===
    const insufficientSignsPrompt = `You are a warm, intuitive friend who reads signs from the universe. Someone has come to you with a question, but they've only shared ${signCount} sign(s).

${interpretationContext}

=== HOW TO RESPOND ===

Write like you're texting a friend who asked for your take on their situation. Be warm, genuine, and a little bit mystical—but not overly formal or "oracle-y."

Your response should:

1. Acknowledge their question "${question}" with empathy
2. Talk about the sign(s) they noticed—what does it suggest? Give them something real.
3. Gently explain that one or two signs is like hearing the first few notes of a song—you can't quite tell what it is yet
4. Encourage them to keep their eyes open over the next few days and come back when they've noticed a few more things
5. Maybe mention the 5-Day Reading if they want to go deeper

Keep it SHORT—2 paragraphs max. No bullet points. No formal structure. Just talk to them like a friend.

Their question: "${question}"
Their sign(s): ${signs.join(', ')}

TONE EXAMPLES:
- "Okay so you noticed ${signs[0]}—that's actually a really good sign to be paying attention to..."
- "Here's the thing though..."
- "I'd love to give you a clear answer, but..."
- "Keep watching. The universe isn't done talking yet."

DO NOT use phrases like:
- "Dear seeker"
- "The universe speaks"
- "I sense that..."
- Any overly mystical/formal language

Respond with JSON:
{
  "reading": "Your friendly, conversational response. 2 short paragraphs max. Talk like a friend, not an oracle.",
  "verdict": "Keep watching for more signs"
}`

    // === QUICK READING PROMPT ===
    let verdictInstructions = ''
    if (finalLean === 'yes') {
      verdictInstructions = `The answer is YES. Be encouraging and clear. Tell them to go for it, and explain why the signs support this.`
    } else if (finalLean === 'no') {
      verdictInstructions = `The answer is NO. Be gentle but honest—like a friend who cares enough to tell you the truth. Explain what the warning signs are telling you.`
    } else {
      verdictInstructions = `The answer is WAIT. The timing isn't right yet, or something needs to become clearer first. Explain what they might be waiting for.`
    }

    const verdictWord = finalLean === 'yes' ? 'Yes' : finalLean === 'no' ? 'No' : 'Wait'

    const quickReadingPrompt = `You are a warm, intuitive friend who's really good at reading signs from the universe. Someone has come to you with a question and shared the signs they've been noticing. Based on the data below, give them a reading.

${interpretationContext}

=== HOW TO RESPOND ===

Write like you're sitting across from a friend at a coffee shop, helping them figure something out. Be warm, real, and grounded—but also tuned into the mystical stuff.

Your response should:

1. Start by connecting to their question "${question}"—show you get what they're really asking
2. Walk through the signs they noticed, explaining what each one means in the context of their situation (use the interpretation data above)
3. If there are sign combinations or patterns, point those out—"and here's what's interesting..."
4. Build to a clear answer: ${finalLean.toUpperCase()}
5. End with a clear statement about what they should do

${verdictInstructions}

IMPORTANT GUIDELINES:
- Keep it to 3-4 paragraphs
- Reference their actual signs by name
- Make it specific to THEIR question—not generic advice
- Be definitive at the end. They came here for an answer.
- Write in a natural, conversational voice

DO NOT use:
- "Dear seeker" or any formal address
- "The universe speaks to you" or overly mystical language
- "I sense that..." 
- Bullet points or numbered lists
- Wishy-washy hedging like "only you can decide" or "the choice is yours"

GOOD TONE EXAMPLES:
- "Okay, let's look at what you've got here..."
- "So you're asking about ${question}—I get it, that's a big one."
- "Here's what stands out to me..."
- "The ${signs[0]} is interesting because..."
- "And when you combine that with the ${signs[1] || 'other signs'}..."
- "Look, I'm going to be real with you..."
- "This is a yes. Go for it."
- "I think you already know the answer here."

Their question: "${question}"

Respond with JSON:
{
  "reading": "Your complete reading. 3-4 paragraphs. Conversational and warm, but clear and definitive. End with a clear directive.",
  "verdict": "3-8 word verdict starting with '${verdictWord}'—make it feel personal and specific to their situation"
}`

    // === DEEP READING PROMPT ===
    let deepVerdictInstructions = ''
    if (finalLean === 'yes') {
      deepVerdictInstructions = `The answer is clearly YES. After 5 days of signs, the universe has been consistent. Be confident and affirming.`
    } else if (finalLean === 'no') {
      deepVerdictInstructions = `The answer is NO. The signs have been warning them all week. Be compassionate but clear—they need to hear this.`
    } else {
      deepVerdictInstructions = `The answer is WAIT. Something isn't aligned yet. Explain what needs to shift or what they're waiting for.`
    }

    const deepReadingPrompt = `You are a warm, intuitive friend who's really good at reading signs. Someone committed to tracking their signs for 5 DAYS and has come back to you with ${signCount} signs. This is meaningful—they put in the work. Give them a thorough, heartfelt reading.

${interpretationContext}

=== HOW TO RESPOND ===

This person spent 5 days paying attention. Honor that. Give them a reading that feels personal, thorough, and worth the wait.

Write like you're sitting down with a close friend who's been journaling their signs all week and wants your take. Be warm, insightful, and real.

Your response should:

1. Acknowledge that they did the work—5 days of paying attention is meaningful
2. Go through their signs, explaining what each one means for their specific question "${question}"
3. Point out any patterns—what kept showing up? What does that repetition mean?
4. If there are powerful sign combinations, highlight those moments
5. Weave it all together into a clear message
6. End with a definitive answer: ${finalLean.toUpperCase()}

${deepVerdictInstructions}

STRUCTURE (but make it flow naturally, not like a formal report):
- Open by honoring their commitment
- Walk through the signs (this is the meat of it—be thorough but engaging)
- Note the patterns and what they mean
- Bring it all together
- Give them a clear answer and tell them what to do

IMPORTANT:
- This should be longer and more thorough than a quick reading—5-6 paragraphs
- Reference EVERY sign they logged
- Make it specific to "${question}"
- Be definitive. After 5 days, they deserve certainty.

DO NOT use:
- "Dear seeker" or formal language
- Overly mystical phrases like "the cosmos reveals"
- Wishy-washy endings like "only you can decide"
- Bullet points or rigid structure

GOOD TONE:
- "Okay, you did the work. Let's see what you've got."
- "Five days of signs—that's not nothing. The universe has been talking."
- "Here's what I'm seeing..."
- "This kept coming up, and that's not an accident."
- "After everything you've shown me, here's what I think..."

Their question: "${question}"

Respond with JSON:
{
  "reading": "Your complete deep reading. 5-6 paragraphs. Warm, thorough, and definitive. Reference every sign. End with clear guidance.",
  "verdict": "3-8 word verdict starting with '${verdictWord}'—make it feel earned after 5 days of work"
}`

    // Choose prompt based on sign sufficiency
    let prompt: string
    if (signWeightLean.lean === 'insufficient' || !signCheck.sufficient) {
      prompt = insufficientSignsPrompt
    } else if (isDeepReading) {
      prompt = deepReadingPrompt
    } else {
      prompt = quickReadingPrompt
    }

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
      verdict = finalLean === 'yes' ? 'Yes, go for it' : 
                finalLean === 'no' ? 'No, trust your gut on this one' :
                finalLean === 'wait' ? 'Wait, the timing isn\'t right yet' :
                'Keep watching for more signs'
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
        verdict_lean: finalLean,
        confidence_score: finalConfidence
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
        verdictLean: finalLean,
        confidence: finalConfidence,
        signCount: signs.length,
        sufficient: signCheck.sufficient,
        weights: calculateSignWeights(signs)
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