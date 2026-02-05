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
=== THEORAKL INTERPRETATION ENGINE ===

QUESTION: "${questionAnalysis.type}"
DOMAIN: ${questionAnalysis.domain}
URGENCY: ${questionAnalysis.urgency}

${getQuestionGuidance(questionAnalysis)}

=== SIGN WEIGHT ANALYSIS ===
Total Signs: ${signs.length}
Positive Energy: ${weights.positiveScore}
Negative Energy: ${weights.negativeScore}
Wait Energy: ${weights.waitScore}

VERDICT: ${signWeightLean.lean.toUpperCase()} (${signWeightLean.confidence}%)
Reasoning: ${signWeightLean.reasoning}

=== SIGNS ===
`

  for (let i = 0; i < signAnalyses.length; i++) {
    const { sign, meaning, relevantContext } = signAnalyses[i]
    context += `
SIGN ${i + 1}: "${sign}"
Weight: ${meaning.verdictWeight.toUpperCase()} (strength: ${meaning.weightStrength})
Meaning: ${meaning.core}
Domain Context: ${relevantContext}
---`
  }

  if (combinations.length > 0) {
    context += `\n\n=== COMBINATIONS ===\n`
    for (const combo of combinations) {
      context += `★ ${combo.name}: ${combo.meaning} (Lean: ${combo.verdict_lean})\n`
    }
  }

  return context
}

export async function POST(request: NextRequest) {
  try {
    const { question, signs, pathType, isDeepReading } = await request.json()

    const questionAnalysis = analyzeQuestion(question)
    const signAnalyses = buildSignAnalyses(signs, questionAnalysis)
    const combinations = findMatchingCombinations(signs)
    const combinationLean = getCombinationLean(combinations)
    
    // Calculate sign weights and determine verdict
    const signWeightLean = determineVerdictLean(signs)
    const signCheck = hasEnoughSigns(signs)
    
    // Combine combination lean with sign weight lean
    let finalLean = signWeightLean.lean
    let finalConfidence = signWeightLean.confidence
    
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
    
    const interpretationContext = buildInterpretationContext(
      signs, questionAnalysis, signAnalyses, combinations, combinationLean, signWeightLean
    )

    const signCount = signs.length
    const questionText = question

    // INSUFFICIENT SIGNS PROMPT
    const insufficientSignsPrompt = `You are THE ORAKL, a mystical oracle. This person asked a question but provided only ${signCount} sign(s).

${interpretationContext}

The user has NOT provided enough signs. You must:
1. Acknowledge their question: "${questionText}"
2. Explain that ${signCount} sign(s) is not enough for a clear reading
3. Reference the specific sign(s) they provided
4. Suggest they return with more signs (at least 3-4) OR consider a 5-Day Deep Reading

DO NOT give a verdict. Say "The universe needs more signs."

Respond with JSON:
{
  "reading": "2-3 paragraphs explaining why more signs are needed. Be mystical but honest.",
  "verdict": "The universe needs more signs"
}`

    // QUICK READING PROMPT
    const yesInstructions = 'The signs point YES. Be confident. Tell them to proceed.'
    const noInstructions = 'The signs point NO. Be gentle but firm. This is a warning.'
    const waitInstructions = 'The signs point WAIT. Timing is not right.'
    
    const verdictInstructions = finalLean === 'yes' ? yesInstructions : 
                                finalLean === 'no' ? noInstructions : waitInstructions
    
    const verdictWord = finalLean === 'yes' ? 'Yes' : finalLean === 'no' ? 'No' : 'Wait'

    const quickReadingPrompt = `You are THE ORAKL, a mystical oracle.

${interpretationContext}

Create a reading that:
1. DIRECTLY addresses: "${questionText}"
2. References EVERY sign by name
3. Builds to verdict: ${finalLean.toUpperCase()} (${finalConfidence}% confidence)

YOUR VERDICT MUST BE: ${finalLean.toUpperCase()}

${verdictInstructions}

Make it SPECIFIC to "${questionText}" - not generic advice.
NO forbidden phrases: "only you can decide", "the choice is yours"

Respond with JSON:
{
  "reading": "3-4 paragraphs. Specific to their question. Reference every sign.",
  "verdict": "3-8 words starting with ${verdictWord}..."
}`

    // DEEP READING PROMPT
    const deepReadingPrompt = `You are THE ORAKL. This person did a 5-DAY JOURNEY with ${signCount} signs.

${interpretationContext}

Question: "${questionText}"
Verdict: ${finalLean.toUpperCase()} (${finalConfidence}% confidence)

Create a deep reading that:
1. HONORS their 5-day commitment
2. References EVERY sign and how they connect to "${questionText}"
3. Delivers a DEFINITIVE ${finalLean.toUpperCase()} verdict

Respond with JSON:
{
  "reading": "6-8 paragraphs. Specific to '${questionText}'. Build to ${finalLean.toUpperCase()}.",
  "verdict": "3-8 words starting with ${verdictWord}..."
}`

    // Choose prompt
    let prompt: string
    if (signWeightLean.lean === 'insufficient' || !signCheck.sufficient) {
      prompt = insufficientSignsPrompt
    } else if (isDeepReading) {
      prompt = deepReadingPrompt
    } else {
      prompt = quickReadingPrompt
    }

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
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error('Failed to generate reading')
    }

    const data = await response.json()
    const content = data.content[0].text

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
      reading = content
      verdict = finalLean === 'yes' ? 'Yes, the signs align' : 
                finalLean === 'no' ? 'No, the signs warn against this' :
                finalLean === 'wait' ? 'Wait for more clarity' :
                'The universe needs more signs'
    }

    const { data: savedReading, error: dbError } = await supabase
      .from('readings')
      .insert({
        question, signs, reading_text: reading, verdict, path_type: pathType,
        question_type: questionAnalysis.type, question_domain: questionAnalysis.domain,
        combination_count: combinations.length, verdict_lean: finalLean,
        confidence_score: finalConfidence
      })
      .select()
      .single()

    if (dbError) console.error('Database error:', dbError)

    return NextResponse.json({
      reading, verdict, id: savedReading?.id,
      analysis: {
        questionType: questionAnalysis.type, domain: questionAnalysis.domain,
        combinationsFound: combinations.length, verdictLean: finalLean,
        confidence: finalConfidence, signCount: signs.length, sufficient: signCheck.sufficient
      }
    })

  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 })
  }
}