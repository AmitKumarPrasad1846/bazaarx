'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { useAuthStore } from '@/lib/store/authStore';

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get('next') || '/dashboard';
  const { login } = useAuthStore();

  const [mode, setMode] = React.useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = React.useState(false);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState('');

  // Form states
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('arjun.sharma@example.com');
  const [password, setPassword] = React.useState('SecurePass123!');
  const [isLoading, setIsLoading] = React.useState(false);

  // Password strength calculation for register mode
  const passwordStrength = React.useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, mode === 'register' ? name : undefined);
      setIsLoading(false);
      toast.success(
        mode === 'login' ? 'Welcome back to BazaarX!' : 'Account registered successfully!'
      );
      router.push(nextRoute);
    }, 600);
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth mockup', {
      description: 'Signing you in with Google identity...',
    });
    setTimeout(() => {
      login('google.user@example.com', 'Google User');
      toast.success('Signed in via Google');
      router.push(nextRoute);
    }, 500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Please enter your registered email');
      return;
    }
    setForgotOpen(false);
    toast.success('Password reset link dispatched', {
      description: `Instructions sent to ${forgotEmail}`,
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative min-h-[calc(100vh-8rem)]">
      {/* 4% Dot Pattern Texture */}
      <div className="absolute inset-0 bg-dot-pattern text-border-strong opacity-40 pointer-events-none -z-10" />

      {/* Centered 400px Card */}
      <div className="w-full max-w-[400px] rounded-modal border hairline-border bg-surface p-6 sm:p-8 shadow-subtle-hover relative">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Logo showTagline={false} className="mb-2" />
          <p className="text-small text-text-secondary">
            {mode === 'login'
              ? 'Log in to connect with buyers and manage your ads'
              : 'Create an account for peer trading on campus'}
          </p>
        </div>

        {/* Login / Register Sliding Tabs */}
        <div className="relative flex border-b hairline-border mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-center text-small font-semibold transition-colors ${
              mode === 'login' ? 'text-text' : 'text-text-muted hover:text-text'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-center text-small font-semibold transition-colors ${
              mode === 'register' ? 'text-text' : 'text-text-muted hover:text-text'
            }`}
          >
            Register
          </button>
          {/* Animated sliding underline */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-primary"
            initial={false}
            animate={{
              left: mode === 'login' ? '0%' : '50%',
              width: '50%',
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun Sharma"
              leftIcon={<User className="w-4 h-4" />}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu or gmail.com"
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-small font-medium text-text">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-micro text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-muted hover:text-text focus-ring rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[1.5]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[1.5]" />
                  )}
                </button>
              }
            />

            {/* Password strength hint on register */}
            {mode === 'register' && password && (
              <div className="pt-1.5 space-y-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 rounded-full transition-colors ${
                        passwordStrength >= step
                          ? passwordStrength <= 2
                            ? 'bg-danger'
                            : passwordStrength === 3
                            ? 'bg-accent'
                            : 'bg-success'
                          : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-micro text-text-muted">
                  Strength:{' '}
                  {passwordStrength <= 1
                    ? 'Weak'
                    : passwordStrength <= 3
                    ? 'Moderate'
                    : 'Strong'}
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full font-semibold mt-2"
          >
            {mode === 'login' ? 'Sign In' : 'Create Free Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center text-micro text-text-muted">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t hairline-border" />
          </div>
          <span className="relative bg-surface px-3 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Google OAuth Mock Button */}
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleGoogleLogin}
          className="w-full gap-2 text-text font-medium"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>

        {/* Security badge note */}
        <div className="mt-6 pt-4 border-t hairline-border flex items-center justify-center gap-1.5 text-micro text-text-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-primary stroke-[1.5]" />
          <span>Encrypted simulated session stored in localStorage</span>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="max-w-sm">
          <form onSubmit={handleForgotPassword}>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your account email and we&apos;ll send you a password recovery link.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Input
                label="Registered Email"
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@college.edu"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setForgotOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

