'use client';

import FormFactorSelector from './FormFactorSelector';
import type { FormFactor, GeneratedProduct } from '@/types';

interface PreviewPanelProps {
  activeFormFactor: FormFactor;
  onFormFactorChange: (ff: FormFactor) => void;
  generatedProduct: GeneratedProduct | null;
  isGenerating: boolean;
}

function getFrameStyles(ff: FormFactor): { width: string; height: string; className: string } {
  switch (ff) {
    case 'mobile':
      return { width: '320px', height: '640px', className: 'phone-frame' };
    case 'tablet':
      return { width: '560px', height: '420px', className: 'tablet-frame' };
    case 'desktop':
      return { width: '720px', height: '460px', className: 'desktop-frame' };
    case 'conversational':
      return { width: '400px', height: '580px', className: 'rounded-2xl border border-border' };
    case 'voice':
      return { width: '320px', height: '640px', className: 'phone-frame' };
  }
}

export default function PreviewPanel({
  activeFormFactor,
  onFormFactorChange,
  generatedProduct,
  isGenerating,
}: PreviewPanelProps) {
  const frame = getFrameStyles(activeFormFactor);

  return (
    <div className="flex-1 bg-surface flex flex-col items-center overflow-hidden">
      {/* Toolbar */}
      <div className="w-full flex items-center justify-center py-4 px-6 bg-white border-b border-border">
        <FormFactorSelector active={activeFormFactor} onChange={onFormFactorChange} />
      </div>

      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        {isGenerating && !generatedProduct ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-lighter flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-muted">Generating preview...</p>
          </div>
        ) : generatedProduct ? (
          <div className="animate-fade-in-up">
            <div
              className={`${frame.className} bg-white overflow-hidden`}
              style={{ width: frame.width, height: frame.height }}
            >
              <div
                className="w-full h-full overflow-auto"
                style={activeFormFactor === 'desktop' ? { paddingTop: '32px' } : undefined}
                dangerouslySetInnerHTML={{ __html: generatedProduct.html }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary-lighter flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="text-sm text-muted">Preview will appear here</p>
            <p className="text-xs text-muted-light mt-1">Submit a prompt to generate your product</p>
          </div>
        )}
      </div>
    </div>
  );
}
