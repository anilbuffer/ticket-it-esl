'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Settings, LogOut, Menu, X, Store } from 'lucide-react';
import { AuthService, CurrentUserProfile } from '@/services/authService';

interface TopHeaderProps {
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileNav,
  isMobileNavOpen = false,
}) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  return (
    <header className="bg-ticketit-pink text-white w-full shadow-sm z-40 relative">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 h-20 flex items-center justify-between relative">
        {/* Left: Home Button */}
        <div className="flex items-center gap-2 z-10">
          <Link
            href="/"
            className="p-1.5 rounded hover:bg-white/15 transition-colors flex items-center justify-center text-white"
            title="TicketIT Home"
            aria-label="TicketIT Home"
          >
            <Home className="w-8 h-8" />
          </Link>

          {/* Mobile navigation toggle */}
          {onToggleMobileNav && (
            <button
              type="button"
              onClick={onToggleMobileNav}
              className="md:hidden p-1.5 rounded hover:bg-white/15 transition-colors text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Center: Brand Logo precisely centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center select-none pointer-events-auto">
          <Link href="/" className="flex flex-col items-center group py-0.5">
            <img
              src="/images/ticketit-logo.png"
              alt="TicketIT - The ticketing solution that ticks all the boxes"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right: Store info & controls */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          <div className="text-right hidden sm:block">
            <div className="text-[13px] font-bold text-white leading-tight tracking-wide">
              RailwayHotelInvicium
            </div>
            <div className="text-[11px] text-white/90 font-medium leading-none mt-1">
              HeadOffice
            </div>
          </div>

          <div className="w-16 h-8 bg-white rounded flex items-center justify-between px-1.5 ml-1 cursor-pointer shadow-sm">
            <div className="w-5 h-5 bg-gray-100 flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 text-gray-400 flex items-center justify-center text-[10px]">🖼️</div>
            </div>
            <span className="text-gray-400 text-xs">▼</span>
          </div>

          <button className="w-8 h-8 rounded bg-white text-ticketit-navy flex items-center justify-center hover:bg-gray-100 transition-colors ml-1" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="w-8 h-8 rounded bg-white text-ticketit-navy flex items-center justify-center hover:bg-gray-100 transition-colors" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
