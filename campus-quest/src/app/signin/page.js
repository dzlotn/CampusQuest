'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 py-12">
      <Card className="w-full max-w-[380px] p-8">
        <div className="text-center mb-8">
          <h1 className="text-page-title text-white">Sign in</h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Use your account to save colleges and compare.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-input border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••" />
          <Button type="submit" variant="primary" className="w-full h-10" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="text-center text-muted text-xs mt-6">
          Set <code className="bg-surface px-1.5 py-0.5 rounded text-muted-foreground">AUTH_EMAIL</code> and <code className="bg-surface px-1.5 py-0.5 rounded text-muted-foreground">AUTH_PASSWORD</code> in your env to enable sign-in.
        </p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-primary hover:underline">← Back to home</Link>
        </div>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
