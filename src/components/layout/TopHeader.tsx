'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Settings, LogOut, Menu, X, Store, Users, Ticket, User } from 'lucide-react';
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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
              {currentUser?.storeName || 'StandardStoreSetup'}
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

          <div className="relative" ref={settingsRef}>
            <button 
              className={`w-8 h-8 rounded text-ticketit-navy flex items-center justify-center transition-colors ml-1 ${isSettingsOpen ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'}`} 
              title="Settings"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="w-5 h-5" />
            </button>

            {isSettingsOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-sm shadow-md py-1 z-50 border border-gray-200">
                <div className="absolute -top-[7px] right-[10px] w-3.5 h-3.5 bg-white border-t border-l border-gray-200 transform rotate-45 z-0"></div>
                
                <Link href="/user-administration" className="relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                  <Users className="w-[18px] h-[18px] mr-3 text-gray-600" />
                  <span>User Administration</span>
                </Link>
                
                <div className="border-t border-gray-100"></div>
                
                <Link href="/ticket-management" className="relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                  <Ticket className="w-[18px] h-[18px] mr-3 text-gray-600" />
                  <span>Ticket Management</span>
                </Link>
                
                <div className="border-t border-gray-100"></div>
                
                <Link href="/account" className="relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="w-[18px] h-[18px] mr-3 text-gray-600" />
                  <span>Your Account</span>
                </Link>
              </div>
            )}
          </div>
          
          <button className="w-8 h-8 rounded bg-white text-ticketit-navy flex items-center justify-center hover:bg-gray-100 transition-colors" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
