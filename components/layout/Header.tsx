'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { useAuthStore } from '@/lib/store/authStore';
import {
  Search,
  Plus,
  Menu,
  ShoppingBag,
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // rAF-throttled passive scroll listener (>20px scroll triggers backdrop-blur)
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/listings', label: 'Explore' },
    { href: '/chat', label: 'Chat' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200 border-b',
          isScrolled
            ? 'bg-surface/85 backdrop-blur-md border-border shadow-subtle'
            : 'bg-bg/95 border-border/60'
        )}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger + Logo + Nav */}
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="md:hidden p-2 -ml-2 rounded-btn text-text-secondary hover:text-text hover:bg-surface focus-ring"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5 stroke-[1.5]" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 flex flex-col justify-between" showHandle={false}>
                <div>
                  <SheetHeader className="mb-6">
                    <SheetTitle>
                      <Logo showTagline />
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-btn text-base font-medium transition-colors',
                        pathname === '/'
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                      )}
                    >
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/listings"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-btn text-base font-medium transition-colors',
                        pathname.startsWith('/listings')
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                      )}
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      <span>Browse Listings</span>
                    </Link>
                    <Link
                      href="/chat"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-btn text-base font-medium transition-colors',
                        pathname.startsWith('/chat')
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                      )}
                    >
                      <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                      <span>Direct Messages</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-btn text-base font-medium transition-colors',
                        pathname.startsWith('/dashboard')
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                      )}
                    >
                      <LayoutDashboard className="w-4 h-4 stroke-[1.5]" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link
                      href="/safety"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-btn text-base font-medium transition-colors',
                        pathname === '/safety'
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                      )}
                    >
                      <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                      <span>Safety Tips</span>
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 border-t hairline-border">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 mb-3"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push('/post');
                    }}
                  >
                    <Plus className="w-4 h-4 stroke-[2]" />
                    <span>Post Ad</span>
                  </Button>
                  <div className="flex items-center justify-between">
                    <span className="text-small text-text-muted">Appearance</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Logo showTagline />

            {/* Desktop Navigation Links with 2px primary active underline */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-3 py-1.5 text-base font-medium transition-colors duration-150',
                      isActive ? 'text-text' : 'text-text-secondary hover:text-text'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-[-17px] left-3 right-3 h-[2px] bg-primary rounded-full transition-all" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center/Right: Expanding search + Post Ad + Theme + User */}
          <div className="flex items-center gap-3">
            {/* Search input with ⌘K chip */}
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-btn border hairline-border bg-surface text-text-muted hover:text-text hover:border-border-strong text-small transition-all duration-150 w-32 sm:w-48 lg:w-64 focus-ring"
              aria-label="Search listings or press Command K"
            >
              <Search className="w-3.5 h-3.5 shrink-0 stroke-[1.5]" />
              <span className="truncate text-left flex-1">Search ads...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium font-mono text-text-muted bg-surface-elevated border hairline-border rounded-[4px]">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </button>

            {/* Post Ad Button */}
            <Link href="/post" className="hidden sm:inline-block">
              <Button variant="primary" size="sm" className="gap-1.5 font-semibold">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Post Ad</span>
              </Button>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle className="hidden sm:flex" />

            {/* User Avatar Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center rounded-full focus-ring"
                    aria-label="User menu"
                  >
                    <Avatar name={user.name} size="sm" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium text-text">{user.name}</p>
                    <p className="text-micro text-text-muted truncate lowercase">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4 stroke-[1.5]" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/chat')}>
                    <MessageSquare className="mr-2 h-4 w-4 stroke-[1.5]" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/post')}>
                    <Plus className="mr-2 h-4 w-4 stroke-[1.5]" />
                    <span>Post New Ad</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-danger focus:text-danger">
                    <LogOut className="mr-2 h-4 w-4 stroke-[1.5]" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <LogIn className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Log in</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </>
  );
}

