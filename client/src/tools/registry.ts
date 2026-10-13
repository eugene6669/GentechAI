import { LucideIcon, Type, Braces, Key, Sparkles, FileText, Wand2, Upload, Music, FileCheck, BarChart3, Smartphone, ArrowRightLeft, Droplet, Paintbrush, Monitor, Repeat, Crop, Code, Palette, Scan, QrCode, Eraser, Globe, Calendar as CalendarIcon, Youtube, Keyboard, FileImage } from 'lucide-react';
import { lazy } from 'react';

/**
 * Tool Registry — Complete catalog of all tools
 */

export type ToolCategory =
  | 'AI Tools'
  | 'Image Tools'
  | 'File Tools'
  | 'Dev Tools'
  | 'Text Tools';

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  route: string;
  isPro?: boolean;
  component: React.LazyExoticComponent<React.ComponentType>;
}

// Simple placeholder for tools not yet implemented
const ToolPlaceholder = lazy(() => import('./ToolPlaceholder'));

export const toolRegistry: ToolDefinition[] = [
  // AI Tools
  {
    id: 'prompt-enhancer',
    name: 'Prompt Enhancer',
    description: 'Turn a rough prompt into a robust one',
    category: 'AI Tools',
    icon: Sparkles,
    route: '/tools/prompt-enhancer',
    isPro: true,
    component: lazy(() => import('./ai/PromptEnhancer')),
  },
  {
    id: 'ai-rewriter',
    name: 'AI Rewriter',
    description: 'Fix grammar, change tone, shorten, translate',
    category: 'AI Tools',
    icon: Wand2,
    route: '/tools/ai-rewriter',
    isPro: true,
    component: lazy(() => import('./ai/AIRewriter')),
  },
  {
    id: 'proposal-writer',
    name: 'Proposal Writer',
    description: 'Generate a proposal from a job post',
    category: 'AI Tools',
    icon: FileText,
    route: '/tools/proposal-writer',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'cover-letter-composer',
    name: 'Cover Letter Composer',
    description: 'Generate a cover letter from a job post',
    category: 'AI Tools',
    icon: FileText,
    route: '/tools/cover-letter-composer',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'screenshot-to-table',
    name: 'Screenshot to Table',
    description: 'Convert receipts or forms into a spreadsheet',
    category: 'AI Tools',
    icon: FileImage,
    route: '/tools/screenshot-to-table',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'document-summarizer',
    name: 'Document Summarizer',
    description: 'Extract summaries and key points from PDFs',
    category: 'AI Tools',
    icon: FileText,
    route: '/tools/document-summarizer',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'audio-transcriber',
    name: 'Audio Transcriber',
    description: 'Convert voice notes or meetings into text',
    category: 'AI Tools',
    icon: Music,
    route: '/tools/audio-transcriber',
    component: ToolPlaceholder,
  },
  {
    id: 'subtitle-generator',
    name: 'Subtitle Generator',
    description: 'Generate captions for videos',
    category: 'AI Tools',
    icon: FileText,
    route: '/tools/subtitle-generator',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'resume-checker',
    name: 'Resume Checker',
    description: 'Score resumes against job descriptions',
    category: 'AI Tools',
    icon: FileCheck,
    route: '/tools/resume-checker',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'ats-resume-optimizer',
    name: 'ATS Resume Optimizer',
    description: 'Make resumes ATS-compliant',
    category: 'AI Tools',
    icon: BarChart3,
    route: '/tools/ats-resume-optimizer',
    isPro: true,
    component: ToolPlaceholder,
  },
  {
    id: 'youtube2text',
    name: 'Youtube2Text',
    description: 'Convert YouTube videos into text transcripts',
    category: 'AI Tools',
    icon: Youtube,
    route: '/tools/youtube2text',
    component: ToolPlaceholder,
  },

  // Image Tools
  {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    description: 'Enlarge photos 2x or 4x with AI',
    category: 'Image Tools',
    icon: Upload,
    route: '/tools/image-upscaler',
    component: lazy(() => import('./image/ImageUpscaler')),
  },
  {
    id: 'mockup-studio',
    name: 'Mockup Studio',
    description: 'Convert photos into product mockups',
    category: 'Image Tools',
    icon: Monitor,
    route: '/tools/mockup-studio',
    component: ToolPlaceholder,
  },
  {
    id: 'phone-mockup',
    name: 'Phone Mockup',
    description: 'Convert screenshots into phone mockups',
    category: 'Image Tools',
    icon: Smartphone,
    route: '/tools/phone-mockup',
    component: ToolPlaceholder,
  },
  {
    id: 'carousel-maker',
    name: 'Carousel Maker',
    description: 'Convert text into carousel slides',
    category: 'Image Tools',
    icon: ArrowRightLeft,
    route: '/tools/carousel-maker',
    component: ToolPlaceholder,
  },
  {
    id: 'sticker-maker',
    name: 'Sticker Maker',
    description: 'Convert photos to die-cut stickers',
    category: 'Image Tools',
    icon: Droplet,
    route: '/tools/sticker-maker',
    component: ToolPlaceholder,
  },
  {
    id: 'pixel-editor',
    name: 'Pixel Editor',
    description: 'Create and animate sprites frame by frame',
    category: 'Image Tools',
    icon: Paintbrush,
    route: '/tools/pixel-editor',
    component: ToolPlaceholder,
  },
  {
    id: 'site-showcase',
    name: 'Site Showcase',
    description: 'Convert screenshots into portfolio shots',
    category: 'Image Tools',
    icon: Monitor,
    route: '/tools/site-showcase',
    component: ToolPlaceholder,
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size without quality loss',
    category: 'Image Tools',
    icon: Crop,
    route: '/tools/image-compressor',
    component: lazy(() => import('./image/ImageCompressor')),
  },
  {
    id: 'screenshot-to-text',
    name: 'Screenshot to Text',
    description: 'Extract text from images',
    category: 'Image Tools',
    icon: Scan,
    route: '/tools/screenshot-to-text',
    component: ToolPlaceholder,
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    description: 'Convert links or text into QR codes',
    category: 'Image Tools',
    icon: QrCode,
    route: '/tools/qr-generator',
    component: lazy(() => import('./image/QRGenerator')),
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Convert logos into website icons',
    category: 'Image Tools',
    icon: Globe,
    route: '/tools/favicon-generator',
    component: ToolPlaceholder,
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds from images with AI',
    category: 'Image Tools',
    icon: Eraser,
    route: '/tools/background-remover',
    component: ToolPlaceholder,
  },
  {
    id: 'color-toolkit',
    name: 'Color Toolkit',
    description: 'Generate palettes, pick colors, check contrast',
    category: 'Image Tools',
    icon: Palette,
    route: '/tools/color-toolkit',
    component: ToolPlaceholder,
  },

  // File Tools
  {
    id: 'file-converter',
    name: 'File Converter',
    description: 'Convert files between formats',
    category: 'File Tools',
    icon: Repeat,
    route: '/tools/file-converter',
    component: ToolPlaceholder,
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Merge, split, reorder, and rotate PDFs',
    category: 'File Tools',
    icon: FileText,
    route: '/tools/pdf-tools',
    component: ToolPlaceholder,
  },

  // Dev Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and check limits',
    category: 'Dev Tools',
    icon: Type,
    route: '/tools/word-counter',
    component: lazy(() => import('./word-counter/WordCounter')),
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON',
    category: 'Dev Tools',
    icon: Braces,
    route: '/tools/json-formatter',
    component: lazy(() => import('./json-formatter/JsonFormatter')),
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords',
    category: 'Dev Tools',
    icon: Key,
    route: '/tools/password-generator',
    component: lazy(() => import('./password-generator/PasswordGenerator')),
  },
  {
    id: 'json-csv-converter',
    name: 'JSON & CSV Converter',
    description: 'Convert between JSON and CSV',
    category: 'Dev Tools',
    icon: ArrowRightLeft,
    route: '/tools/json-csv-converter',
    component: lazy(() => import('./dev/JSONCSVConverter')),
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    description: 'Compare texts and highlight differences',
    category: 'Dev Tools',
    icon: Code,
    route: '/tools/text-diff',
    component: lazy(() => import('./dev/TextDiff')),
  },
  {
    id: 'csv-cleaner',
    name: 'CSV Cleaner',
    description: 'Remove duplicates and fix malformed entries',
    category: 'Dev Tools',
    icon: FileText,
    route: '/tools/csv-cleaner',
    component: ToolPlaceholder,
  },
  {
    id: 'encode-decode',
    name: 'Encode & Decode',
    description: 'Encode and decode text for web use',
    category: 'Dev Tools',
    icon: Code,
    route: '/tools/encode-decode',
    component: ToolPlaceholder,
  },
  {
    id: 'timestamp-timezone',
    name: 'Timestamp & Timezone',
    description: 'Convert timestamps across timezones',
    category: 'Dev Tools',
    icon: CalendarIcon,
    route: '/tools/timestamp-timezone',
    component: ToolPlaceholder,
  },
  {
    id: 'website-templates',
    name: 'Website Templates',
    description: '100+ customizable website templates',
    category: 'Dev Tools',
    icon: Globe,
    route: '/tools/website-templates',
    component: ToolPlaceholder,
  },
  {
    id: 'n8n-workflows',
    name: 'n8n Workflows',
    description: 'Ready-to-import automation workflows',
    category: 'Dev Tools',
    icon: Code,
    route: '/tools/n8n-workflows',
    component: ToolPlaceholder,
  },

  // Text Tools
  {
    id: 'typing-test',
    name: 'Typing Test',
    description: 'Measure typing speed with practice',
    category: 'Text Tools',
    icon: Keyboard,
    route: '/tools/typing-test',
    component: lazy(() => import('./text/TypingTest')),
  },
];

// Helper to get unique categories for filter chips
export const categories: ToolCategory[] = Array.from(
  new Set(toolRegistry.map((t) => t.category)),
);
