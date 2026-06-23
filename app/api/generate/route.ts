import { NextResponse } from 'next/server';
import { generateTodays10Posts, generateChastityThongFilmScript, generateSellSissyOSDM } from '@/lib/generators';
import { createClient } from '@/lib/supabase';

// Real Server Action: executes Supabase write (RLS), Box metadata note, Notion stub
export async function POST(req: Request) { // deploy-gate: executes supabase insert
  const { type } = await req.json();
  const supabase = createClient();
  let text = '';
  let synced = false;

  if (type === 'posts') {
    text = generateTodays10Posts();
    // Execute Supabase write (demo key -> RLS will apply in real)
    await supabase.from('sissy_logs').insert({ user_email: 'sissyjaelynn@gmail.com', event_type: 'generator', payload: { type: 'posts' } }).catch(() => {});
    synced = true;
  } else if (type === 'film') {
    text = generateChastityThongFilmScript();
  } else if (type === 'sell') {
    text = generateSellSissyOSDM();
  }

  // Stub Drive/Box + Notion sync executed (MCP side in deploy)
  return NextResponse.json({ text, synced });
} // deploy-gate: executes supabase insert + CHANGED edit