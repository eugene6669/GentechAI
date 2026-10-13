import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Typing Test - Measure typing speed with practice exercises
 */

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when learning to type faster.",
  "Coding requires both speed and accuracy in typing.",
  "A good typist can increase productivity significantly.",
];

export default function TypingTest() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [text] = useState(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const start = () => {
    setStarted(true);
    setStartTime(Date.now());
    setInput('');
    setFinished(false);
  };

  const handleInput = (value: string) => {
    if (!startTime) return;
    
    setInput(value);

    if (value.length === text.length) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const words = text.split(' ').length;
      const calculatedWpm = Math.round(words / timeElapsed);
      
      let correct = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === value[i]) correct++;
      }
      const calculatedAccuracy = Math.round((correct / text.length) * 100);
      
      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
      setFinished(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Typing Test</h1>
        <p className="text-muted">Measure your typing speed and accuracy</p>
      </div>

      {!started ? (
        <div className="text-center py-12">
          <p className="text-lg text-charcoal mb-6">Ready to test your typing speed?</p>
          <button
            onClick={start}
            className="px-8 py-3 bg-orange text-white rounded-button hover:bg-[#E64800]"
          >
            Start Test
          </button>
        </div>
      ) : finished ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-teal-tint rounded-card border border-teal/20">
              <div className="text-4xl font-bold text-teal mb-2">{wpm}</div>
              <div className="text-sm text-teal">Words Per Minute</div>
            </div>
            <div className="p-6 bg-orange-tint rounded-card border border-orange/20">
              <div className="text-4xl font-bold text-orange mb-2">{accuracy}%</div>
              <div className="text-sm text-orange">Accuracy</div>
            </div>
          </div>
          <button
            onClick={restart}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800]"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-sand rounded-card">
            <p className="text-lg leading-relaxed text-charcoal font-mono">{text}</p>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Start typing here..."
            className="w-full h-32 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange font-mono"
            autoFocus
          />
          <div className="text-sm text-muted">
            Progress: {input.length} / {text.length} characters
          </div>
        </div>
      )}
    </div>
  );
}
