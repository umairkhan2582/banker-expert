import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { WalletButton } from './WalletButton';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, User, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from './LoginDialog';

export function Header() {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity" data-testid="link-home">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">B</span>
                </div>
                <span className="font-semibold text-lg">Banker Expert</span>
              </a>
            </Link>

            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-1">
                <Link href="/dashboard">
                  <Button
                    variant={location === '/dashboard' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    data-testid="link-dashboard"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/report">
                  <Button
                    variant={location === '/report' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    data-testid="link-report"
                  >
                    <FileText className="h-4 w-4" />
                    Report
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant={location === '/profile' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    data-testid="link-profile"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            <WalletButton />
            
            {isAuthenticated ? (
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="gap-2"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button
                onClick={() => setShowLogin(true)}
                variant="default"
                size="sm"
                className="gap-2"
                data-testid="button-login"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
}
