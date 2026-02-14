import { ArrowLeft, Heart, Share2, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { memoryService, Memory } from '../../services/memoryService';

export function MilestoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [milestone, setMilestone] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemory() {
      if (!id) return;
      try {
        const data = await memoryService.getMemoryById(id);
        setMilestone(data);
      } catch (error) {
        console.error('Failed to fetch memory:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemory();
  }, [id]);

  const handleDelete = async () => {
    if (!milestone || !window.confirm('Are you sure you want to delete this memory? This cannot be undone.')) {
      return;
    }

    try {
      await memoryService.deleteMemory(milestone.id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete memory:', error);
      alert('Failed to delete memory. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Memory not found</p>
          <Link to="/" className="text-primary mt-2 inline-block">
            Back to timeline
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-12 text-foreground">
      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-0 lg:max-w-7xl lg:mx-auto">
        {/* Left Side - Image */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:bg-muted">
          <div className="h-[60vh] lg:h-full lg:aspect-auto lg:w-full overflow-hidden">
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile curved overlay */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 h-12 bg-background rounded-t-[40px]" />

          {/* Header controls */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="max-w-md lg:max-w-none mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={2} />
              </Link>
              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-foreground" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <div className="max-w-md lg:max-w-2xl mx-auto px-6 lg:px-12 -mt-4 lg:mt-0 lg:py-16">
            {/* Header Info */}
            <div className="mb-8 lg:mb-12">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl lg:text-4xl">{milestone.title}</h1>
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-4">
                  <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-primary fill-primary" />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
                <span className="text-sm text-primary">{milestone.date}</span>
              </div>
            </div>

            {/* Story Section */}
            <section className="mb-8 lg:mb-12">
              <h2 className="mb-4">Our Story</h2>
              <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(232,162,162,0.08)]">
                <p className="leading-relaxed text-foreground/80 whitespace-pre-line">
                  {milestone.story}
                </p>
              </div>
            </section>

            {/* Gallery */}
            {milestone.gallery && milestone.gallery.length > 0 && (
              <section className="mb-8 lg:mb-12">
                <h2 className="mb-4">Our Story Timeline ({milestone.gallery.length} moments)</h2>
                <ImageGallery
                  images={milestone.gallery}
                  captions={milestone.gallery_captions}
                  title={milestone.title}
                />
              </section>
            )}

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <button className="py-4 rounded-[20px] bg-white shadow-[0_4px_16px_rgba(232,162,162,0.08)] hover:shadow-[0_8px_24px_rgba(232,162,162,0.12)] transition-all duration-300 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-primary" strokeWidth={2} />
                  <span>Favorite</span>
                </button>
                <button className="py-4 rounded-[20px] bg-primary text-white shadow-[0_4px_16px_rgba(232,162,162,0.2)] hover:shadow-[0_8px_24px_rgba(232,162,162,0.3)] transition-all duration-300">
                  Edit Memory
                </button>
              </div>
              <button
                onClick={handleDelete}
                className="w-full py-4 rounded-[20px] bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" strokeWidth={2} />
                <span>Delete Memory</span>
              </button>
            </div>
          </div>
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