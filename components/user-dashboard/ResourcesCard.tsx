import { BookOpen } from 'lucide-react';

interface ResourcesCardProps {
  setActiveTab: (tab: string) => void;
}

export function ResourcesCard({ setActiveTab }: ResourcesCardProps) {
  return (
    <button
      onClick={() => setActiveTab('resources')}
      className="relative overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow h-80 group cursor-pointer w-full text-left"
    >
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1758274535784-87125dc915cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB3YWxraW5nJTIwb3V0ZG9vciUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MjQ2MDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
        alt="Recursos"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-white">Recursos</h3>
        </div>
      </div>
    </button>
  );
}