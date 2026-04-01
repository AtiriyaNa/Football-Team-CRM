import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Dumbbell, BarChart3, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/players", label: "Players", icon: Users },
  { href: "/fitness", label: "Fitness Tests", icon: Dumbbell },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType; onClick?: () => void }) => {
    const active = location === href || (href !== "/" && location.startsWith(href));
    return (
      <Link
        href={href}
        onClick={onClick}
        data-testid={`nav-${label.toLowerCase().replace(/\s/g, "-")}`}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          active
            ? "bg-violet-600/20 text-violet-300 nav-glow border border-violet-500/20"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
        )}
      >
        <Icon size={16} className={active ? "text-violet-400" : ""} />
        {label}
      </Link>
    );
  };

  const SidebarContent = ({ onNav }: { onNav?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <Zap size={14} className="text-white" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Bombay Gymkhana</div>
            <div className="text-sm font-semibold text-slate-100 leading-tight">Women's Football</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-3 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 py-2 text-[10px] font-semibold text-slate-600 uppercase tracking-[0.12em]">Navigation</p>
        {navItems.map((item) => <NavLink key={item.href} {...item} onClick={onNav} />)}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-3" />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-slate-600">BG CRM · v1.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-white/[0.06] bg-sidebar sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/[0.06] bg-sidebar">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-100">BG Women's Football</span>
        </div>
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-14 bottom-0 w-60 bg-sidebar border-r border-white/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onNav={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:pt-0 pt-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-7">
          {children}
        </div>
      </main>
    </div>
  );
}
