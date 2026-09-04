import { NextResponse } from 'next/server'
export async function POST(request: Request) { try { const body = await request.json(); if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 }); return NextResponse.json({ ok: true, message: 'Enquiry received.' }, { status: 201 }) } catch { return NextResponse.json({ error: 'Unable to process enquiry.' }, { status: 400 }) } }
export async function GET() { return NextResponse.json({ items: [], message: 'Enquiry storage is ready for Neon persistence.' }) }
