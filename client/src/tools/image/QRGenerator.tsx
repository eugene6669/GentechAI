import { useState } from 'react';
import { QrCodeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

/**
 * QR Generator - Convert links or text into QR codes
 */

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);

  const qrUrl = text ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}` : '';

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement('a');
      link.href = qrUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">QR Code Generator</h1>
        <p className="text-muted">Convert links or text into scannable QR codes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Enter Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com or any text..."
              className="w-full h-32 px-4 py-3 border border-border rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Size: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>128px</span>
              <span>512px</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {text ? (
            <>
              <div className="p-4 bg-white rounded-card border border-border">
                <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
              </div>
              <button
                onClick={downloadQR}
                className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800]"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download QR Code
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted">
              <QrCodeIcon className="w-16 h-16 mb-4" />
              <p>Enter text to generate QR code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
