import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, journeyId } = await request.json()

    const magicLink = `https://theorakl.com/journey/${journeyId}`

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Theorakl <onboarding@resend.dev>',
        to: email,
        subject: '✨ Your Theorakl Journey Awaits',
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; background: #0a0a0f; color: #e8e4dc;">
            <h1 style="text-align: center; font-weight: 300; letter-spacing: 0.1em; color: #e8e4dc; margin-bottom: 10px;">
              THE<span style="color: #c9a55c;">O</span>RAKL
            </h1>
            <p style="text-align: center; font-size: 11px; letter-spacing: 0.3em; color: #8a8680; margin-bottom: 40px;">
              THE SIGNS ARE SPEAKING
            </p>
            
            <p style="color: #e8e4dc; line-height: 1.8; margin-bottom: 20px;">
              Your 5-day journey with the universe has begun.
            </p>
            
            <p style="color: #8a8680; line-height: 1.8; margin-bottom: 30px;">
              Return each day to log the signs you notice. On Day 5, you'll receive your complete reading — a synthesis of everything the universe has shown you.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${magicLink}" style="display: inline-block; padding: 16px 32px; background: #c9a55c; color: #0a0a0f; text-decoration: none; font-size: 14px; letter-spacing: 0.05em;">
                Continue Your Journey
              </a>
            </div>
            
            <p style="color: #5a5650; font-size: 13px; line-height: 1.8; margin-top: 40px;">
              Bookmark this link or save this email — you can return to your journey from any device.
            </p>
            
            <p style="color: #5a5650; font-size: 12px; margin-top: 40px; text-align: center;">
              ${magicLink}
            </p>
          </div>
        `
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend error:', error)
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error sending magic link:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}