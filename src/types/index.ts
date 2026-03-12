export type FormFactor = 'mobile' | 'desktop' | 'tablet' | 'conversational' | 'voice';

export type ProjectCategory = 'Financial' | 'Healthcare' | 'Marketing';

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

export interface PipelineStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GeneratedProduct {
  formFactor: FormFactor;
  html: string;
  title: string;
}

export interface AppState {
  sidebarOpen: boolean;
  selectedProject: ProjectCategory | null;
  currentPrompt: string;
  isGenerating: boolean;
  pipelineSteps: PipelineStep[];
  activeFormFactor: FormFactor;
  messages: ChatMessage[];
  history: HistoryItem[];
  generatedProduct: GeneratedProduct | null;
  selectedModel: string;
}
