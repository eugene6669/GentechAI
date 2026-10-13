import { useState } from 'react';
import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Prompt Enhancer (Pro) - Turn rough prompts into robust ones
 */

export default function PromptEnhancer() {
  const [input, setInput] = useState('');
  const [enhanced, setEnhanced] = useState('');
  const [loading, setLoading] = useState(false);

  const enhancePrompt = () => {
    setLoading(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhanced = `You are an expert assistant. ${input}

Please provide a comprehensive response that:
1. Addresses all aspects of the query
2. Uses clear, structured formatting
3. Includes relevant examples where applicable
4. Considers edge cases and potential issues
5. Provides actionable insights

Format your response with clear headings and bullet points for readability.`;
      
      setEnhanced(enhanced);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-heading font-bold text-charcoal">Prompt Enhancer</h1>
          <span className="px-2 py-1 bg-orange text-white text-xs font-medium rounded">PRO</span>
        </div>
        <p className="text-muted">Transform basic prompts into detailed, effective instructions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Your Prompt
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your rough prompt here..."
            className="w-full h-64 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <button
            onClick={enhancePrompt}
            disabled={!input.trim() || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Enhancing...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Enhance Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Enhanced Prompt
          </label>
          <textarea
            value={enhanced}
            readOnly
            placeholder="Enhanced prompt will appear here..."
            className="w-full h-64 px-4 py-3 border border-border rounded-card resize-none bg-canvas focus:outline-none"
          />
          {enhanced && (
            <button
              onClick={() => navigator.clipboard.writeText(enhanced)}
              className="w-full px-4 py-2 border border-border rounded-button hover:bg-sand transition-colors"
            >
              Copy to Clipboard
            </button>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-sand rounded-card">
        <h3 className="font-heading font-semibold text-charcoal mb-3">Tips for Better Prompts</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li>• Be specific about what you want</li>
          <li>• Include context and constraints</li>
          <li>• Specify the desired format or structure</li>
          <li>• Mention the intended audience</li>
          <li>• Add examples if applicable</li>
        </ul>
      </div>
    </div>
  );
}
