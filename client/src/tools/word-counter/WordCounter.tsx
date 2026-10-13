import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

/**
 * Word Counter — counts words, characters, sentences, and paragraphs.
 *
 * This is a fully browser-side tool. The text never leaves the device.
 */

export default function WordCounter() {
  const [text, setText] = useState('');

  // Calculate stats
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(Boolean).length;

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text"
    >
      <div className="space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Words" value={words} />
          <StatCard label="Characters" value={chars} />
          <StatCard label="No spaces" value={charsNoSpaces} />
          <StatCard label="Sentences" value={sentences} />
          <StatCard label="Paragraphs" value={paragraphs} />
        </div>

        {/* Text area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-64 px-4 py-3 border border-border rounded-card bg-canvas text-charcoal placeholder:text-muted resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-shadow"
        />
      </div>
    </ToolLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-2.5 bg-sand rounded-button text-center">
      <div className="text-xl md:text-2xl font-heading font-bold text-charcoal">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-muted mt-0.5">{label}</div>
    </div>
  );
}
