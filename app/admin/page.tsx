'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

export default function Admin2257() {
  const { data: session } = useSession();
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "2026-06-22 2257 Record: Initial SissyOS v2 PRO launch logged",
    "Owner Gmail: slutbuttsissy@gmail.com (demo)",
  ]);

  const check2257 = () => {
    if (code === '2257' || code.toLowerCase() === 'sissyjaelynn') {
      document.cookie = 'sissyos_2257=unlocked; path=/; max-age=86400';
      setUnlocked(true);
      toast.success("2257 access granted. All logs unlocked.");
    } else {
      toast.error("Incorrect 2257 code");
    }
  };

  const handleGoogleSignIn = async () => {
    toast("Initiating Google OAuth for slutbuttsissy@gmail.com (Gmail)");
    if (!session?.user) {
      await (await import('next-auth/react')).signIn('google');
    } else {
      toast.success("Already signed in with Google — 2257 access via session");
    }
  };

  const add2257Log = (entry: string) => {
    setLogs(l => [new Date().toISOString().slice(0,16) + " — " + entry, ...l]);
  };

  const has2257Cookie = typeof document !== 'undefined' && document.cookie.includes('sissyos_2257=unlocked');
  const needs2257 = !session?.user && !unlocked && !has2257Cookie;
  if (needs2257) {
    return (
      <div className="max-w-md mx-auto pt-20 p-6">
        <div className="sissy-card p-8">
          <Lock className="mx-auto mb-4" />
          <h1 className="text-3xl text-center mb-2">2257 SECURE ADMIN</h1>
          <p className="text-center text-sm mb-6 opacity-70">SissyOS v2 PRO — Record Keeping &amp; Empire Control</p>
          
          <div className="space-y-3">
            <input 
              value={code} 
              onChange={e=>setCode(e.target.value)} 
              placeholder="ENTER 2257 CODE" 
              className="w-full bg-black p-3 rounded text-center tracking-[4px] border border-[#ff1493]/40" 
              onKeyDown={e=>e.key==='Enter' && check2257()}
            />
            <button onClick={check2257} className="femme-btn w-full py-3 bg-[#ff1493] text-[#0a0012]">UNLOCK WITH 2257</button>
            
            <div className="text-center text-xs pt-2">— or —</div>
            <button onClick={handleGoogleSignIn} className="w-full py-2.5 border border-[#ff1493]/50 rounded text-sm">Sign in with Google (slutbuttsissy@gmail.com)</button>
          </div>
          <p className="text-[10px] text-center mt-6 opacity-40">All actions logged for 2257 compliance. Demo mode active.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-12">
      <div className="uppercase tracking-[4px] text-xs mb-2 text-[#ff1493]">SISSYOS • 2257 ADMIN</div>
      <h1 className="text-4xl mb-8">Empire Control + Record Log</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="sissy-card p-6">
          <div className="text-sm mb-3">QUICK ACTIONS (Server Actions)</div>
          <button onClick={() => add2257Log("Manual 2257 expense entry saved")} className="femme-btn mb-2 w-full">Log new 2257 expense</button>
          <button onClick={() => add2257Log("Calendar event auto-created via Google")} className="femme-btn mb-2 w-full">Create Film Event (Google Calendar)</button>
          <button onClick={() => add2257Log("Notion daily planner page created")} className="femme-btn w-full">Create Today's Notion Planner</button>
        </div>
        <div className="sissy-card p-6">
          <div className="text-sm mb-2">2257 COMPLIANCE LOG (live)</div>
          <div className="font-mono text-xs bg-black/70 p-3 h-64 overflow-auto space-y-1">
            {logs.map((l,i)=><div key={i}>{l}</div>)}
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs opacity-50">Real implementation: next-auth Google + Credentials + Supabase RLS + 2257 middleware. Keys in .env.</div>
    </div>
  );
}
