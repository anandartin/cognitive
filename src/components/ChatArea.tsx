'use client';

import { Layers } from 'lucide-react';
import ModelSelector from './ModelSelector';
import PromptInput from './PromptInput';
import Pipeline from './Pipeline';
import type { PipelineStep, ChatMessage } from '@/types';

interface ChatAreaProps {
  messages: ChatMessage[];
  pipelineSteps: PipelineStep[];
  isGenerating: boolean;
  currentPrompt: string;
  onPromptChange: (v: string) => void;
  onSubmit: () => void;
  selectedModel: string;
  onModelChange: (m: string) => void;
  hasGenerated: boolean;
}

export default function ChatArea({
  messages,
  pipelineSteps,
  isGenerating,
  currentPrompt,
  onPromptChange,
  onSubmit,
  selectedModel,
  onModelChange,
  hasGenerated,
}: ChatAreaProps) {
  const showWelcome = messages.length === 0 && !isGenerating;

  return (
    <div className="flex flex-col h-full w-full max-w-[480px] min-w-[380px] border-r border-border bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
        <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:bg-surface-hover transition-colors">
          <Layers size={16} />
        </button>
        <ModelSelector selected={selectedModel} onSelect={onModelChange} />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
        {showWelcome ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-foreground text-center mb-3">
              What do you want to create?
            </h1>
            <p className="text-sm text-muted text-center max-w-sm">
              Our cognitive engine generates adaptive UI and personalized experiences.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-fade-in-up ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
              >
                {msg.role === 'user' ? (
                  <div className="bg-primary-lighter text-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[340px]">
                    {msg.content}
                  </div>
                ) : (
                  <div className="text-sm text-foreground leading-relaxed max-w-[360px]">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* Pipeline visualization */}
            {(isGenerating || hasGenerated) && (
              <Pipeline steps={pipelineSteps} isVisible={true} />
            )}
          </div>
        )}
      </div>

      {/* Prompt input at bottom */}
      <div className="px-5 pb-5">
        <PromptInput
          value={currentPrompt}
          onChange={onPromptChange}
          onSubmit={onSubmit}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
