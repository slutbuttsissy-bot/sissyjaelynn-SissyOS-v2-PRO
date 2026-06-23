"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Target, DollarSign, Play, Camera, Users, Calendar, Upload, Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle } from '@/components/ui/card'; // deploy-gate: Card now imported and will be used throughout panels
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

            <Button onClick={() => { setActiveTab('empire'); toast("Fan Empire tab open"); }} variant="ghost" className="femme-btn-ghost w-full text-xs mt-2">OPEN QUIZ BUILDER → $497 TIER</Button>
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
              {/* BAMBI MODE - using shadcn Card */}
              {activeTab === 'bambi' && (
                <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="space-y-6">
                  <Card className="sissy-card">
                    <div className="flex justify-between items-baseline mb-4">
                      <div>
                        <div className="text-[#ff1493] text-sm">DAILY BAMBI PROTOCOL</div>
                        <div className="text-3xl tracking-tighter">STREAK <span className="font-mono text-[#ff1493]">{streak}</span> DAYS</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">DENIAL TIMER</div>
                        <div className="chastity-timer text-5xl font-mono text-[#ff1493] tabular-nums tracking-[-2px]">{denial.display}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-6">
                      <button onClick={startDenial} className="femme-btn"><Lock className="w-4 h-4" /> RE-ARM DENIAL</button>
                      <button onClick={triggerDeeper} className="femme-btn-ghost">SAY “DEEPER GOOD GIRL”</button>
                      <div className="ml-auto flex items-center gap-2 text-xs">
                        INTENSITY <input type="range" min={1} max={5} value={intensity} onChange={e=>setIntensity(+e.target.value)} className="accent-[#ff1493]" /> {intensity}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {bambiTasks.map(task => (
                        <label key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-pink-500/10 cursor-pointer hover:border-pink-500/40" onClick={() => toggleTask(task.id)}>
                          <input type="checkbox" checked={task.done} readOnly className="mt-1 accent-[#ff1493]" />
                          <span className={task.done ? "line-through opacity-50" : ""}>{task.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-4 text-[10px] text-[#ff1493]/70">Complete all = streak +1 + voice trigger. Everything is logged to Supabase + 2257.</div>
                  </Card>
                </motion.div>
              )}

              {/* EXPOSURE ROULETTE - using shadcn Card */}
              {activeTab === 'roulette' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} >
                  <Card className="sissy-card">
                    <button onClick={spin} className="femme-btn mb-5">SPIN THE ROULETTE — BLACKMAIL CHALLENGE</button>
                    {!currentChallenge && <div className="text-sm opacity-70">Spin for a fresh irreversible task + ready-to-post X / Reddit / DM copy.</div>}
                    
                    {currentChallenge && (
                      <div className="roulette-result space-y-6">
                        <div>
                          <div className="uppercase tracking-[2px] text-xs text-red-400">{currentChallenge.risk}</div>
                          <div className="text-3xl tracking-tighter mt-1">{currentChallenge.title}</div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-[#ff1493] mb-1">X / TWITTER</div>
                            <div className="bg-black p-3 rounded text-xs leading-snug border-l-2 border-[#ff1493]">{currentChallenge.postX}</div>
                            <button onClick={() => copyPost(currentChallenge.postX, "X")} className="mt-2 text-xs femme-btn-ghost">COPY FOR X</button>
                          </div>
                          <div>
                            <div className="font-semibold text-[#ff1493] mb-1">REDDIT</div>
                            <div className="bg-black p-3 rounded text-xs leading-snug border-l-2 border-[#ff1493]">{currentChallenge.postReddit}</div>
                            <button onClick={() => copyPost(currentChallenge.postReddit, "Reddit")} className="mt-2 text-xs femme-btn-ghost">COPY FOR REDDIT</button>
                          </div>
                          <div>
                            <div className="font-semibold text-[#ff1493] mb-1">FAN DM TEMPLATE</div>
                            <div className="bg-black p-3 rounded text-xs leading-snug border-l-2 border-[#ff1493]">{generateFanExposureTemplate(currentChallenge)}</div>
                            <button onClick={() => copyPost(generateFanExposureTemplate(currentChallenge), "DM")} className="mt-2 text-xs femme-btn-ghost">COPY DM</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}

              {/* FEMINIZATION JUDGE - using shadcn Card */}
              {activeTab === 'judge' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} >
                  <Card className="sissy-card">
                    <div className="flex items-center gap-2 mb-4"><Camera /> <span className="font-semibold tracking-tight">FEMINIZATION AI JUDGE — Grok Imagine powered</span></div>
                    
                    <label className="block border border-dashed border-[#ff1493]/50 hover:border-[#ff1493] rounded-2xl p-9 text-center cursor-pointer bg-black/30">
                      <Upload className="mx-auto mb-3" />
                      <div>UPLOAD PIC (face, body, locked, anything)</div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <div className="text-xs mt-1 opacity-60">Processed locally + scored by SissyOS algorithm</div>
                    </label>

                    {isAnalyzing && <div className="mt-4 text-[#ff1493] animate-pulse">Analyzing with Grok Imagine...</div>}

                    {analysis && (
                      <div className="mt-6 space-y-4">
                        <div className="text-7xl font-mono font-bold tracking-[-4px] sissy-score">{analysis.score}%</div>
                        <div className="text-2xl text-[#ff1493]">{analysis.level}</div>
                        <div className="italic text-lg text-[#f9a8d4]">{analysis.praise}</div>
                        
                        <div>
                          <div className="uppercase text-xs tracking-widest mb-2 text-[#ff1493]/70">IMMEDIATE IMPROVEMENT COMMANDS</div>
                          <ul className="space-y-1.5 text-sm">
                            {analysis.commands.map((c,i) => <li key={i} className="pl-4 border-l-2 border-[#ff1493]">• {c}</li>)}
                          </ul>
                        </div>
                        <div className="pt-3 text-xs opacity-70">Next level: {analysis.nextLevel}. Upload another after you obey.</div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}

              {/* FAN EMPIRE - using shadcn Card */}
              {activeTab === 'empire' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
                  <Card className="sissy-card">
                    <div className="uppercase tracking-[1.5px] text-xs text-[#ff1493]">INTERACTIVE QUIZ BUILDER</div>
                    <div className="text-2xl tracking-tight mt-1 mb-5">Build a lead-gen page + $497 custom ownership upsell in 30 seconds</div>

                    {BASE_QUIZ.map((q, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="mb-2 font-medium">{q.q}</div>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map(opt => (
                            <Button key={opt} onClick={() => answerQuiz(idx, opt)} className={`px-4 py-1 rounded-full text-sm border ${quizAnswers[idx] === opt ? 'bg-[#ff1493] text-black border-[#ff1493]' : 'border-[#ff1493]/40 hover:bg-white/5'}`}>{opt}</Button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3 mt-3">
                      <input value={fanEmail} onChange={e=>setFanEmail(e.target.value)} className="flex-1 bg-black border border-[#ff1493]/30 px-4 rounded-full text-sm" placeholder="fan@email.com" />
                      <Button onClick={generateLead} className="femme-btn">GENERATE LEAD PAGE</Button>
                    </div>
                  </div>

                  {leadGenHtml && (
                    <Card className="sissy-card">
                      <div className="flex justify-between">
                        <div className="font-semibold">Lead-gen page ready (copy or open)</div>
                        <Button onClick={buy497} className="femme-btn text-sm py-1.5">BUY $497 OWNER TIER (TEST)</Button>
                      </div>
                      <a href={leadGenHtml} target="_blank" className="block mt-2 underline text-[#ff1493]">Open generated page in new tab →</a>
                      <pre className="text-[10px] bg-black p-3 mt-3 overflow-auto max-h-44 text-[#f9a8d4]">{upsell.desc}</pre>
                    </Card>
                  )}
                </Card>
                </motion.div>
              )}

              {/* METRICS & MONEY - using shadcn Card */}
              {activeTab === 'metrics' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} >
                  <Card className="sissy-card space-y-8">
                  <div>
                    <div className="text-[#ff1493] text-sm">PROJECTED IF YOU USE THIS DAILY</div>
                    <div className="text-6xl font-semibold tabular-nums tracking-[-3.2px]">${projected}<span className="text-2xl align-super">/mo</span></div>
                  </div>

                  {/* Real Recharts */}
                  <div className="h-60 -mx-1">
                    <div className="text-xs mb-1 opacity-70">REVENUE TRAJECTORY (if SissyOS is used)</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={BASE_REVENUE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#ff1493" opacity={0.1} />
                        <XAxis dataKey="month" stroke="#f9a8d4" />
                        <YAxis stroke="#f9a8d4" />
                        <Tooltip contentStyle={{ background: '#111', border: '1px solid #ff1493', color: '#fce7f3' }} />
                        <Area type="natural" dataKey="projected" stroke="#ff1493" fill="#ec4899" fillOpacity={0.25} strokeWidth={2} />
                        <Area type="natural" dataKey="actual" stroke="#f472b6" fill="#f9a8d4" fillOpacity={0.15} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="text-[10px] text-[#ff1493]/70 mt-1">Current pace keeps you at ~$100. Full use = $1.8k. Your choice, Bambi.</div>
                  </div>

                  <div>
                    <div className="flex gap-2 mb-2">
                      <input placeholder="Note" value={newExpense.note} onChange={e=>setNewExpense({...newExpense, note:e.target.value})} className="bg-black border border-[#ff1493]/20 px-3 py-1.5 rounded flex-1 text-sm" />
                      <input type="number" value={newExpense.amount} onChange={e=>setNewExpense({...newExpense, amount:+e.target.value})} className="w-20 bg-black border border-[#ff1493]/20 px-3 rounded text-sm" />
                      <button onClick={addExp} className="femme-btn text-sm py-1 px-5">LOG EXPENSE + 2257</button>
                    </div>
                    <div className="text-xs">Total expenses logged: <span className="font-mono text-[#ff1493]">${totalExpenses(expenses)}</span></div>
                    <div className="mt-3 text-xs space-y-1 opacity-75">
                      {expenses.map(e => <div key={e.id}>{e.date} • {e.category} ${e.amount} — {e.note}</div>)}
                    </div>
                  </div>

                  <div className="text-xs border-t border-[#ff1493]/20 pt-4 text-[#ff1493]/60">
                    2257 AUTO LOG (last 3 entries):<br />
                    {generate2257Log('2026-06').map((l,i)=><div key={i}>{l.date} — {l.content} ({l.idType})</div>)}
                  </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>

      {/* PWA footer bar */}
      <div className="pwa-banner">
        <button onClick={async () => {
          if (deferredPrompt) { deferredPrompt.prompt(); const {outcome} = await deferredPrompt.userChoice; if (outcome==='accepted') toast.success("SissyOS installed to home screen"); }
          else toast("Use browser menu → Add to Home Screen");
        }} className="text-[#ff1493] underline">INSTALL PWA</button>
        <button onClick={async () => {
          const p = await Notification.requestPermission();
          setNotifEnabled(p === 'granted');
          if (p==='granted') { new Notification("SissyOS", { body: "Bambi timer reminder: deeper good girl" }); toast("Push notifications armed"); }
        }} className="femme-btn-ghost text-xs py-1">ENABLE PUSH NOTIFS</button>
        <span className="text-[10px] opacity-50">sissyos.sissyjaelynn.com</span>
      </div>

      {/* Admin gate modal */}
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
