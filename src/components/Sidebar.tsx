'use client';

import { PenLine, Search, Briefcase, HeartPulse, BarChart3, Clock } from 'lucide-react';
import type { ProjectCategory, HistoryItem } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  selectedProject: ProjectCategory | null;
  onSelectProject: (project: ProjectCategory | null) => void;
  history: HistoryItem[];
}

const projects: { label: ProjectCategory; icon: React.ReactNode }[] = [
  { label: 'Financial', icon: <Briefcase size={18} /> },
  { label: 'Healthcare', icon: <HeartPulse size={18} /> },
  { label: 'Marketing', icon: <BarChart3 size={18} /> },
];

export default function Sidebar({ isOpen, selectedProject, onSelectProject, history }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-[220px] min-w-[220px] h-full bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">Infosys</span>
          <span className="text-xs text-muted">|</span>
          <div>
            <div className="text-xs font-semibold text-foreground leading-tight">Cognitive</div>
            <div className="text-xs font-semibold text-foreground leading-tight">Engine</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col px-3 mt-2">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-colors">
          <PenLine size={18} className="text-muted" />
          New Chat
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-colors">
          <Search size={18} className="text-muted" />
          Search
        </button>
      </nav>

      {/* Projects */}
      <div className="mt-5 px-3">
        <div className="px-3 text-xs font-semibold text-muted-light uppercase tracking-wider mb-2">
          Project
        </div>
        {projects.map((p) => (
          <button
            key={p.label}
            onClick={() => onSelectProject(selectedProject === p.label ? null : p.label)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedProject === p.label
                ? 'bg-primary-lighter text-primary font-medium'
                : 'text-foreground hover:bg-surface-hover'
            }`}
          >
            <span className={selectedProject === p.label ? 'text-primary' : 'text-muted'}>{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* History */}
      <div className="mt-5 px-3 flex-1 overflow-y-auto">
        <div className="px-3 text-xs font-semibold text-muted-light uppercase tracking-wider mb-2">
          History
        </div>
        {history.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted hover:bg-surface-hover transition-colors truncate"
          >
            <Clock size={16} className="text-muted-light flex-shrink-0" />
            <span className="truncate">{item.title}</span>
          </button>
        ))}
      </div>

      {/* User */}
      <div className="px-5 py-4 border-t border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
          JM
        </div>
        <span className="text-sm font-medium text-foreground">John Mike</span>
      </div>
    </aside>
  );
}
