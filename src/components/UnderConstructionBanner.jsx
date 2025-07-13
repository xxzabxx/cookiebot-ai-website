import React, { useState } from 'react';
import { X, Wrench, Zap, Clock } from 'lucide-react';

const UnderConstructionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 animate-pulse" />
              <span className="font-semibold text-sm sm:text-base">
                🚧 Under Active Development
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>New features being added daily</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Full launch coming soon</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="hidden md:inline text-sm font-medium">
              Join our beta and earn revenue while we build! 🎯
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-white/60 animate-pulse" style={{width: '75%'}}></div>
      </div>
    </div>
  );
};

export default UnderConstructionBanner;

