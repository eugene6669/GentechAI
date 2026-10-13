import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui';
import { Copy, RefreshCw } from 'lucide-react';

/**
 * Password Generator — generates secure random passwords.
 *
 * Uses Web Crypto API for cryptographically secure randomness.
 * Everything runs in the browser; no password ever leaves the device.
 */

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === '') {
      setPassword('');
      return;
    }

    // Use Web Crypto API for secure randomness
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    const pw = Array.from(array)
      .map((x) => charset[x % charset.length])
      .join('');

    setPassword(pw);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords with custom options"
    >
      <div className="space-y-6">
        {/* Password display */}
        {password && (
          <div className="p-4 bg-sand rounded-card border border-border">
            <div className="flex items-center gap-3">
              <code className="flex-1 text-lg font-mono text-charcoal break-all">
                {password}
              </code>
              <Button
                onClick={copyToClipboard}
                variant="secondary"
                size="sm"
                icon={<Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-4">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-sand rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          {/* Character types */}
          <div className="space-y-2.5">
            <CheckboxOption
              label="Uppercase letters (A-Z)"
              checked={includeUppercase}
              onChange={setIncludeUppercase}
            />
            <CheckboxOption
              label="Lowercase letters (a-z)"
              checked={includeLowercase}
              onChange={setIncludeLowercase}
            />
            <CheckboxOption
              label="Numbers (0-9)"
              checked={includeNumbers}
              onChange={setIncludeNumbers}
            />
            <CheckboxOption
              label="Symbols (!@#$%...)"
              checked={includeSymbols}
              onChange={setIncludeSymbols}
            />
          </div>
        </div>

        {/* Generate button */}
        <Button
          onClick={generate}
          size="lg"
          icon={<RefreshCw size={18} />}
          className="w-full md:w-auto"
        >
          Generate Password
        </Button>
      </div>
    </ToolLayout>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-2 border-border bg-surface checked:bg-orange checked:border-orange focus:ring-2 focus:ring-orange focus:ring-offset-2 transition-colors cursor-pointer"
      />
      <span className="text-sm text-charcoal group-hover:text-orange-accessible transition-colors">
        {label}
      </span>
    </label>
  );
}
