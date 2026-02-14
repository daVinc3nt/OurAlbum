import { Heart, Plus, Home, Calendar, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getDaysCount } from '../data/mockData';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const daysCount = getDaysCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Timeline' },
    { path: '/add', icon: Plus, label: 'Add Memory' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_4px_20px_rgba(232,162,162,0.25)]">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl">Our Journey</h1>
                <p className="text-xs text-primary font-medium">
                  {daysCount} days together
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-[16px] transition-all duration-300 ${active
                        ? 'bg-primary text-white shadow-[0_4px_16px_rgba(232,162,162,0.3)]'
                        : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                      }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl">Our Journey</h1>
              <p className="text-xs text-primary font-medium mt-0.5">
                {daysCount} days together
              </p>
            </div>
            <Link
              to="/add"
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_20px_rgba(232,162,162,0.3)]"
            >
              <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-[12px] transition-all duration-300 ${active
                    ? 'text-primary'
                    : 'text-muted-foreground'
                  }`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}