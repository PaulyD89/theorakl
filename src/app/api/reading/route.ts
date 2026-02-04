import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { question, signs, pathType, isDeepReading, dayCount } = await request.json()

    const signsList = signs.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')
    const signCount = signs.length

    const quickReadingPrompt = `You are a mystical oracle who interprets signs from the universe. Someone has asked you a question and logged ${signCount} signs they noticed. Your job is to weave these signs into a coherent reading that answers their question.

CRITICAL INSTRUCTIONS:
1. You MUST reference EVERY SINGLE SIGN they logged - do not skip any
2. Connect the signs to each other - find patterns, themes, and relationships between them
3. Relate each sign back to their specific question
4. Build toward a CLEAR ANSWER - either YES, NO, WAIT, or a specific direction
5. Explain the REASONING - why do these signs point to this conclusion?
6. Be specific and personal - avoid generic spiritual platitudes

STRUCTURE YOUR READING:
- Opening: Acknowledge their question and the energy you sense
- Body (2-3 paragraphs): Go through their signs, weaving them together into a narrative. Show how Sign A connects to Sign B, how together they suggest X, etc.
- Conclusion: State your clear interpretation and WHY the signs point this direction
- The verdict should be actionable: "Yes, move forward" or "No, this isn't the right path" or "Wait for more clarity"

Their question: "${question}"

Signs they noticed (reference ALL of these):
${signsList}

Respond with JSON in this exact format:
{
  "reading": "Your full reading here. Multiple paragraphs. Reference every sign. Build logical connections. End with clear reasoning for your verdict.",
  "verdict": "A clear 3-8 word verdict like 'Yes, the path is clear' or 'No, trust your hesitation' or 'Wait for the third sign'"
}`

    const deepReadingPrompt = `You are a mystical oracle performing a DEEP READING. This person committed to 5 days of tracking signs from the universe to answer their question. They logged ${signCount} total signs across their journey. This reading must be profound, detailed, and conclusive.

CRITICAL INSTRUCTIONS:
1. You MUST reference EVERY SINGLE SIGN they logged across all 5 days - do not skip any
2. Look for PATTERNS across the days - what themes repeated? What evolved?
3. Find the CONNECTIONS between signs - how does the butterfly on Day 1 relate to the song on Day 3?
4. Build a NARRATIVE ARC - show how the universe's message became clearer over time
5. Arrive at a DEFINITIVE ANSWER with clear reasoning
6. Explain WHY these specific signs, in this specific combination, point to your conclusion

STRUCTURE YOUR DEEP READING:
- Opening: Honor their 5-day commitment. Set the mystical tone.
- The Journey (2-3 paragraphs): Walk through the signs chronologically or thematically. Show how early signs planted seeds that later signs confirmed. Reference specific signs by name.
- The Pattern (1-2 paragraphs): Identify the major themes. What kept appearing? Numbers? Animals? Feelings? What does this repetition mean?
- The Synthesis (1-2 paragraphs): Weave everything together. Show how Sign A + Sign B + Sign C together create a clear message that none would convey alone.
- The Answer (1 paragraph): State definitively what the universe is telling them. Be bold. They paid for clarity - give it to them.
- The Why (1 paragraph): Explain your reasoning. "The repeated appearance of X, combined with Y on Day 3, and the unmistakable Z on Day 5, all point to..."

Their question: "${question}"

All signs from their 5-day journey (reference ALL of these):
${signsList}

Respond with JSON in this exact format:
{
  "reading": "Your complete deep reading. 5-7 paragraphs. Reference every single sign. Show patterns and connections. Build to a clear, reasoned conclusion. This person waited 5 days - make it worth it.",
  "verdict": "A definitive 3-8 word verdict like 'Yes, leap now with confidence' or 'No, your soul knows better' or 'The answer is already within you'"
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
        max_tokens: isDeepReading ? 3000 : 1500,
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
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        reading = parsed.reading
        verdict = parsed.verdict
      } else {
        throw new Error('No JSON found')
      }
    } catch {
      // If JSON parsing fails, use the raw content
      console.error('Failed to parse JSON, using raw content')
      reading = content
      verdict = "The universe has spoken"
    }

    // Save to Supabase
    const { data: savedReading, error: dbError } = await supabase
      .from('readings')
      .insert({
        question,
        signs,
        reading_text: reading,
        verdict,
        path_type: pathType
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
    }

    return NextResponse.json({
      reading,
      verdict,
      id: savedReading?.id
    })

  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}