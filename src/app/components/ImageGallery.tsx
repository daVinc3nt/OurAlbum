import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageGalleryProps {
  images: string[];
  captions?: string[];
  title: string;
}

export function ImageGallery({ images, captions = [], title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* Timeline Layout */}
      <div className="relative py-8">
        {/* Vertical Line */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-primary/20 lg:-ml-px" />

        <div className="space-y-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative flex flex-col lg:flex-row items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Timeline Node/Badge */}
              <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center z-10 shadow-sm">
                <span className="text-xs font-medium text-primary">{index + 1}</span>
              </div>

              {/* Desktop Caption (Opposite side of image) */}
              <div className={`hidden lg:flex lg:w-1/2 items-center ${index % 2 === 0 ? 'pl-12 justify-start text-left' : 'pr-12 justify-end text-right'
                }`}>
                {captions[index] && (
                  <p className="text-muted-foreground text-lg italic leading-relaxed max-w-[200px] lg:max-w-[260px] break-words whitespace-pre-wrap">
                    "{captions[index]}"
                  </p>
                )}
              </div>

              {/* Image Container */}
              <div className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                }`}>
                <button
                  onClick={() => openLightbox(index)}
                  className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(232,162,162,0.15)] hover:shadow-[0_12px_40px_rgba(232,162,162,0.2)] transition-all duration-300 group bg-white p-2"
                >
                  <div className="w-full h-full rounded-[16px] overflow-hidden relative">
                    <img
                      src={image}
                      alt={captions[index] || `${title} - Moment ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </button>
                {/* Mobile Caption */}
                {captions[index] && (
                  <p className="lg:hidden mt-3 text-sm text-muted-foreground italic pl-2 break-words whitespace-pre-wrap">
                    {captions[index]}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-white text-sm font-medium">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="max-w-7xl max-h-[90vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]}
              alt={`${title} - Photo ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm max-w-full overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-[12px] overflow-hidden transition-all duration-300 ${index === selectedIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
