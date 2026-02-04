import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Retrieve a journey by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Journey ID required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('journeys')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Journey not found' }, { status: 404 })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Error fetching journey:', error)
    return NextResponse.json({ error: 'Failed to fetch journey' }, { status: 500 })
  }
}

// POST - Create a new journey
export async function POST(request: NextRequest) {
  try {
    const { email, question } = await request.json()

    const { data, error } = await supabase
      .from('journeys')
      .insert({
        email,
        question,
        current_day: 1,
        daily_signs: {},
        completed: false
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to create journey')
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Error creating journey:', error)
    return NextResponse.json({ error: 'Failed to create journey' }, { status: 500 })
  }
}

// PATCH - Update a journey (add daily signs, mark complete, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const { id, daily_signs, current_day, completed, reading_text, verdict } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Journey ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (daily_signs !== undefined) updateData.daily_signs = daily_signs
    if (current_day !== undefined) updateData.current_day = current_day
    if (completed !== undefined) updateData.completed = completed
    if (reading_text !== undefined) updateData.reading_text = reading_text
    if (verdict !== undefined) updateData.verdict = verdict

    const { data, error } = await supabase
      .from('journeys')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to update journey')
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Error updating journey:', error)
    return NextResponse.json({ error: 'Failed to update journey' }, { status: 500 })
  }
}