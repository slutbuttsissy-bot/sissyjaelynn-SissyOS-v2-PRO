import { NextResponse } from 'next/server';
import { generateTodays10Posts, generateChastityThongFilmScript, generateSellSissyOSDM } from '@/lib/generators';
import { createClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const { type } = await req.json();
  const supabase = createClient();
  let text = '';
  let synced = false;

  if (type === 'posts') {
    text = generateTodays10Posts();
    await supabase.from('sissy_logs').insert({ user_email: 'sissyjaelynn@gmail.com', event_type: 'generator', payload: { type: 'posts' } }).catch(() => {});
    synced = true;
  } else if (type === 'film') {
    text = generateChastityThongFilmScript();
  } else if (type === 'sell') {
    text = generateSellSissyOSDM();
  }
  return NextResponse.json({ text, synced });
} // deploy-gate: executes supabase insert