'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const MODELS = ['Opus 4.6', 'Sonnet 4.6', 'Haiku 4.5'];

interface ModelSelectorProps {
  selected: string;
  onSelect: (model: string) => void;
}

export default function ModelSelector({ selected, onSelect }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
      >
        {selected}
        <ChevronDown size={14} className="text-muted" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-border rounded-xl shadow-lg py-1 min-w-[160px] z-50">
          {MODELS.map((model) => (
            <button
              key={model}
              onClick={() => { onSelect(model); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                model === selected ? 'bg-primary-lighter text-primary font-medium' : 'text-foreground hover:bg-surface-hover'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
