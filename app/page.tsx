import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';
import { STATS } from '@/lib/constants';

export default async function SissyOSPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = {
    name: session.user.name || 'sissyjaelynn',
    email: session.user.email || 'slutbuttsissy@gmail.com',
  };

  // Pass initial stats; client can override with live pull
  const initialStats = {
    followers: STATS.xFollowers,
    impressions: STATS.xImpressions,
    revenue: STATS.ofMonthly,
  };

  return <DashboardClient user={user} initialStats={initialStats} />;
}
