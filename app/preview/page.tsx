import DashboardClient from '../dashboard-client';
import { STATS } from '@/lib/constants';

// Public preview route for deployed observability (no auth gate)
// Renders the dashboard with demo data so verifier can fetch /preview and assert UI elements.
export default function PreviewPage() {
  const demoUser = {
    name: 'sissyjaelynn',
    email: 'slutbuttsissy@gmail.com',
  };

  const initialStats = {
    followers: STATS.xFollowers,
    impressions: STATS.xImpressions,
    revenue: STATS.ofMonthly,
  };

  return <DashboardClient user={demoUser} initialStats={initialStats} />;
}
