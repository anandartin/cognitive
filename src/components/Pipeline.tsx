'use client';

import { ChevronRight, Check } from 'lucide-react';
import type { PipelineStep } from '@/types';

interface PipelineProps {
  steps: PipelineStep[];
  isVisible: boolean;
}

export default function Pipeline({ steps, isVisible }: PipelineProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="flex flex-col gap-0">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-start gap-3">
            {/* Vertical connector line + icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.status === 'completed'
                    ? 'bg-primary text-white'
                    : step.status === 'active'
                    ? 'bg-primary-lighter text-primary border-2 border-primary animate-pipeline-pulse'
                    : 'bg-surface border border-border text-muted-light'
                }`}
              >
                {step.status === 'completed' ? (
                  <Check size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-px h-6 transition-colors duration-300 ${
                    step.status === 'completed' ? 'bg-primary' : 'bg-border'
                  }`}
                  style={{ borderLeft: '1px dashed', borderColor: step.status === 'completed' ? '#4f46e5' : '#e5e7eb' }}
                />
              )}
            </div>
            {/* Label */}
            <div
              className={`pt-1 text-sm transition-colors duration-300 ${
                step.status === 'completed'
                  ? 'text-foreground font-medium'
                  : step.status === 'active'
                  ? 'text-primary font-medium'
                  : 'text-muted'
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
