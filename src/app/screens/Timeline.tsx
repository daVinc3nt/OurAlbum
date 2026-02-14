import { useEffect, useState } from 'react';
import { MilestoneCard } from '../components/MilestoneCard';
import { memoryService, Memory } from '../../services/memoryService';

export function Timeline() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const data = await memoryService.getMemories();
        setMemories(data);
      } catch (error) {
        console.error('Failed to fetch memories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-8 text-foreground">
      {/* Timeline Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-6 lg:pt-12">
        <div className="relative">
          {/* Timeline line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />

          {/* Memories */}
          <div className="lg:pl-12 space-y-6 lg:space-y-10">
            {memories.map((memory) => (
              <MilestoneCard
                key={memory.id}
                id={memory.id}
                title={memory.title}
                date={memory.date}
                image={memory.image}
                icon={(memory.icon as 'camera' | 'heart' | 'plane') || 'heart'} // Default icon if none
              />
            ))}

            {memories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No memories found. Start adding some!</p>
              </div>
            )}
          </div>
        </div>

        {/* End marker */}
        <div className="lg:pl-12 pt-8 pb-12">
          <div className="relative">
            <div className="hidden lg:block absolute -left-[39px] top-0">
              <div className="w-3 h-3 rounded-full bg-primary/30" />
            </div>
            <p className="text-sm text-muted-foreground italic text-center lg:text-left">
              To be continued... forever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}