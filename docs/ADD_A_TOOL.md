# How to Add a New Tool

Adding a tool to Gentech AI Tools takes about 30 minutes. Every tool uses the same pattern, so once you've done it once, the next one is even faster.

## Overview

Every tool needs:
1. A React component in `client/src/tools/your-tool-name/YourToolName.tsx`
2. An entry in `client/src/tools/registry.ts`

That's it. The tool will automatically appear in:
- The Tools grid (`/tools`)
- The command palette (Ctrl/Cmd+K)
- The router (navigates to your tool's route)

## Step-by-Step Guide

### Step 1: Create the Tool Component

Create a new folder under `client/src/tools/` with your tool's name in kebab-case:

```
client/src/tools/
├── word-counter/
├── json-formatter/
├── password-generator/
└── your-tool-name/          ← New folder
    └── YourToolName.tsx     ← New file
```

**Template:**

```tsx
import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui';

/**
 * YourToolName — one-line description of what it does.
 *
 * Browser-side only. Files never leave the device.
 */

export default function YourToolName() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    // Your tool's logic here
    const result = input.toUpperCase(); // Example
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Your Tool Name"
      description="Brief explanation of what this tool does"
    >
      <div className="space-y-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste here..."
            className="w-full h-32 px-4 py-3 border border-border rounded-card bg-canvas text-charcoal placeholder:text-muted resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>

        {/* Action */}
        <Button onClick={handleProcess} size="md">
          Process
        </Button>

        {/* Output */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Result
            </label>
            <div className="p-4 bg-sand rounded-card border border-border">
              {output}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
```

**Key points:**
- Use `ToolLayout` for consistency (title, description, padding)
- Import UI components from `@/components/ui` (Button, Card, etc.)
- Use design tokens: `bg-canvas`, `text-charcoal`, `border-border`, etc.
- Keep it simple: one primary action per screen
- Add `space-y-4` for vertical spacing between sections

### Step 2: Add to the Registry

Open `client/src/tools/registry.ts` and add a new entry:

```typescript
import { YourIcon } from 'lucide-react'; // Choose an appropriate icon

export const toolRegistry: ToolDefinition[] = [
  // ... existing tools

  {
    id: 'your-tool-name',                      // Must be unique, kebab-case
    name: 'Your Tool Name',                    // Display name (2-4 words)
    description: 'One-line summary',           // Shown in grid and palette
    category: 'Text',                          // Text, Dev, PDF, Image, etc.
    icon: YourIcon,                            // Lucide icon component
    route: '/tools/your-tool-name',            // Must match the id
    component: lazy(() => import('./your-tool-name/YourToolName')),
  },
];
```

**Available categories:**
- `Text` — Text manipulation, word counting, case conversion
- `Dev` — JSON, Base64, UUID, regex, code utilities
- `PDF` — PDF merge, split, compress, convert
- `Image` — Compress, resize, crop, convert, background removal
- `Audio and Video` — Transcription, conversion
- `Finance` — Tax calculator, currency converter
- `PH Guides` — Philippine-specific resources

**Choosing an icon:**
Browse [Lucide icons](https://lucide.dev/icons/) and import the one that best represents your tool. Keep it simple and recognizable.

### Step 3: Test the Tool

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the Tools grid**: http://localhost:5173/tools
   - Your tool should appear in the grid
   - Click it → should navigate to your tool

3. **Test the command palette**:
   - Press Ctrl/Cmd+K
   - Type your tool's name
   - Should appear in results
   - Press Enter → should navigate to your tool

4. **Test the direct URL**: http://localhost:5173/tools/your-tool-name
   - Should load your tool directly

5. **Test functionality**:
   - Input data → process → verify output
   - Try edge cases (empty input, invalid data, large input)
   - Check mobile responsiveness (resize browser window)

6. **Test keyboard navigation**:
   - Tab through all interactive elements
   - Enter/Space should activate buttons
   - Focus ring should be visible

## Examples

### Example 1: Simple Text Transformation

```tsx
export default function CaseConverter() {
  const [text, setText] = useState('');

  return (
    <ToolLayout title="Case Converter" description="Convert text between cases">
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          className="w-full h-32 px-4 py-3 border border-border rounded-card bg-canvas"
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setText(text.toUpperCase())}>UPPERCASE</Button>
          <Button onClick={() => setText(text.toLowerCase())} variant="secondary">
            lowercase
          </Button>
          <Button onClick={() => setText(text.split(' ').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
          ).join(' '))} variant="secondary">
            Title Case
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
```

### Example 2: Tool with Options

```tsx
export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const generated = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(generated);
  };

  return (
    <ToolLayout title="UUID Generator" description="Generate v4 UUIDs">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            How many UUIDs?
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-32 px-3 py-2 border border-border rounded-button"
          />
        </div>

        <Button onClick={generate}>Generate</Button>

        {uuids.length > 0 && (
          <div className="space-y-1">
            {uuids.map((uuid, i) => (
              <div key={i} className="p-2 bg-sand rounded font-mono text-sm">
                {uuid}
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
```

### Example 3: Tool with File Input

```tsx
export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFile(file);
    // Compression logic here (using browser-image-compression or canvas)
    // setCompressed(result);
  };

  return (
    <ToolLayout title="Image Compressor" description="Compress images in your browser">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-card p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="text-muted mb-2">Drop an image or click to browse</div>
            <Button as="span">Choose File</Button>
          </label>
        </div>

        {file && <div>Original: {(file.size / 1024).toFixed(0)} KB</div>}
        {compressed && <img src={compressed} alt="Compressed" />}
      </div>
    </ToolLayout>
  );
}
```

## Best Practices

### Performance
- **Heavy processing**: Use Web Workers to keep the main thread responsive
- **Large files**: Process in chunks, show progress
- **Lazy loading**: Already handled by the registry

### Accessibility
- **Labels**: Every input needs a visible label or `aria-label`
- **Focus**: Ensure keyboard users can reach all controls
- **Contrast**: Use design tokens, they're already WCAG AA compliant
- **Errors**: Announce errors to screen readers with `role="alert"`

### UX
- **Show, don't tell**: Instant feedback over explanatory text
- **Defaults**: Provide sensible defaults for all options
- **Empty state**: Show a helpful message when there's no output yet
- **Error handling**: Catch errors, show user-friendly messages
- **Loading state**: Show spinners for async operations

### Code Style
- **Components**: Keep components small, extract helpers if needed
- **Comments**: Explain non-obvious logic, not what the code does
- **Types**: Use TypeScript types for props and state
- **Design tokens**: Use `bg-canvas`, `text-charcoal`, etc. instead of hardcoded colors

## Common Patterns

### Debounced Input
```tsx
import { useEffect, useState } from 'react';

const [input, setInput] = useState('');
const [output, setOutput] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    // Process input after 300ms of no typing
    setOutput(processInput(input));
  }, 300);

  return () => clearTimeout(timer);
}, [input]);
```

### Copy to Clipboard
```tsx
const [copied, setCopied] = useState(false);

const copy = () => {
  navigator.clipboard.writeText(output);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<Button onClick={copy}>
  {copied ? 'Copied!' : 'Copy'}
</Button>
```

### File Download
```tsx
const download = () => {
  const blob = new Blob([output], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.txt';
  a.click();
  URL.revokeObjectURL(url);
};
```

## Troubleshooting

**Tool doesn't appear in the grid:**
- Check that you added it to `registry.ts`
- Verify the `id` is unique
- Restart the dev server

**Tool loads but shows blank:**
- Check the browser console for errors
- Verify the default export: `export default function YourTool() { ... }`
- Make sure you're returning JSX wrapped in `<ToolLayout>`

**Styles look wrong:**
- Use design tokens (`bg-canvas` not `bg-gray-50`)
- Check Tailwind classes are spelled correctly
- Verify you imported `cn` if merging classes conditionally

**TypeScript errors:**
- Check the import path for `ToolLayout`
- Verify icon import from `lucide-react`
- Ensure `registry.ts` entry has all required fields

## Next Steps

Once you've added a tool:
1. Test it thoroughly (functionality, mobile, keyboard)
2. Consider edge cases (empty input, large files, invalid data)
3. Add the tool to the appropriate category
4. Update the count in the README if this is a new tool

Happy building! 🚀
