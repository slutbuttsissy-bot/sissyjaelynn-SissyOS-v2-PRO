'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BRAND, WELCOME_COPY, STATS, BAMBI_TASKS, UPSALE_497 
} from '@/lib/constants';
import { 
  generateExposureRoulette, 
  generateTenPosts, generateFilmScript, generateSellDM, runFeminizationJudge, 
  buildFanQuiz, generateMetricsData, getDailyTasks, calculateChastityStreak 
} from '@/lib/generators';
import { getShootingBlocks } from '@/lib/calendar';
import { toast } from 'sonner';
import { Lock, Play, Camera, BarChart3, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { createDriveFolderAction, createNotionHQAction, generateCanvaAction, createCalendarEventsAction } from '@/lib/integration-actions';

const SissyCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`sissy-card rounded-2xl p-6 ${className}`}>{children}</div>
);

const SissyButton = ({ children, onClick, className = '' }: any) => (
  <button 
    onClick={onClick} 
    className={`femme-btn px-6 py-3 rounded-full font-semibold tracking-wide text-sm flex items-center gap-2 bg-[#ff1493] text-[#0a0012] hover:bg-[#ff69b4] active:scale-[0.985] ${className}`}
  >{children}</button>
);

interface DashboardClientProps {
  user: { name: string; email: string };
  initialStats?: { followers: number; impressions: number; revenue: number };
}

export default function DashboardClient({ user, initialStats }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('bambi');
  const [liveStats, setLiveStats] = useState(initialStats || { followers: 580, impressions: 81000, revenue: 100 });
  const [tasks, setTasks] = useState(getDailyTasks());
  const [streak, setStreak] = useState(calculateChastityStreak());
  const [denialMinutes, setDenialMinutes] = useState(14);
  const [isTiming, setIsTiming] = useState(false);
  const [roulette, setRoulette] = useState<any>(null);
  const [judgeResult, setJudgeResult] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [metrics, setMetrics] = useState(generateMetricsData());
  const [expenseLog, setExpenseLog] = useState<number[]>([47]);
  const [sidebarOutput, setSidebarOutput] = useState('');
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [integrationResults, setIntegrationResults] = useState<string>('');

  const [timeLeft, setTimeLeft] = useState(denialMinutes * 60);

  useEffect(() => {
    let timer: any;
    if (isTiming && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTiming(false);
      toast.success("Time complete, good girl. Log it in tasks.");
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
    }
    return () => clearInterval(timer);
  }, [isTiming, timeLeft]);

  const startDenial = () => {
    setTimeLeft(denialMinutes * 60);
    setIsTiming(true);
    toast("Denial timer started. No touching.");
    if ('vibrate' in navigator) navigator.vibrate(80);
  };

  const triggerVoice = (phrase: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(phrase);
      u.pitch = 1.65;
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
    toast(`Voice trigger: "${phrase}"`);
  };

  const toggleTask = (id: string) => {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const updated = tasks.find(t => t.id === id);
    if (updated && !updated.done) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      toast.success(`Task complete. Streak now ${newStreak} days.`);
    }
  };

  const spinRoulette = () => {
    const res = generateExposureRoulette();
    setRoulette(res);
    setSidebarOutput(res.xPost);
    toast("Exposure Roulette spun. Copy ready.");
  };

  const analyzePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = runFeminizationJudge(file);
    setJudgeResult(result);
    toast(`AI Judge: ${result.percent}% sissy level`);
  };

  const runQuiz = () => {
    const res = buildFanQuiz(quizAnswers.length ? quizAnswers : [2, 3, 3]);
    setQuizResult(res);
    setSidebarOutput(res.leadGenPage.title + " — " + res.recommendedTier);
  };

  const logExpense = (amt: number) => {
    const newLog = [...expenseLog, amt];
    setExpenseLog(newLog);
    const fresh = generateMetricsData(newLog.reduce((a,b)=>a+b,0));
    setMetrics(fresh);
    toast(`2257 expense logged: $${amt}`);
  };

  const runSidebar = (type: string) => {
    if (type === 'posts') {
      const posts = generateTenPosts();
      setGeneratedPosts(posts);
      setSidebarOutput(posts.join('\n\n'));
      toast("10 posts generated. Ready to post.");
    }
    if (type === 'film') {
      const script = generateFilmScript();
      setSidebarOutput(script);
      toast("Film script ready.");
    }
    if (type === 'sell') {
      const dm = generateSellDM();
      setSidebarOutput(dm);
      toast("DM script for $497 tier copied.");
    }
    if ((window as any).requestSissyPush) (window as any).requestSissyPush();
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard — post it now.");
  };

  const pullLiveStats = () => {
    const newStats = { followers: 582, impressions: 81500, revenue: 105 };
    setLiveStats(newStats);
    toast('Live stats pulled from Google Sheet (demo)');
  };

  const triggerIntegration = async (type: string) => {
    toast(`Calling ${type} integration...`);
    try {
      let resStr = '';
      if (type === 'drive') {
        const res = await createDriveFolderAction();
        resStr = `Drive/Box ready: ${res.url || res.name}`;
        toast.success(resStr);
      } else if (type === 'notion') {
        const res = await createNotionHQAction();
        resStr = `Notion HQ: ${res.url}`;
        toast.success(resStr);
      } else if (type === 'calendar') {
        const res = await createCalendarEventsAction();
        resStr = `Calendar events added: ${res.length} events`;
        toast.success(resStr);
      } else if (type === 'canva') {
        const res = await generateCanvaAction();
        resStr = `Canva templates: ${res.length} generated`;
        toast.success(resStr);
      }
      setIntegrationResults(prev => (prev ? prev + ' | ' : '') + resStr);
    } catch (e) {
      toast.error(`Integration call failed (demo/MCP path)`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      {/* Personalized Welcome */}
      <div className="pt-8 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="text-5xl">💕</div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tighter text-[#ff69b4]">{WELCOME_COPY.greeting(user.name)}</h1>
            <p className="text-[#ff1493]/80 mt-1 text-lg">{BRAND.tagline}</p>
          </div>
          <button onClick={() => window.location.href = '/login'} className="ml-auto text-xs px-3 py-1 border border-[#ff1493]/40 rounded">Logout</button>
        </div>
        <SissyCard className="mt-4">
          <p className="text-lg">You currently sit at {liveStats.followers} X followers • {Math.round(liveStats.impressions / 1000)}k impressions • ${liveStats.revenue}/mo on OnlyFans.</p>
          <p className="mt-3 text-sm text-[#ff69b4]">{WELCOME_COPY.lockIn}</p>
          <button onClick={pullLiveStats} className="mt-1 text-xs underline text-[#ff69b4]">Pull live stats from Google Sheet (demo)</button>
          <div className="mt-4 flex gap-3 text-xs">
            <div className="px-3 py-1 bg-black/40 rounded">X: {liveStats.followers} followers • {Math.floor(liveStats.impressions/1000)}k imp</div>
            <div className="px-3 py-1 bg-black/40 rounded">OF: ${liveStats.revenue}/mo → ${STATS.projectedWithSissyOS} projected</div>
          </div>
        </SissyCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 dashboard-grid">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <SissyCard>
            <div className="uppercase tracking-[4px] text-xs mb-4 text-[#ff69b4] flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> ONE-CLICK GENERATORS
            </div>
            <div className="space-y-3">
              <SissyButton onClick={() => runSidebar('posts')} className="w-full justify-start">Generate today's 10 posts</SissyButton>
              <SissyButton onClick={() => runSidebar('film')} className="w-full justify-start">Film script for chastity thong</SissyButton>
              <SissyButton onClick={() => runSidebar('sell')} className="w-full justify-start">Sell Sissy OS to fan — $497 DM</SissyButton>
            </div>
            {sidebarOutput && <pre className="mt-4 p-3 bg-black/60 text-[10px] rounded overflow-auto max-h-48 text-[#ff69b4] whitespace-pre-wrap">{sidebarOutput}</pre>}
          </SissyCard>

          {/* Integrations - wired and observable */}
          <SissyCard className="mt-6">
            <div className="uppercase tracking-[4px] text-xs mb-3 text-[#ff69b4]">POST-DEPLOY INTEGRATIONS (callable)</div>
            <div className="space-y-2 text-sm">
              <button onClick={() => triggerIntegration('drive')} className="w-full text-left px-2 py-1 hover:bg-[#ff1493]/10 rounded">Create Drive/Box "SissyOS Assets" + upload</button>
              <button onClick={() => triggerIntegration('notion')} className="w-full text-left px-2 py-1 hover:bg-[#ff1493]/10 rounded">Create Notion "Sissy Empire HQ"</button>
              <button onClick={() => triggerIntegration('calendar')} className="w-full text-left px-2 py-1 hover:bg-[#ff1493]/10 rounded">Add 3 Calendar events (test/film/launch)</button>
              <button onClick={() => triggerIntegration('canva')} className="w-full text-left px-2 py-1 hover:bg-[#ff1493]/10 rounded">Generate 5 Canva thumbnail templates</button>
            </div>
            {integrationResults && <div className="mt-2 text-[10px] text-[#ff69b4]">Results: {integrationResults}</div>}
          </SissyCard>

          <SissyCard className="mt-6 text-center">
            <div className="text-xs uppercase mb-1 tracking-widest">Install on mobile</div>
            <div className="font-mono text-[10px] mb-2">sissyos.sissyjaelynn.com</div>
            <div className="text-[#ff1493] text-xs">PWA ready • Push armed</div>
          </SissyCard>
        </div>

        {/* Main Tabs */}
        <div className="lg:col-span-9">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 bg-[#1a0022] mb-4 rounded-full p-1 border border-[#ff1493]/30">
              <TabsTrigger value="bambi" className="sissy-tab">BAMBI MODE</TabsTrigger>
              <TabsTrigger value="roulette" className="sissy-tab">EXPOSURE ROULETTE</TabsTrigger>
              <TabsTrigger value="judge" className="sissy-tab">AI JUDGE</TabsTrigger>
              <TabsTrigger value="fan" className="sissy-tab">FAN EMPIRE</TabsTrigger>
              <TabsTrigger value="metrics" className="sissy-tab">METRICS $</TabsTrigger>
            </TabsList>

            <TabsContent value="bambi">
              <SissyCard>
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-[#ff1493]" />
                  <div>
                    <div className="text-2xl tracking-[-1.5px]">BAMBI MODE</div>
                    <div className="text-xs text-[#ff69b4]">Daily tasks • Chastity streak • Denial timer • Voice triggers</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="uppercase text-xs mb-3 tracking-[2px]">TODAY'S LOCKED TASKS</div>
                    {tasks.map(task => (
                      <label key={task.id} className="flex items-start gap-3 mb-3 cursor-pointer group" onClick={() => toggleTask(task.id)}>
                        <input type="checkbox" checked={task.done} readOnly className="mt-1 accent-[#ff1493]" />
                        <div className={task.done ? "line-through opacity-60" : ""}>{task.label}</div>
                      </label>
                    ))}
                    <div className="text-[#ff69b4] text-sm mt-2">Streak: <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="font-mono text-2xl text-white">{streak}</motion.span> days</div>
                  </div>
                  <div>
                    <div className="uppercase text-xs mb-3 tracking-[2px]">DENIAL TIMER + VIBRATE SIM</div>
                    <motion.div animate={{ opacity: isTiming ? [0.8, 1, 0.8] : 1 }} transition={{ duration: 0.8, repeat: isTiming ? Infinity : 0 }} className="denial-timer text-7xl tabular-nums font-mono mb-2 text-[#ff1493]">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</motion.div>
                    <div className="flex gap-3">
                      <SissyButton onClick={startDenial} disabled={isTiming}>START {denialMinutes} MIN DENIAL</SissyButton>
                      <SissyButton onClick={() => triggerVoice("Deeper... good girl.")} variant="outline">PLAY VOICE: deeper good girl</SissyButton>
                    </div>
                    <div className="mt-4 text-xs text-[#ff69b4]">Vibrate simulation + SpeechSynthesis femme voice. Mobile push armed.</div>
                    <input type="range" min="5" max="45" value={denialMinutes} onChange={e=>setDenialMinutes(+e.target.value)} className="w-full accent-[#ff1493] mt-2" />
                  </div>
                </div>
              </SissyCard>
            </TabsContent>

            <TabsContent value="roulette">
              <SissyCard>
                <div className="uppercase tracking-widest text-xs mb-2 text-[#ff69b4]">BLACKMAIL-STYLE • INSTANT POSTS</div>
                <SissyButton onClick={spinRoulette}>SPIN EXPOSURE ROULETTE</SissyButton>
                {roulette && (
                  <div className="mt-6 space-y-4 text-sm">
                    <div className="roulette-result p-4 bg-black/70 border-l-4 border-[#ff1493]">{roulette.challenge}</div>
                    <div>
                      <div className="text-[#ff69b4] text-xs mb-1">X / REDDIT READY</div>
                      <button onClick={() => copy(roulette.xPost)} className="text-left hover:underline block w-full">X: {roulette.xPost.slice(0,120)}...</button>
                    </div>
                    <button onClick={() => copy(roulette.fanDM)} className="text-[#ff1493] underline">Copy Fan DM Template</button>
                  </div>
                )}
              </SissyCard>
            </TabsContent>

            <TabsContent value="judge">
              <SissyCard>
                <div className="flex gap-2 items-center mb-4"><Camera /> <span className="uppercase tracking-widest text-xs">GROK IMAGINE SISSY SCORE</span></div>
                <input type="file" accept="image/*" onChange={analyzePhoto} className="block mb-4 text-sm file:mr-3 file:px-4 file:py-2 file:rounded-full file:border-0 file:bg-[#ff1493] file:text-[#0a0012]" />
                {judgeResult && (
                  <div className="mt-4">
                    <div className="text-7xl font-mono text-[#ff1493]">{judgeResult.percent}<span className="text-base align-super">%</span></div>
                    <div className="text-lg mb-3">{judgeResult.analysis}</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {judgeResult.commands.map((c: string, i: number) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </SissyCard>
            </TabsContent>

            <TabsContent value="fan">
              <SissyCard>
                <div className="uppercase text-xs tracking-widest mb-4">INTERACTIVE QUIZ → LEAD GEN + $497 TIER</div>
                <div className="flex gap-2 mb-3">
                  {[0,1,2].map(i => (
                    <button key={i} onClick={() => { const a = [...quizAnswers]; a[i] = 3; setQuizAnswers(a); }} className="text-xs px-3 py-1 border border-[#ff1493]/40 rounded">Q{i+1}</button>
                  ))}
                  <SissyButton onClick={runQuiz}>BUILD MY QUIZ + LEAD PAGE</SissyButton>
                </div>
                {quizResult && (
                  <div>
                    <div className="text-xl mb-2">{quizResult.leadGenPage.title}</div>
                    <div>{quizResult.leadGenPage.subtitle}</div>
                    <div className="mt-4 p-4 bg-black/60 rounded text-[#ff69b4] font-mono text-sm">{quizResult.recommendedTier}</div>
                    <SissyButton onClick={() => copy(UPSALE_497.description + ' ' + UPSALE_497.stripeTestNote)} className="mt-4">Copy $497 Upsell + Stripe Test Button</SissyButton>
                  </div>
                )}
              </SissyCard>
            </TabsContent>

            <TabsContent value="metrics">
              <SissyCard>
                <div className="uppercase tracking-widest text-xs mb-3 flex items-center gap-2"><BarChart3 /> METRICS + 2257 AUTO-LOG</div>
                <div className="h-64 -mx-2 mb-6">
                  <div className="text-xs mb-1 text-[#ff69b4]">PROJECTED REVENUE (if you obey SissyOS)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={metrics.revenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ff1493" opacity={0.2} />
                      <XAxis dataKey="month" stroke="#ff69b4" />
                      <YAxis stroke="#ff69b4" />
                      <Tooltip />
                      <Bar dataKey="projected" fill="#ff1493" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>Current: ${metrics.projection} projected</div>
                  <div>Net after 22% tax: ${metrics.netAfterTaxAndExpenses}</div>
                  <div>Tax: ${metrics.taxEstimate}</div>
                  <div>2257: {metrics.auto2257Log}</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Log expense $" type="number" className="w-28 bg-black/50 border-[#ff1493]/40" onKeyDown={(e:any) => { if (e.key==='Enter') logExpense(+e.currentTarget.value || 10); }} />
                  <SissyButton onClick={() => logExpense(25)}>LOG $25 EXPENSE</SissyButton>
                </div>
              </SissyCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12 text-[10px] opacity-50 text-center tracking-widest">
        {BRAND.name} • {BRAND.domain} • Made irreversible for {user.name}
      </div>
    </div>
  );
}
