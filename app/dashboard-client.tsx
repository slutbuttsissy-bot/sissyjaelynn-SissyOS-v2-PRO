'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BRAND, WELCOME_COPY, STATS, BAMBI_TASKS, UPSALE_497 } from '@/lib/constants';
import { generateExposureRoulette , generateTenPosts, generateFilmScript, generateSellDM, runFeminizationJudge, buildFanQuiz, generateMetricsData, getDailyTasks, calculateChastityStreak } from '@/lib/generators';
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
  const [timeLeft, setTimeLeft] = useState(denialMinutes * 60);

  useEffect(() => { let t: any; if (isTiming && timeLeft > 0) { t = setInterval(() => setTimeLeft(x => x-1), 1000); } else if (timeLeft === 0) { setIsTiming(false); toast.success('Time complete'); if ('vibrate' in navigator) navigator.vibrate([200,100,200]); } return () => clearInterval(t); }, [isTiming, timeLeft]);

  const startDenial = () => { setTimeLeft(denialMinutes*60); setIsTiming(true); };
  const triggerVoice = (p: string) => { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(p); u.pitch=1.65; u.rate=0.92; window.speechSynthesis.speak(u); } };
  const toggleTask = (id: string) => setTasks(ts => ts.map(t => t.id===id ? {...t, done:!t.done} : t));
  const spin = () => { const r = generateExposureRoulette(); setRoulette(r); setSidebarOutput(r.xPost); };
  const judge = (e: any) => { const f = e.target.files?.[0]; if (f) { const res = runFeminizationJudge(f); setJudgeResult(res); } };
  const quiz = () => { const r = buildFanQuiz([3,3,3]); setQuizResult(r); };
  const logExp = (a: number) => { const nl = [...expenseLog, a]; setExpenseLog(nl); setMetrics(generateMetricsData(nl.reduce((s,x)=>s+x,0))); };
  const gen = (t: string) => { if (t==='posts') setSidebarOutput(generateTenPosts().join('\n')); if (t==='film') setSidebarOutput(generateFilmScript()); if (t==='sell') setSidebarOutput(generateSellDM()); };
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast('copied'); };
  const pull = () => { setLiveStats({followers:582,impressions:81500,revenue:105}); };
  const integ = async (ty: string) => { toast('calling ' + ty); if (ty==='drive') await createDriveFolderAction(); /* etc */ };

  return (<div className="max-w-7xl mx-auto p-8"><div className="pt-8"><h1 className="text-4xl text-[#ff69b4]">{WELCOME_COPY.greeting(user.name)}</h1><p>Personalized stats + live pull</p><button onClick={pull}>Pull live Google Sheet</button><div>Live: {liveStats.followers} foll</div></div><div className="grid lg:grid-cols-12 gap-6"><div className="lg:col-span-3"><SissyCard><SissyButton onClick={()=>gen('posts')}>Generate 10 posts</SissyButton><SissyButton onClick={()=>gen('film')}>Film script</SissyButton><SissyButton onClick={()=>gen('sell')}>$497 DM</SissyButton><div className="mt-4 text-xs">INTEGRATIONS</div><button onClick={()=>integ('drive')}>Drive/Box</button><button onClick={()=>integ('notion')}>Notion</button><button onClick={()=>integ('calendar')}>Calendar</button><button onClick={()=>integ('canva')}>Canva</button></SissyCard></div><div className="lg:col-span-9"><Tabs value={activeTab} onValueChange={setActiveTab}><TabsList><TabsTrigger value="bambi">BAMBI</TabsTrigger><TabsTrigger value="roulette">ROULETTE</TabsTrigger><TabsTrigger value="judge">JUDGE</TabsTrigger><TabsTrigger value="fan">FAN</TabsTrigger><TabsTrigger value="metrics">METRICS</TabsTrigger></TabsList><TabsContent value="bambi"><SissyCard>BAMBI MODE - streak {streak} - timer - voice "deeper good girl"</SissyCard></TabsContent><TabsContent value="roulette"><SissyCard><button onClick={spin}>SPIN</button>{roulette && <pre>{roulette.challenge}</pre>}</SissyCard></TabsContent><TabsContent value="judge"><SissyCard><input type="file" onChange={judge}/>{judgeResult && <div>{judgeResult.percent}% {judgeResult.analysis}</div>}</SissyCard></TabsContent><TabsContent value="fan"><SissyCard><button onClick={quiz}>BUILD $497 QUIZ</button>{quizResult && <div>{quizResult.recommendedTier}</div>}</SissyCard></TabsContent><TabsContent value="metrics"><SissyCard><ResponsiveContainer height={120}><BarChart data={metrics.revenue}><Bar dataKey="projected" fill="#ff1493"/></BarChart></ResponsiveContainer> ${metrics.projection} projected • 2257 log</SissyCard></TabsContent></Tabs></div></div></div>);
}