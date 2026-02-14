import { Camera, Heart, Plane, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MilestoneCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  icon?: 'camera' | 'heart' | 'plane';
}

const iconMap = {
  camera: Camera,
  heart: Heart,
  plane: Plane,
};

export function MilestoneCard({ id, title, date, image, icon = 'heart' }: MilestoneCardProps) {
  const Icon = iconMap[icon];

  return (
    <Link to={`/milestone/${id}`} className="block">
      <div className="relative group">
        {/* Timeline dot and icon - Desktop only */}
        <div className="hidden lg:flex absolute -left-[45px] top-8 z-10">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_4px_20px_rgba(232,162,162,0.15)] group-hover:shadow-[0_6px_24px_rgba(232,162,162,0.25)] transition-shadow duration-300">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(232,162,162,0.1)] hover:shadow-[0_12px_32px_rgba(232,162,162,0.15)] transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-5 lg:p-6">
            <div className="flex items-start gap-3">
              {/* Mobile icon */}
              <div className="lg:hidden w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h3 className="mb-2">{title}</h3>

                {/* Date pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
                  <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                  <span className="text-sm text-primary/80">{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}