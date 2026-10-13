import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * AI Rewriter (Pro) - Fix grammar, change tone, shorten, translate
 */

type RewriteMode = 'grammar' | 'professional' | 'casual' | 'shorten' | 'expand';

export default function AIRewriter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<RewriteMode>('grammar');
  const [loading, setLoading] = useState(false);

  const modes = [
    { id: 'grammar', label: 'Fix Grammar', description: 'Correct spelling and grammar errors' },
    { id: 'professional', label: 'Professional', description: 'Make it more formal and polished' },
    { id: 'casual', label: 'Casual', description: 'Make it more conversational' },
    { id: 'shorten', label: 'Shorten', description: 'Make it more concise' },
    { id: 'expand', label: 'Expand', description: 'Add more detail and explanation' },
  ];

  const rewrite = () => {
    setLoading(true);
    
    setTimeout(() => {
      let result = input;
      
      switch (mode) {
        case 'grammar':
          result = input.replace(/\bi\b/g, 'I').replace(/\bdont\b/g, "don't").replace(/\bcant\b/g, "can't");
          break;
        case 'professional':
          result = `I would like to formally express that ${input.toLowerCase()}. Thank you for your consideration.`;
          break;
        case 'casual':
          result = `Hey! So basically, ${input.toLowerCase()} Hope that helps!`;
          break;
        case 'shorten':
          result = input.split('.')[0] + '.';
          break;
        case 'expand':
          result = `${input} This is particularly important because it allows for better understanding and clearer communication. Furthermore, it helps ensure that all parties involved are on the same page.`;
          break;
      }
      
      setOutput(result);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-heading font-bold text-charcoal">AI Rewriter</h1>
          <span className="px-2 py-1 bg-orange text-white text-xs font-medium rounded">PRO</span>
        </div>
        <p className="text-muted">Fix grammar, change tone, or adjust length</p>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-charcoal mb-3">
          Rewrite Mode
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as RewriteMode)}
              className={`p-3 border-2 rounded-card text-left transition-colors ${
                mode === m.id
                  ? 'border-orange bg-orange-tint'
                  : 'border-border hover:border-sand'
              }`}
            >
              <div className="font-medium text-sm text-charcoal">{m.label}</div>
              <div className="text-xs text-muted mt-1">{m.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Original Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-80 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>

        {/* Output */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Rewritten Text
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Rewritten text will appear here..."
            className="w-full h-80 px-4 py-3 border border-border rounded-card resize-none bg-canvas focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={rewrite}
          disabled={!input.trim() || loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              <span>Rewriting...</span>
            </>
          ) : (
            <span>Rewrite Text</span>
          )}
        </button>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="px-6 py-3 border border-border rounded-button hover:bg-sand transition-colors"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}
