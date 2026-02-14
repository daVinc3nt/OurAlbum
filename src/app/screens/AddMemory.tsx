import { useState } from 'react';
import { ArrowLeft, Upload, Loader2, X, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import heic2any from 'heic2any';
import { templates } from '../data/mockData';
import { memoryService } from '../../services/memoryService';

export function AddMemory() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('t1');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [story, setStory] = useState('');

  // Main Image State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Gallery State
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryCaptions, setGalleryCaptions] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File): Promise<File> => {
    // Check for HEIC/HEIF files
    if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });

        const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        return new File([blobToUse], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
          type: 'image/jpeg'
        });
      } catch (e) {
        console.error("Error converting HEIC:", e);
        throw new Error("Failed to process image. Please try another format.");
      }
    }
    return file;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsConverting(true);
      setError(null);
      try {
        const processedFile = await processFile(e.target.files[0]);
        setFile(processedFile);
        setPreviewUrl(URL.createObjectURL(processedFile));
      } catch (err) {
        console.error(err);
        setError("Failed to process image. Try a standard JPG or PNG.");
      } finally {
        setIsConverting(false);
      }
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsConverting(true);
      setError(null);
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      try {
        for (let i = 0; i < e.target.files.length; i++) {
          const processedFile = await processFile(e.target.files[i]);
          newFiles.push(processedFile);
          newPreviews.push(URL.createObjectURL(processedFile));
        }

        setGalleryFiles(prev => [...prev, ...newFiles]);
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
        setGalleryCaptions(prev => [...prev, ...newFiles.map(() => '')]);
      } catch (err) {
        console.error(err);
        setError("Failed to process some gallery images.");
      } finally {
        setIsConverting(false);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setGalleryCaptions(prev => prev.filter((_, i) => i !== index));
  };

  const handleCaptionChange = (index: number, value: string) => {
    setGalleryCaptions(prev => {
      const newCaptions = [...prev];
      newCaptions[index] = value;
      return newCaptions;
    });
  };

  const handleSave = async () => {
    if (!title || !date || !story || !file) {
      setError("Please fill in all fields and select a main image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload Main Image
      const imageUrl = await memoryService.uploadImage(file);

      // 2. Upload Gallery Images
      const galleryUrls = await Promise.all(
        galleryFiles.map(file => memoryService.uploadImage(file))
      );

      // 3. Create Memory Record
      await memoryService.createMemory({
        title,
        date,
        story,
        image: imageUrl,
        template_id: selectedTemplate,
        gallery: galleryUrls,
        gallery_captions: galleryCaptions
      });

      // 4. Navigate back to home
      navigate('/');
    } catch (err) {
      console.error("Error saving memory:", err);
      // Check for specific Supabase RLS error
      if (err instanceof Error && err.message.includes('row-level security')) {
        setError("Permission denied. Please check your database security policies.");
      } else {
        setError("Failed to save memory. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8 text-foreground">
      {/* Desktop Header */}
      <div className="hidden lg:block sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
            </Link>
            <div>
              <h2 className="text-3xl">Add Memory</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Capture a special moment together
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6 lg:py-12">
        {/* Desktop: Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Upload Section */}
            <section>
              <h2 className="mb-4">Upload Photo</h2>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isConverting}
                />
                <div
                  className={`w-full aspect-[4/3] rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-300 overflow-hidden ${previewUrl
                    ? 'border-primary/50 bg-muted p-0'
                    : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10'
                    }`}
                >
                  {isConverting && !previewUrl ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                      <p className="text-sm text-muted-foreground">Processing...</p>
                    </div>
                  ) : previewUrl ? (
                    <div className="relative w-full h-full group">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      {isConverting && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgba(232,162,162,0.15)] flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="text-foreground font-medium">Choose a photo</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Supports JPEG, PNG, HEIC
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="mb-4">Gallery (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative aspect-video rounded-[16px] overflow-hidden group">
                      <img src={preview} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={galleryCaptions[index] || ''}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      placeholder="Add a caption..."
                      className="w-full px-3 py-2 rounded-[12px] bg-muted border-none text-sm focus:ring-1 focus:ring-primary/30 transition-shadow outline-none"
                    />
                  </div>
                ))}

                <div className="relative aspect-video rounded-[16px] border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.heic,.heif"
                    multiple
                    onChange={handleGalleryChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isConverting}
                  />
                  {isConverting ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Plus className="w-6 h-6 text-primary" strokeWidth={2} />
                  )}
                </div>
              </div>
            </section>

            {/* Details Form */}
            <section>
              <h2 className="mb-4">Memory Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Summer Picnic"
                    className="w-full px-4 py-3 rounded-[16px] bg-muted border-none focus:ring-2 focus:ring-primary/30 transition-shadow outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-[16px] bg-muted border-none focus:ring-2 focus:ring-primary/30 transition-shadow outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">Our Story</label>
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Share the story behind this moment..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-[16px] bg-muted border-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none outline-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Template Selection & Preview */}
          <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            {/* Template Picker */}
            <section>
              <h2 className="mb-4">Choose Template</h2>
              <div className="flex lg:grid lg:grid-cols-3 gap-3 overflow-x-auto lg:overflow-visible pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`flex-shrink-0 w-40 lg:w-auto rounded-[20px] p-4 transition-all duration-300 ${selectedTemplate === template.id
                      ? 'bg-primary shadow-[0_8px_24px_rgba(232,162,162,0.2)] ring-2 ring-primary/30'
                      : 'bg-white shadow-[0_4px_16px_rgba(232,162,162,0.08)] hover:shadow-[0_8px_20px_rgba(232,162,162,0.12)]'
                      }`}
                  >
                    <div className="aspect-[3/4] rounded-[12px] bg-muted mb-3 overflow-hidden">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3
                      className={`text-sm mb-1 ${selectedTemplate === template.id ? 'text-white' : 'text-foreground'
                        }`}
                    >
                      {template.name}
                    </h3>
                    <p
                      className={`text-xs ${selectedTemplate === template.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}
                    >
                      {template.preview}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Template Preview */}
            <section>
              <h2 className="mb-4">Preview</h2>
              <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_24px_rgba(232,162,162,0.1)]">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">{title || 'Your Memory Title'}</h3>
                  <p className="text-sm text-muted-foreground">{date || 'Date'}</p>
                </div>
                {selectedTemplate === 't1' && (
                  <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-[12px] overflow-hidden">
                      {previewUrl && <img src={previewUrl} className="w-full h-full object-cover" />}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {story || "Your story will appear here..."}
                    </div>
                  </div>
                )}
                {selectedTemplate === 't2' && (
                  <div className="flex gap-4">
                    <div className="w-[70%] aspect-[3/4] bg-muted rounded-[12px] overflow-hidden">
                      {previewUrl && <img src={previewUrl} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-xs text-muted-foreground">{story || "Your story..."}</p>
                    </div>
                  </div>
                )}
                {selectedTemplate === 't3' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-muted rounded-[12px] overflow-hidden">
                      {previewUrl && <img src={previewUrl} className="w-full h-full object-cover" />}
                    </div>
                    <div className="aspect-square bg-muted rounded-[12px]" />
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {story || "Your story..."}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            disabled={isSubmitting || isConverting}
            className="w-full py-4 rounded-[20px] bg-primary text-white shadow-[0_8px_24px_rgba(232,162,162,0.3)] hover:shadow-[0_12px_32px_rgba(232,162,162,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : isConverting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Images...
              </>
            ) : (
              'Save Memory'
            )}
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}