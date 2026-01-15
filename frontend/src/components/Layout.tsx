import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Gift,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pos', label: 'POS', icon: ShoppingCart },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/loyalty', label: 'Loyalty', icon: Gift },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Store className="h-6 w-6 text-primary-foreground" />
          <span className="font-bold text-primary-foreground">PayShelf</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-primary-foreground hover:bg-sidebar-accent"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-foreground/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-primary transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Store className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-primary-foreground">PayShelf</h1>
              <p className="text-xs text-primary-foreground/70">Retail POS</p>
            </div>
          </div>

          {/* Store Info */}
          <div className="px-4 py-3 mx-4 rounded-lg bg-sidebar-accent mb-4">
            <p className="text-sm font-medium text-primary-foreground truncate">
              {user?.storeName}
            </p>
            <p className="text-xs text-primary-foreground/70">{user?.phone}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 touch-target",
                    isActive
                      ? "bg-sidebar-accent text-primary-foreground font-medium"
                      : "text-primary-foreground/80 hover:bg-sidebar-accent hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
