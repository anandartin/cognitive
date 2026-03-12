'use client';

import { Plus, Monitor, ArrowRight } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export default function PromptInput({ value, onChange, onSubmit, isGenerating }: PromptInputProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border border-border rounded-2xl bg-white shadow-sm overflow-hidden">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Describe your request..."
          rows={3}
          className="w-full px-5 pt-4 pb-2 text-sm text-foreground placeholder:text-muted-light resize-none focus:outline-none bg-transparent"
          disabled={isGenerating}
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:bg-surface-hover transition-colors">
              <Plus size={16} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-surface-hover transition-colors">
              <span>Design System</span>
              <Monitor size={14} className="text-muted" />
            </button>
          </div>
          <button
            onClick={onSubmit}
            disabled={!value.trim() || isGenerating}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              value.trim() && !isGenerating
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-primary-lighter text-primary-light cursor-not-allowed'
            }`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
