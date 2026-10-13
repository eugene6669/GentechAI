import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * JSON Formatter — format and validate JSON.
 *
 * Browser-side only. Validates using native JSON.parse.
 */

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    setError('');
    setOutput('');

    if (input.trim() === '') {
      setError('Please enter some JSON');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleMinify = () => {
    setError('');
    setOutput('');

    if (input.trim() === '') {
      setError('Please enter some JSON');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, minify, and validate JSON data"
    >
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleFormat} size="md">
            Format
          </Button>
          <Button onClick={handleMinify} variant="secondary" size="md">
            Minify
          </Button>
          <Button onClick={handleClear} variant="ghost" size="md">
            Clear
          </Button>
        </div>

        {/* Status */}
        {error && (
          <div className="flex items-start gap-2 px-3 py-2.5 bg-error/10 border border-error/30 rounded-button text-sm text-error">
            <XCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {output && !error && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-success/10 border border-success/30 rounded-button text-sm text-success">
            <CheckCircle size={18} />
            <span>Valid JSON</span>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "Gentech", "type": "tool"}'
            className="w-full h-40 px-4 py-3 border border-border rounded-card bg-canvas text-charcoal placeholder:text-muted font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>

        {/* Output */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Formatted JSON
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 px-4 py-3 border border-border rounded-card bg-sand text-charcoal font-mono text-sm resize-none focus:outline-none"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
