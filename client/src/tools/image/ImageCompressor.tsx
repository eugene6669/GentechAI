import { useState } from 'react';

/**
 * Image Compressor - Reduce image file size
 */

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const compress = () => {
    alert(`Compressing with quality ${quality}%. In production, this would compress the image.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Image Compressor</h1>
        <p className="text-muted">Reduce file size without losing quality</p>
      </div>

      {!image ? (
        <label className="block border-2 border-dashed border-border rounded-card p-12 text-center cursor-pointer hover:border-orange">
          <p className="text-charcoal font-medium mb-1">Click to upload image</p>
          <p className="text-sm text-muted">PNG, JPG up to 10MB</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <img src={image} alt="Preview" className="max-w-full h-auto rounded-card border border-border" />
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={compress} className="flex-1 px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800]">
              Compress Image
            </button>
            <button onClick={() => setImage(null)} className="px-6 py-3 border border-border rounded-button hover:bg-sand">
              New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
