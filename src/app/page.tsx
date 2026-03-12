'use client';

import { PanelLeftClose, PanelLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import PreviewPanel from '@/components/PreviewPanel';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const store = useAppStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Sidebar toggle (when collapsed) */}
      {!store.sidebarOpen && (
        <button
          onClick={() => store.setSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:bg-surface-hover transition-colors bg-white"
        >
          <PanelLeft size={16} />
        </button>
      )}

      {/* Sidebar */}
      <div className="relative">
        <Sidebar
          isOpen={store.sidebarOpen}
          selectedProject={store.selectedProject}
          onSelectProject={store.setSelectedProject}
          history={store.history}
        />
        {store.sidebarOpen && (
          <button
            onClick={() => store.setSidebarOpen(false)}
            className="absolute top-4 right-[-36px] z-50 w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted hover:bg-surface-hover transition-colors bg-white"
          >
            <PanelLeftClose size={14} />
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat / Prompt area */}
        <ChatArea
          messages={store.messages}
          pipelineSteps={store.pipelineSteps}
          isGenerating={store.isGenerating}
          currentPrompt={store.currentPrompt}
          onPromptChange={store.setCurrentPrompt}
          onSubmit={store.handleSubmit}
          selectedModel={store.selectedModel}
          onModelChange={store.setSelectedModel}
          hasGenerated={store.hasGenerated}
        />

        {/* Preview panel */}
        <PreviewPanel
          activeFormFactor={store.activeFormFactor}
          onFormFactorChange={store.switchFormFactor}
          generatedProduct={store.generatedProduct}
          isGenerating={store.isGenerating}
        />
      </div>
    </div>
  );
}
