import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

/**
 * Image Upscaler - Enlarge photos 2x or 4x with AI
 */

export default function ImageUpscaler() {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4>(2);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const upscale = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`Image upscaled ${scale}x! In production, this would use AI upscaling.`);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Image Upscaler</h1>
        <p className="text-muted">Enlarge photos 2x or 4x with AI enhancement</p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        {!image ? (
          <label className="block border-2 border-dashed border-border rounded-card p-12 text-center cursor-pointer hover:border-orange transition-colors">
            <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-muted mb-4" />
            <p className="text-charcoal font-medium mb-1">Click to upload image</p>
            <p className="text-sm text-muted">PNG, JPG up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <img src={image} alt="Preview" className="max-w-full h-auto rounded-card border border-border" />
            
            {/* Scale Options */}
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium text-charcoal">Scale:</label>
              <button
                onClick={() => setScale(2)}
                className={`px-4 py-2 rounded-button ${scale === 2 ? 'bg-orange text-white' : 'border border-border'}`}
              >
                2x
              </button>
              <button
                onClick={() => setScale(4)}
                className={`px-4 py-2 rounded-button ${scale === 4 ? 'bg-orange text-white' : 'border border-border'}`}
              >
                4x
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={upscale}
                disabled={processing}
                className="flex-1 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] disabled:opacity-50"
              >
                {processing ? 'Processing...' : `Upscale ${scale}x`}
              </button>
              <button
                onClick={() => setImage(null)}
                className="px-6 py-3 border border-border rounded-button hover:bg-sand"
              >
                New Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
