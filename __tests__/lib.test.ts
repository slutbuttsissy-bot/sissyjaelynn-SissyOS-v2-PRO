import { describe, it, expect } from 'vitest';
import { calculateStreak, getDenialTimer } from '../lib/bambi';
import { spinRoulette } from '../lib/exposure';
import { analyzeSissyLevel } from '../lib/judge';
import { buildLeadGenPage } from '../lib/fanEmpire';
import { projectMonthly, generate2257Log } from '../lib/metrics';
import { generateTodays10Posts } from '../lib/generators';
import { BRAND } from '../lib/utils';

describe('SissyOS pure logic — real functions only', () => {
  it('streak calculation on representative data', () => {
    const dates = ['2026-06-20','2026-06-21','2026-06-22'];
    expect(calculateStreak(dates, '2026-06-23')).toBe(0);
    expect(calculateStreak(dates, '2026-06-22')).toBe(3);
  });

  it('denial timer produces valid display + vibrate', () => {
    const start = new Date(Date.now() - 1000*60*90).toISOString();
    const t = getDenialTimer(start, 2);
    expect(t.display).toMatch(/\d{2}:\d{2}:\d{2}/);
    expect(t.vibratePattern.length).toBeGreaterThan(3);
    expect(t.remainingMs).toBeGreaterThan(0);
  });

  it('roulette produces complete branded posts', () => {
    const c = spinRoulette();
    expect(c.title.length).toBeGreaterThan(5);
    expect(c.postX).toContain('SissyOS');
    expect(c.fanDM).toContain('tribute');
  });

  it('judge scores real file input non-trivially with bytesSample', () => {
    const sample = 'data:image/jpeg;base64,' + 'pInK'.repeat(80);
    const a = analyzeSissyLevel({ name: 'selfie-locked.jpg', size: 48291, type: 'image/jpeg', bytesSample: sample });
    expect(a.score).toBeGreaterThan(30);
    expect(a.score).toBeLessThan(99);
    expect(a.commands.length).toBeGreaterThan(1);
    expect(a.level).toBeTruthy();
  });

  it('fan empire builds lead gen + $497 upsell', () => {
    const answers = { 0: 'Paying her tribute', 2: '$497 custom ownership film' };
    const { html, tier } = buildLeadGenPage(answers, 'test@fan.com');
    expect(html).toContain('497');
    expect(tier).toBe('OWNER');
  });

  it('metrics projection and 2257 log correct', () => {
    expect(projectMonthly(true)).toBe(1800);
    const logs = generate2257Log('2026-06');
    expect(logs.length).toBe(3);
    expect(logs[0].content).toContain('thong');
  });

  it('sidebar generators produce sell-ready full copy', () => {
    const posts = generateTodays10Posts();
    expect(posts).toContain('SISSYOS DAILY 10');
    expect(posts).toContain(BRAND.owner);
    expect(posts.length).toBeGreaterThan(200);
  });

  it('judge handles bytesSample for higher pink signal', () => {
    const pinkSample = 'pInK'.repeat(100);
    const a = analyzeSissyLevel({ name: 'test.png', size: 10000, type: 'image/png', bytesSample: pinkSample });
    expect(a.score).toBeGreaterThan(50);
  });
});