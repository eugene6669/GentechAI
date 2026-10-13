import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Text Diff - Compare two texts and highlight differences
 */

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const compare = () => {
    setShowDiff(true);
  };

  const getDifferences = () => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    
    return {
      added: words2.filter(w => !words1.includes(w)).length,
      removed: words1.filter(w => !words2.includes(w)).length,
      common: words1.filter(w => words2.includes(w)).length,
    };
  };

  const diff = showDiff ? getDifferences() : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Text Diff</h1>
        <p className="text-muted">Compare two texts and highlight differences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Text 1 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Original Text
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="w-full h-80 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>

        {/* Text 2 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Modified Text
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="w-full h-80 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>
      </div>

      <button
        onClick={compare}
        disabled={!text1.trim() || !text2.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowPathIcon className="w-5 h-5" />
        Compare Texts
      </button>

      {diff && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-card border border-green-200">
            <div className="text-2xl font-bold text-green-700">{diff.added}</div>
            <div className="text-sm text-green-600">Words Added</div>
          </div>
          <div className="p-4 bg-red-100 rounded-card border border-red-200">
            <div className="text-2xl font-bold text-red-700">{diff.removed}</div>
            <div className="text-sm text-red-600">Words Removed</div>
          </div>
          <div className="p-4 bg-blue-100 rounded-card border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{diff.common}</div>
            <div className="text-sm text-blue-600">Words Unchanged</div>
          </div>
        </div>
      )}
    </div>
  );
}
