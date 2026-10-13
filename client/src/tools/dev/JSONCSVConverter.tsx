import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * JSON & CSV Converter - Convert between JSON and CSV formats
 */

export default function JSONCSVConverter() {
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      if (mode === 'json-to-csv') {
        const data = JSON.parse(input);
        const array = Array.isArray(data) ? data : [data];
        
        if (array.length === 0) {
          setOutput('Empty array');
          return;
        }

        const headers = Object.keys(array[0]);
        const csv = [
          headers.join(','),
          ...array.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
        ].join('\n');
        
        setOutput(csv);
      } else {
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',');
        const json = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim() || '';
            return obj;
          }, {} as Record<string, string>);
        });
        
        setOutput(JSON.stringify(json, null, 2));
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Invalid format'}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">JSON & CSV Converter</h1>
        <p className="text-muted">Convert between JSON and CSV formats</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('json-to-csv')}
          className={`flex-1 px-4 py-2 rounded-button ${
            mode === 'json-to-csv' ? 'bg-orange text-white' : 'border border-border'
          }`}
        >
          JSON to CSV
        </button>
        <button
          onClick={() => setMode('csv-to-json')}
          className={`flex-1 px-4 py-2 rounded-button ${
            mode === 'csv-to-json' ? 'bg-orange text-white' : 'border border-border'
          }`}
        >
          CSV to JSON
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            {mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'json-to-csv' ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30'}
            className="w-full h-96 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            {mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full h-96 px-4 py-3 border border-border rounded-card resize-none bg-canvas font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] disabled:opacity-50"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Convert
        </button>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="px-6 py-3 border border-border rounded-button hover:bg-sand"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}
