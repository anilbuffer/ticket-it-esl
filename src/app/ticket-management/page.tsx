'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { ArrowLeft, Pencil, Copy, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data to match the screenshot
const mockTickets = [
  { id: 1, title: 'Tarsier Pink Gin', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 2, title: 'C/Dra Can 6pk', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 3, title: 'H/Raiser 8% 24Pk', width: 'px', height: 'px', paperSize: 'A4' },
  { id: 4, title: 'Smirn DB Sgl', width: 'px', height: 'px', paperSize: 'A4' },
  { id: 5, title: 'Balt Cap S Sgl', width: 'px', height: 'px', paperSize: 'A4' },
  { id: 6, title: 'Min Baileys 50ml', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 7, title: 'FSG PN Gin', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 8, title: 'J/Daniels 200ml', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 9, title: 'Nob Mix/N 150g', width: 'px', height: 'px', paperSize: 'Custom' },
  { id: 10, title: 'Nob H&S Jerk 25g', width: 'px', height: 'px', paperSize: 'Custom' },
];

export default function TicketManagementPage() {
  const router = useRouter();

  return (
    <AppShell>
      {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 mb-2">
        Batches / <span className="text-gray-400">Your Account</span>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-gray-200 pb-4 sm:border-0 sm:pb-0">
        <div className="flex items-center">
          <Link 
            href="/batches" 
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-ticketit-pink text-white rounded-l-md border border-ticketit-pink hover:bg-ticketit-pink-hover transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Go Back
          </Link>
          <div className="px-4 py-1.5 text-xs font-bold bg-ticketit-navy text-white rounded-r-md border border-ticketit-navy">
            Ticket Management
          </div>
        </div>

        <button 
          onClick={() => router.push('/ticket-editor')}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-ticketit-green text-white rounded-md hover:bg-ticketit-green-hover transition-colors shadow-sm"
        >
          <Pencil className="w-3.5 h-3.5" />
          Create New Ticket
        </button>
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-md shadow-card border border-gray-100 flex flex-col p-2">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-gray-200 rounded flex items-center justify-center relative overflow-hidden">
              {/* Mountains & Sun SVG */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#d1d5db] absolute inset-0">
                <path d="M0,100 L0,60 Q15,30 35,65 T70,55 T100,75 L100,100 Z" fill="currentColor" />
                <path d="M70,55 Q85,45 100,65 L100,100 L0,100 Z" fill="currentColor" opacity="0.7" />
                <circle cx="35" cy="30" r="7" fill="white" />
              </svg>
            </div>

            {/* Title */}
            <div className="text-center font-bold text-[11px] mt-4 mb-3 px-1 uppercase tracking-wide text-ticketit-navy">
              {ticket.title}
            </div>

            {/* Table Details */}
            <div className="px-1 border-t border-gray-200 pt-2 pb-1">
              <table className="w-full text-[10px] text-gray-700">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 font-medium">Width</td>
                    <td className="py-1.5 text-right text-gray-500">{ticket.width}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 font-medium">Height</td>
                    <td className="py-1.5 text-right text-gray-500">{ticket.height}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium">PaperSize</td>
                    <td className="py-1.5 text-right text-gray-500">{ticket.paperSize}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-2 p-2 mt-auto">
              <button className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-green text-white hover:bg-ticketit-green-hover transition-colors" title="Edit">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-blush text-white hover:bg-ticketit-blush-hover transition-colors" title="Copy">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-navy text-white hover:bg-ticketit-navy-light transition-colors" title="Download">
                <Download className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-pink text-white hover:bg-ticketit-pink-hover transition-colors" title="Delete">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </AppShell>
  );
}
