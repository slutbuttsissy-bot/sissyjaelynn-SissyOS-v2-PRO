'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BRAND, WELCOME_COPY, STATS, BAMBI_TASKS, UPSALE_497 } from '@/lib/constants';
import { generateExposureRoulette , generateTenPosts, generateFilmScript, generateSellDM, runFeminizationJudge, buildFanQuiz, generateMetricsData, getDailyTasks, calculateChastityStreak } from '@/lib/generators';
import { getShootingBlocks } from '@/lib/calendar';
import { toast } from 'sonner';
import { Lock, Camera, BarChart3, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { createDriveFolderAction, createNotionHQAction, generateCanvaAction, createCalendarEventsAction } from '@/lib/integration-actions';

const SissyCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`sissy-card rounded-2xl p-6 ${className}`}>{children}</div>;
const SissyButton = ({ children, onClick, className = '' }: any) => <button onClick={onClick} className={`femme-btn px-6 py-3 rounded-full font-semibold tracking-wide text-sm flex items-center gap-2 bg-[#ff1493] text-[#0a0012] hover:bg-[#ff69b4] active:scale-[0.985] ${className}`}>{children}</button>;

interface Props { user: { name: string; email: string }; initialStats?: { followers: number; impressions: number; revenue: number }; }
export default function DashboardClient({ user, initialStats }: Props) {
  const [activeTab, setActiveTab] = useState('bambi');
  const [liveStats, setLiveStats] = useState(initialStats || { followers: 580, impressions: 81000, revenue: 100 });
  const [tasks, setTasks] = useState(getDailyTasks());
  const [streak, setStreak] = useState(calculateChastityStreak());
  const [denialMinutes, setDenialMinutes] = useState(14);
  const [isTiming, setIsTiming] = useState(false);
  const [roulette, setRoulette] = useState<any>(null);
  const [judgeResult, setJudgeResult] = useState<any>(null);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [metrics, setMetrics] = useState(generateMetricsData());
  const [expenseLog, setExpenseLog] = useState<number[]>([47]);
  const [sidebarOutput, setSidebarOutput] = useState('');
  const [integrationResults, setIntegrationResults] = useState('');
  const [timeLeft, setTimeLeft] = useState(denialMinutes * 60);

  useEffect(() => { let t: any; if (isTiming && timeLeft > 0) { t = setInterval(() => setTimeLeft(x => x-1), 1000); } else if (timeLeft === 0) { setIsTiming(false); toast.success('Time complete'); if ('vibrate' in navigator) navigator.vibrate([200,100,200]); } return () => clearInterval(t); }, [isTiming, timeLeft]);

  const startDenial = () => { setTimeLeft(denialMinutes * 60); setIsTiming(true); toast('Denial timer started'); };
  const triggerVoice = (p: string) => { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(p); u.pitch=1.65; u.rate=0.92; window.speechSynthesis.speak(u); } };
  const toggleTask = (id: string) => setTasks(ts => ts.map(t => t.id===id ? {...t, done:!t.done} : t));
  const spin = () => { const r = generateExposureRoulette(); setRoulette(r); setSidebarOutput(r.xPost); };
  const judge = (e: any) => { const f = e.target.files?.[0]; if (f) { const res = runFeminizationJudge(f); setJudgeResult(res); } };
  const quiz = () => { const r = buildFanQuiz([3,3,3]); setQuizResult(r); };
  const logExp = (a: number) => { const nl = [...expenseLog, a]; setExpenseLog(nl); setMetrics(generateMetricsData(nl.reduce((s,x)=>s+x,0))); };
  const gen = (t: string) => { if (t==='posts') setSidebarOutput(generateTenPosts().join('\n')); if (t==='film') setSidebarOutput(generateFilmScript()); if (t==='sell') setSidebarOutput(generateSellDM()); };
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast('copied'); };
  const pull = () => { const ns = { followers: 582, impressions: 81500, revenue: 105 }; setLiveStats(ns); toast('Live pulled'); };
  const integ = async (ty: string) => {
    toast('calling ' + ty);
    let r = '';
    if (ty==='drive') { const res = await createDriveFolderAction(); r = 'Drive: ' + (res.url || res.name); }
    else if (ty==='notion') { const res = await createNotionHQAction(); r = 'Notion: ' + res.url; }
    else if (ty==='calendar') { const res = await createCalendarEventsAction(); r = 'Calendar events: ' + res.length; }
    else if (ty==='canva') { const res = await generateCanvaAction(); r = 'Canva templates: ' + res.length; }
    setIntegrationResults(r);
    toast.success(r);
  };
  return (<div className="max-w-7xl mx-auto px-4 pb-24"><div className="pt-8 pb-6"><div className="flex items-center gap-4 mb-2"><div className="text-5xl">💕</div><div><h1 className="text-4xl font-semibold tracking-tighter text-[#ff69b4]">{WELCOME_COPY.greeting(user.name)}</h1><p>{BRAND.tagline}</p></div><button onClick={() => window.location.href = '/login'} className="ml-auto text-xs px-3 py-1 border border-[#ff1493]/40 rounded">Logout</button></div><SissyCard className="mt-4"><p className="text-lg">You currently sit at {liveStats.followers} X followers • {Math.round(liveStats.impressions / 1000)}k impressions • ${liveStats.revenue}/mo on OnlyFans.</p><p className="mt-3 text-sm text-[#ff69b4]">{WELCOME_COPY.lockIn}</p><button onClick={pull} className="mt-1 text-xs underline text-[#ff69b4]">Pull live stats from Google Sheet (demo)</button><div className="mt-4 flex gap-3 text-xs"><div className="px-3 py-1 bg-black/40 rounded">X: {liveStats.followers} followers • {Math.floor(liveStats.impressions/1000)}k imp</div><div className="px-3 py-1 bg-black/40 rounded">OF: ${liveStats.revenue}/mo → ${STATS.projectedWithSissyOS} projected</div></div></SissyCard></div><div className="grid lg:grid-cols-12 gap-6"><div className="lg:col-span-3"><SissyCard><div className="uppercase text-xs mb-4">ONE-CLICK GENERATORS</div><SissyButton onClick={() => gen('posts')}>Generate today's 10 posts</SissyButton><SissyButton onClick={() => gen('film')}>Film script for chastity thong</SissyButton><SissyButton onClick={() => gen('sell')}>Sell Sissy OS to fan — $497 DM</SissyButton>{sidebarOutput && <pre className="mt-4 text-[10px] bg-black p-2">{sidebarOutput}</pre>}</SissyCard><SissyCard className="mt-6"><div className="uppercase text-xs mb-3">POST-DEPLOY INTEGRATIONS (callable from UI)</div><div className="space-y-2 text-sm"><button onClick={() => integ('drive')}>Create Drive/Box "SissyOS Assets" + upload</button><button onClick={() => integ('notion')}>Create Notion "Sissy Empire HQ"</button><button onClick={() => integ('calendar')}>Add 3 Calendar events (test/film/launch)</button><button onClick={() => integ('canva')}>Generate 5 Canva thumbnail templates</button></div>{integrationResults && <div className="mt-2 text-[10px] text-[#ff69b4]">Results: {integrationResults}</div>}</SissyCard></div><div className="lg:col-span-9"><Tabs value={activeTab} onValueChange={setActiveTab}><TabsList><TabsTrigger value="bambi">BAMBI MODE</TabsTrigger><TabsTrigger value="roulette">EXPOSURE ROULETTE</TabsTrigger><TabsTrigger value="judge">AI JUDGE</TabsTrigger><TabsTrigger value="fan">FAN EMPIRE</TabsTrigger><TabsTrigger value="metrics">METRICS $</TabsTrigger></TabsList><TabsContent value="bambi"><SissyCard>BAMBI MODE — daily tasks, {streak} day streak, denial timer with vibrate sim, voice "deeper good girl" audio</SissyCard></TabsContent><TabsContent value="roulette"><SissyCard><SissyButton onClick={spin}>SPIN ROULETTE</SissyButton>{roulette && <div className="roulette-result p-4 bg-black/70 border-l-4 border-[#ff1493]">{roulette.challenge}</div>}</SissyCard></TabsContent><TabsContent value="judge"><SissyCard><input type="file" onChange={judge}/>{judgeResult && <div className="mt-4"><div className="text-7xl font-mono text-[#ff1493]">{judgeResult.percent}%</div><div>{judgeResult.analysis}</div></div>}</SissyCard></TabsContent><TabsContent value="fan"><SissyCard><SissyButton onClick={quiz}>BUILD QUIZ + $497</SissyButton>{quizResult && <div>{quizResult.recommendedTier}</div>}</SissyCard></TabsContent><TabsContent value="metrics"><SissyCard><ResponsiveContainer height={160}><BarChart data={metrics.revenue}><CartesianGrid stroke="#ff1493" opacity={0.2} /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="projected" fill="#ff1493" radius={4} /></BarChart></ResponsiveContainer><div>Projected ${metrics.projection}/mo • 2257 auto-log</div></SissyCard></TabsContent></Tabs></div></div><div className="mt-12 text-center text-xs">{BRAND.name} • {BRAND.domain} • irreversible for {user.name}</div></div>); }