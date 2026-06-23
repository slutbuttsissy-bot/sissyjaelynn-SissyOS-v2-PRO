'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export default function LoginPage() {
  const handleLogin = async () => {
    toast('Signing in with Google (or demo Credentials for sissyjaelynn)...');
    await signIn('google', { callbackUrl: '/' }).catch(async () => {
      await signIn('credentials', {
        email: 'slutbuttsissy@gmail.com',
        callbackUrl: '/',
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0012]">
      <div className="sissy-card max-w-md p-8 text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-2xl mb-2">Login to SissyOS v2 PRO</h1>
        <p className="mb-6 text-sm text-[#ff69b4]">Google OAuth using your Gmail (slutbuttsissy@gmail.com)</p>
        <button onClick={handleLogin} className="femme-btn w-full py-3 bg-[#ff1493] text-[#0a0012] rounded-full">Continue with Google</button>
        <p className="mt-4 text-[10px] opacity-50">After login you will see your personalized stats and full dashboard.</p>
      </div>
    </div>
  );
}
