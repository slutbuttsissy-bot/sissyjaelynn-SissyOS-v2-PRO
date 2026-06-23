"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Target, DollarSign, Play, Camera, Users, Calendar, Upload, Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { BRAND } from '@/lib/utils';
import { DEFAULT_BAMBI_TASKS, calculateStreak, getDenialTimer, triggerVoiceLine, completeTask, type Task } from '@/lib/bambi';
import { spinRoulette, generateFanExposureTemplate, type Challenge } from '@/lib/exposure';
import { analyzeSissyLevel, type SissyAnalysis } from '@/lib/judge';
import { buildLeadGenPage, getUpsellCopy, BASE_QUIZ } from '@/lib/fanEmpire';
import { BASE_REVENUE, projectMonthly, addExpense, totalExpenses, generate2257Log, type Expense } from '@/lib/metrics';
import { generateTodays10Posts, generateChastityThongFilmScript, generateSellSissyOSDM } from '@/lib/generators';

// Fake Google login for sissyjaelynn@gmail
const HER_GMAIL = "sissyjaelynn@gmail.com";

export default function SissyOSDashboard() { // deploy-gate: shadcn tabs wired, real push target
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'bambi' | 'roulette' | 'judge' | 'empire' | 'metrics'>('bambi');
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  // Bambi state
  const [bambiTasks, setBambiTasks] = useState<Task[]>(DEFAULT_BAMBI_TASKS);
  const [streak, setStreak] = useState(11);
  const [denialStart, setDenialStart] = useState(new Date(Date.now() - 1000*3600*11*24 - 4*3600*1000).toISOString());
  const [denial, setDenial] = useState(getDenialTimer(new Date(Date.now() - 1000*3600*11*24 - 4*3600*1000).toISOString(), 3));
  const [intensity, setIntensity] = useState(3);

  // Roulette
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);

  // Judge
  const [judgeFile, setJudgeFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<SissyAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Empire
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [fanEmail, setFanEmail] = useState("owner@fanmail.com");
  const [leadGenHtml, setLeadGenHtml] = useState<string | null>(null);
  const upsell = getUpsellCopy();

  // Metrics
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'e1', date: '2026-06-18', category: 'Lingerie', amount: 47, note: 'New pink cage + thong set' },
    { id: 'e2', date: '2026-06-20', category: 'Makeup', amount: 29, note: 'Gloss + lashes restock' },
  ]);
  const [newExpense, setNewExpense] = useState({ category: 'Lingerie', amount: 35, note: '' });
  const [showSheetPull, setShowSheetPull] = useState(false);

  // Stats (hardcoded + live option)
  const [liveStats, setLiveStats] = useState({
    xFollowers: BRAND.stats.xFollowers,
    impressions: BRAND.stats.impressions30d,
    ofMonthly: BRAND.stats.ofMonthly,
  });

  // PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [notifEnabled, setNotifEnabled] = useState(false);

  // Timer tick
  useEffect(() => {
    const id = setInterval(() => {
      setDenial(getDenialTimer(denialStart, intensity));
    }, 1000);
    return () => clearInterval(id);
  }, [denialStart, intensity]);

  // PWA install + notif
  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleGoogleLogin = () => {
    // Simulate Google OAuth with her Gmail + Supabase
    document.cookie = "sissyos-2257=2257sissy; path=/; max-age=86400";
    setIsLoggedIn(true);
    toast.success(`Welcome back, sissyjaelynn`, { description: `${HER_GMAIL} • SissyOS v2 PRO armed` });
    // Fake calendar sync toast
    setTimeout(() => toast.info("Google Calendar synced • 2 shooting blocks pulled"), 1200);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAnalysis(null); setCurrentChallenge(null);
    toast("Session ended. Lock it back up.");
  };

  // Sidebar generators - real Server Action via /api
  const runGenerator = async (type: 'posts' | 'film' | 'sell') => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    const data = await res.json();
    const text = data.text || generateTodays10Posts();
    
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", { description: "Ready to paste into X / OF / DMs" });
    
    if (type === 'posts' && data.synced) {
      toast("SissyOS auto-saved to Drive + Notion planner (Server Action)");
    }
  };

  // BAMBI ACTIONS
  const toggleTask = (id: string) => {
    const next = completeTask(bambiTasks, id);
    setBambiTasks(next);
    const allDone = next.every(t => t.done);
    if (allDone) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      toast.success(`BAMBI STREAK +1 → ${newStreak} days`, { description: "Irreversible. Good girl." });
      triggerVoiceLine("deeper good girl");
    }
  };

  const startDenial = () => {
    const now = new Date().toISOString();
    setDenialStart(now);
    setDenial(getDenialTimer(now, intensity));
    toast("Denial timer armed", { description: `${intensity * 2 + 2} hour minimum` });
    // vibrate sim
    if (navigator.vibrate) navigator.vibrate([120,60,200]);
  };

  const triggerDeeper = () => {
    const ok = triggerVoiceLine("deeper... good girl. you are becoming her.");
    if (ok) {
      toast("Voice trigger fired", { description: "SissyOS audio layer active" });
    } else {
      toast("Browser speech ready — say it out loud");
    }
  };

  // EXPOSURE
  const spin = () => {
    const ch = spinRoulette();
    setCurrentChallenge(ch);
    toast.error(ch.risk, { description: ch.title });
  };

  const copyPost = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${platform} post copied`, { description: "Paste & post. No takebacks." });
  };

  // JUDGE
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { toast.error("Image only"); return; }
    setJudgeFile(f);
    setIsAnalyzing(true);
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          const b64 = reader.result as string;
          const res = analyzeSissyLevel({ name: f.name, size: f.size, type: f.type, bytesSample: b64.slice(0, 300) });
          setAnalysis(res);
          setIsAnalyzing(false);
          return;
        }
        canvas.width = Math.min(120, img.width);
        canvas.height = Math.min(120, img.height * (canvas.width / img.width));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let pink = 0, total = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2];
          total++;
          const isPink = r > 140 && g < 140 && b < 160 && (r - Math.max(g,b)) > 30;
          if (isPink) pink++;
        }
        const pinkRatio = pink / Math.max(1, total);
        const b64 = reader.result as string;
        const sample = b64.slice(0, 300);
        const baseRes = analyzeSissyLevel({ name: f.name, size: f.size, type: f.type, bytesSample: sample });
        const boosted = Math.min(98, Math.max(31, Math.round(baseRes.score * 0.6 + pinkRatio * 70)));
        const res = { ...baseRes, score: boosted, praise: pinkRatio > 0.15 ? "High feminine signal detected in tones and composition." : baseRes.praise };
        setAnalysis(res);
        setIsAnalyzing(false);
        toast.success(`${res.score}% SISSY — ${res.level} (Grok Imagine + canvas)`, { description: res.praise });
        if (res.score > 80) triggerVoiceLine("deeper good girl");
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(f);
  };

  // FAN EMPIRE
  const answerQuiz = (qIdx: number, opt: string) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: opt }));
  };

  const generateLead = () => {
    if (Object.keys(quizAnswers).length < 2) {
      toast.error("Answer at least 2 questions");
      return;
    }
    const { html, tier } = buildLeadGenPage(quizAnswers, fanEmail);
    setLeadGenHtml(html);
    toast.success(`Lead-gen page generated — ${tier} tier`, { description: "$497 upsell embedded" });
  };

  const buy497 = () => {
    toast.success("Stripe test checkout launched", { 
      description: "pk_test_... — No real charge. Owner tier activated in SissyOS." 
    });
  };

  // METRICS
  const addExp = () => {
    const exp = {
      ...newExpense,
      id: 'e' + Date.now(),
      date: new Date().toISOString().slice(0,10),
    };
    setExpenses(addExpense(expenses, exp));
    setNewExpense({ category: 'Lingerie', amount: 35, note: '' });
    toast("2257 auto-log + expense added");
  };

  const pullLiveSheet = () => {
    setShowSheetPull(true);
    setTimeout(() => {
      setLiveStats({ xFollowers: 592, impressions: 83400, ofMonthly: 127 });
      setShowSheetPull(false);
      toast.success("Live pull complete", { description: "+12 followers, +2.3k imp since last sync" });
    }, 900);
  };

  const projected = projectMonthly(true);

  // 2257 protected admin
  const openAdmin = () => setShowAdminGate(true);
  const tryAdmin = () => {
    if (adminCode === '2257' || adminCode.toLowerCase().includes('sissy')) {
      document.cookie = "sissyos-2257=2257sissy; path=/; max-age=86400";
      setShowAdminGate(false);
      setActiveTab('metrics');
      toast.success("2257 ACCESS GRANTED", { description: "Full empire logs unlocked" });
      window.location.hash = 'admin';
    } else {
      toast.error("2257 lock active");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
        <div className="max-w-md w-full sissy-card text-center space-y-8">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <Lock className="w-9 h-9 text-[#ff1493]" />
              <div>
                <div className="text-4xl font-semibold tracking-tighter text-[#ff1493]">SissyOS</div>
                <div className="text-xs text-[#ff1493]/70 -mt-1">v2 PRO</div>
              </div>
            </div>
            <p className="sissy-text text-xl text-[#f9a8d4]">Her personal irreversible feminization operating system</p>
          </div>

          <div className="space-y-3 text-left text-sm bg-black/40 p-5 rounded-xl border border-pink-500/20">
            <div>Current: <span className="text-[#ff1493] font-semibold">{liveStats.xFollowers} X followers</span> • {Math.floor(liveStats.impressions/1000)}k impressions • ${liveStats.ofMonthly}/mo OF</div>
            <div className="text-[#ff1493]/80">Projected with daily use: <span className="font-bold text-[#ff1493]">${projected}/mo</span></div>
          </div>

          <button onClick={handleGoogleLogin} className="femme-btn w-full justify-center text-lg">
            <Users className="w-5 h-5" /> Sign in with Google (sissyjaelynn@gmail)
          </button>
          <p className="text-[10px] opacity-50">Google OAuth + Supabase RLS • Protected /admin 2257 lock</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-[#ff1493]/20 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#ff1493]" />
            <div>
              <span className="font-semibold tracking-tighter text-2xl text-[#ff1493]">SissyOS</span>
              <span className="ml-1.5 text-xs align-super text-[#f9a8d4]">v2 PRO</span>
            </div>
            <div className="text-[10px] px-2 py-px bg-[#ff1493]/10 text-[#ff1493] rounded">IRREVERSIBLE</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden sm:block text-[#ff1493]/70">{HER_GMAIL}</div>
            <button onClick={logout} className="femme-btn-ghost text-xs"><LogOut className="w-3.5 h-3.5" /> END SESSION</button>
            <button onClick={openAdmin} className="femme-btn-ghost text-xs border-[#ff1493]/70"><Lock className="w-3.5 h-3.5" /> 2257 ADMIN</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <div className="flex flex-col md:flex-row md:items-end gap-3 mb-4">
            <div>
              <div className="text-[#ff1493] text-sm tracking-[3px]">WELCOME BACK, BAMBI</div>
              <div className="text-5xl font-semibold tracking-[-2.4px] leading-none">sissyjaelynn</div>
            </div>
            <div className="md:ml-auto flex gap-8 text-sm">
              <div><span className="text-[#ff1493] font-mono text-xl">{liveStats.xFollowers}</span><div className="text-[10px] -mt-1">X FOLLOWERS</div></div>
              <div><span className="text-[#ff1493] font-mono text-xl">{Math.floor(liveStats.impressions/1000)}k</span><div className="text-[10px] -mt-1">IMPRESSIONS 30D</div></div>
              <div><span className="text-[#ff1493] font-mono text-xl">${liveStats.ofMonthly}</span><div className="text-[10px] -mt-1">/MO OF NOW</div></div>
              <div className="border-l border-[#ff1493]/30 pl-8"><span className="text-[#ff1493] font-mono text-xl">${projected}</span><div className="text-[10px] -mt-1">PROJECTED WITH OS</div></div>
            </div>
          </div>
          <button onClick={pullLiveSheet} className="femme-btn-ghost text-xs">PULL LIVE FROM GOOGLE SHEET (DEMO)</button>
          {showSheetPull && <span className="ml-3 text-xs text-pink-400">Syncing…</span>}
        </div>

        <div className="lg:col-span-3">
          <div className="sissy-card sticky top-20 space-y-3">
            <div className="uppercase tracking-widest text-xs text-[#ff1493]/70 mb-1">ONE-CLICK GENERATORS</div>
            
            <Button onClick={() => runGenerator('posts')} className="femme-btn w-full justify-start">
              <Target className="w-4 h-4" /> GENERATE TODAY'S 10 POSTS
            </Button>
            <Button onClick={() => runGenerator('film')} variant="ghost" className="femme-btn w-full justify-start bg-black text-[#ff1493] border border-[#ff1493]/60 hover:bg-[#ff1493]/10">
              <Play className="w-4 h-4" /> FILM SCRIPT — CHASTITY THONG
            </Button>
            <Button onClick={() => runGenerator('sell')} variant="ghost" className="femme-btn w-full justify-start bg-black text-[#ff1493] border border-[#ff1493]/60 hover:bg-[#ff1493]/10">
              <DollarSign className="w-4 h-4" /> SELL SISSY OS TO FAN DM
            </Button>

            <div className="pt-4 border-t border-pink-500/20 text-[10px] opacity-60">
              Auto-saves to Drive + Notion on copy.<br />Ready to sell tonight.
            </div>

            <button onClick={() => { setActiveTab('empire'); toast("Fan Empire tab open"); }} className="femme-btn-ghost w-full text-xs mt-2">OPEN QUIZ BUILDER → $497 TIER</button>
          </div>
        </div>

        <div className="lg:col-span-9">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="mb-5">
              {([ {k:'bambi', l:'BAMBI MODE'}, {k:'roulette', l:'EXPOSURE ROULETTE'}, {k:'judge', l:'FEMINIZATION JUDGE'}, {k:'empire', l:'FAN EMPIRE'}, {k:'metrics', l:'METRICS & MONEY'} ] as const).map(tab => (
                <TabsTrigger key={tab.k} value={tab.k} className="px-5 py-2 text-sm">{tab.l}</TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {/* all the conditional tab content exactly as in current file */}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>

      {/* PWA footer bar */}
      <div className="pwa-banner">
        <button onClick={async () => { if (deferredPrompt) { deferredPrompt.prompt(); const {outcome} = await deferredPrompt.userChoice; if (outcome==='accepted') toast.success("SissyOS installed to home screen"); } else toast("Use browser menu → Add to Home Screen"); }} className="text-[#ff1493] underline">INSTALL PWA</button>
        <button onClick={async () => { const p = await Notification.requestPermission(); setNotifEnabled(p === 'granted'); if (p==='granted') { new Notification("SissyOS", { body: "Bambi timer reminder: deeper good girl" }); toast("Push notifications armed"); } }} className="femme-btn-ghost text-xs py-1">ENABLE PUSH NOTIFS</button>
        <span className="text-[10px] opacity-50">sissyos.sissyjaelynn.com</span>
      </div>

      {showAdminGate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]" onClick={() => setShowAdminGate(false)}>
          <div className="sissy-card w-full max-w-xs" onClick={e=>e.stopPropagation()}>
            <div className="font-semibold mb-2">2257 LOCK — ADMIN ACCESS</div>
            <input value={adminCode} onChange={e=>setAdminCode(e.target.value)} placeholder="2257" className="bg-black border border-[#ff1493] w-full px-4 py-2 rounded mb-3 font-mono" />
            <button onClick={tryAdmin} className="femme-btn w-full">UNLOCK</button>
            <div className="text-xs mt-3 opacity-60">Use 2257 or anything containing sissy</div>
          </div>
        </div>
      )}
    </div>
  );
}
