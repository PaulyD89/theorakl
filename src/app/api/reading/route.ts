import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { question, signs, pathType } = await request.json()

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
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are a mystical oracle interpreting signs from the universe. Someone has asked you a question and reported the signs they've noticed. Give them a reading.

IMPORTANT GUIDELINES:
- Be warm, wise, and slightly mysterious
- Connect the signs they noticed into a coherent narrative
- Relate the signs back to their specific question
- End with a clear verdict or guidance
- Keep the tone hopeful but honest
- Never be generic — make it feel personal to their specific signs
- Write in flowing prose, not bullet points
- Keep it around 3-4 paragraphs

Their question: "${question}"

Signs they noticed:
${signs.map((s: string) => `- ${s}`).join('\n')}

Respond with JSON in this exact format:
{
  "reading": "Your full reading text here with multiple paragraphs...",
  "verdict": "A short 3-6 word verdict like 'The path is opening' or 'Trust your instincts' or 'Wait for clarity'"
}`
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
      const parsed = JSON.parse(content)
      reading = parsed.reading
      verdict = parsed.verdict
    } catch {
      // If JSON parsing fails, use the raw content
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
