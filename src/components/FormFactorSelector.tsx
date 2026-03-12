'use client';

import { Smartphone, Monitor, Tablet, MessageCircle, Mic } from 'lucide-react';
import type { FormFactor } from '@/types';

interface FormFactorSelectorProps {
  active: FormFactor;
  onChange: (ff: FormFactor) => void;
}

const formFactors: { id: FormFactor; label: string; icon: React.ReactNode }[] = [
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} /> },
  { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} /> },
  { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} /> },
  { id: 'conversational', label: 'Chat', icon: <MessageCircle size={16} /> },
  { id: 'voice', label: 'Voice', icon: <Mic size={16} /> },
];

export default function FormFactorSelector({ active, onChange }: FormFactorSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-surface rounded-xl p-1">
      {formFactors.map((ff) => (
        <button
          key={ff.id}
          onClick={() => onChange(ff.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            active === ff.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {ff.icon}
          {ff.label}
        </button>
      ))}
    </div>
  );
}
