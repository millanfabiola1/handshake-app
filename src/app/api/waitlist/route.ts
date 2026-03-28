import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, company } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Log to Vercel function logs — visible in the Vercel dashboard
    // Replace with a database (Supabase, etc.) for production use
    console.log('WAITLIST_SIGNUP', JSON.stringify({ name, email, company, createdAt: new Date().toISOString() }))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
