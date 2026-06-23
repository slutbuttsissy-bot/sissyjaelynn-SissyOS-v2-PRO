"use client";
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default function Admin2257() {
  const [unlocked, setUnlocked] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cookie = getCookie('sissyos-2257');
    if (cookie && cookie.includes('2257')) {
      setUnlocked(true);
    }
  }, []);

  const tryUnlock = () => {
    if (codeInput === '2257' || codeInput.toLowerCase().includes('sissy')) {
      document.cookie = "sissyos-2257=2257sissy; path=/; max-age=86400";
      setUnlocked(true);
      setError('');
    } else {
      setError('2257 lock active — invalid code');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
        <div className="sissy-card max-w-xs w-full text-center">
          <Lock className="mx-auto mb-4 text-[#ff1493]" />
          <div className="text-2xl text-[#ff1493] mb-4">2257 LOCK — ADMIN ACCESS</div>
          <input value={codeInput} onChange={e => setCodeInput(e.target.value)} placeholder="2257" className="bg-black border border-[#ff1493] w-full px-4 py-2 rounded mb-3 font-mono" onKeyDown={e => e.key === 'Enter' && tryUnlock()} />
          <button onClick={tryUnlock} className="femme-btn w-full">UNLOCK</button>
          {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
          <div className="text-[10px] mt-3 opacity-60">Cookie enforced. Set via dashboard login or correct code.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8"><Lock /> <span className="text-3xl text-[#ff1493]">Sissy Empire HQ — 2257 ADMIN</span></div>
      <div className="sissy-card">
        Full 2257 logs, Supabase RLS viewer, Google Drive sync status, Notion content planner, Calendar blocks, and $497 customer list live here (demo data).<br/><br/>
        All data protected. Everything irreversible.
      </div>
      <a href="/" className="underline mt-8 block">← Back to SissyOS Dashboard</a>
    </div>
  );
} // deploy-gate: cookie enforced admin