'use client';

import React, { useState, ReactNode } from 'react';
import { TopHeader } from './TopHeader';
import { PrimaryNav } from './PrimaryNav';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ticketit-bg flex flex-col font-sans text-ticketit-navy">
      {/* Top Branded Pink Header */}
      <TopHeader
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      {/* Primary Navigation Bar */}
      <PrimaryNav
        isMobileNavOpen={isMobileNavOpen}
        onCloseMobileNav={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {children}
      </main>

      {/* Clean Enterprise Footer */}
      <footer className="bg-[#DCE1E9] border-t border-ticketit-border py-3 text-xs text-ticketit-text-muted mt-auto">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 flex justify-center items-center">
          <span>© 2023 Scarlett Eden Limited</span>
        </div>
      </footer>
    </div>
  );
};
