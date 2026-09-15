'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Search, Pencil, Trash2, Send, Eye, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// Dummy data based on the screenshot
const mockBatches = [
  {
    id: 1,
    name: 'Demonstration Batch',
    status: 'ACTIVE',
    date: 'Sun 01/02/2026 - Tue 01/12/2026',
    products: 40,
    type: 'PROMO',
    lastEdit: 'Tue 17/03/2026',
    notes: '',
  }
];

export default function BatchesPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  const [selectedAction, setSelectedAction] = useState('Select Action');
  const [selectedStatus, setSelectedStatus] = useState('Active');

  const actionOptions = ['Create From Spreadsheet', 'Create From Change Report', 'Create From Inventory'];
  const statusOptions = ['All', 'Active', 'Printed', 'Recalled', 'Expired'];
  
  const actionRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
        setIsActionOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 z-10">
            {/* Select Action Dropdown */}
            <div className="relative w-56" ref={actionRef}>
              <div 
                className="w-full pl-3 pr-8 py-2 rounded border border-gray-200 bg-white text-[13px] text-ticketit-navy cursor-pointer flex items-center justify-between shadow-sm"
                onClick={() => {
                  setIsActionOpen(!isActionOpen);
                  setIsStatusOpen(false);
                }}
              >
                <span>{selectedAction}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2" />
              </div>
              {isActionOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg rounded z-50 overflow-hidden">
                  <div className="px-3 py-2 bg-[#b5b5b5] text-white font-medium text-[13px] pointer-events-none">Select Action</div>
                  <div className="py-1">
                    {actionOptions.map((opt) => (
                      <div 
                        key={opt}
                        className="px-3 py-1.5 text-[13px] hover:bg-gray-100 text-ticketit-navy cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedAction(opt);
                          setIsActionOpen(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Batch Status Dropdown */}
            <div className="relative w-44" ref={statusRef}>
              <div 
                className="w-full pl-3 pr-8 py-2 rounded border border-gray-200 bg-white text-[13px] text-ticketit-navy cursor-pointer flex items-center justify-between shadow-sm"
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsActionOpen(false);
                }}
              >
                <span>{selectedStatus}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2" />
              </div>
              {isStatusOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg rounded z-50 overflow-hidden">
                  <div className="px-3 py-2 bg-[#f0f0f0] text-gray-500 font-medium text-[13px] pointer-events-none">Batch Status</div>
                  <div className="py-1">
                    {statusOptions.map((opt) => (
                      <div 
                        key={opt}
                        className={`px-3 py-1.5 text-[13px] cursor-pointer transition-colors ${selectedStatus === opt ? 'bg-[#1a73e8] text-white' : 'text-ticketit-navy hover:bg-gray-100'}`}
                        onClick={() => {
                          setSelectedStatus(opt);
                          setIsStatusOpen(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="relative w-72">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-3 pr-10 py-1.5 rounded border border-gray-200 focus:outline-none focus:border-ticketit-pink text-[13px] shadow-sm text-ticketit-navy placeholder-gray-400"
              />
              <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-black font-bold" />
            </div>
            
            <button className="bg-[#48b078] hover:bg-[#3d9665] text-white flex items-center justify-center gap-1.5 px-4 py-2 rounded text-[13px] font-medium shadow-sm transition-colors border border-transparent">
              <Pencil className="w-3.5 h-3.5 fill-current" />
              Create Batch
            </button>
          </div>
        </div>

        {/* Batches List */}
        <div className="flex flex-col gap-4 mt-1">
          {mockBatches.map((batch) => (
            <div key={batch.id} className="bg-white border border-gray-200 shadow-sm flex flex-col">
              
              {/* Card Header */}
              <div className="flex justify-between items-center px-4 py-2.5 bg-[#E7EAEF] border-b border-gray-200">
                <h3 className="font-bold text-[15px] text-ticketit-navy">{batch.name}</h3>
                <div className="flex items-center gap-1.5 text-ticketit-pink font-bold text-[11px] tracking-wider uppercase">
                  {batch.status}
                  <div className="w-2.5 h-2.5 bg-ticketit-pink rounded-full"></div>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-200">
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-500 mb-1.5 font-medium tracking-wide">DATE</span>
                  <span className="text-ticketit-pink text-[13px] font-bold">{batch.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-500 mb-1.5 font-medium tracking-wide">PRODUCTS</span>
                  <span className="text-ticketit-pink text-[13px] font-bold">{batch.products}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-500 mb-1.5 font-medium tracking-wide">TYPE</span>
                  <span className="text-ticketit-pink text-[13px] font-bold">{batch.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-500 mb-1.5 font-medium tracking-wide">LAST EDIT</span>
                  <span className="text-ticketit-pink text-[13px] font-bold">{batch.lastEdit}</span>
                </div>
              </div>

              {/* Notes Row */}
              <div className="px-4 py-3 border-b border-gray-200 min-h-[65px]">
                <span className="text-[11px] text-gray-500 font-medium tracking-wide">NOTES</span>
                <div className="text-[13px] text-ticketit-navy mt-1">{batch.notes}</div>
              </div>

              {/* Footer Row */}
              <div className="flex justify-between items-center px-4 py-2.5 bg-white">
                <button className="bg-ticketit-pink hover:bg-ticketit-pink-hover text-white flex items-center justify-center gap-1.5 px-4 py-1.5 rounded text-[13px] font-medium shadow-sm transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
                
                <div className="flex items-center gap-2">
                  <button className="bg-[#FF7B8E] hover:bg-[#F25555] text-white flex items-center justify-center gap-1.5 px-4 py-1.5 rounded text-[13px] font-medium shadow-sm transition-colors">
                    <Send className="w-3.5 h-3.5 fill-current" />
                    Send
                  </button>
                  
                  <button className="bg-[#2a2542] hover:bg-[#1a172a] text-white flex items-center justify-center gap-1.5 px-4 py-1.5 rounded text-[13px] font-medium shadow-sm transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View Batch
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-end gap-3 mt-1 text-[13px] text-ticketit-navy font-bold">
          <div className="flex items-center gap-1.5">
            <span>Row Per Page:</span>
            <select className="border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:border-ticketit-pink bg-white shadow-sm font-normal">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2 ml-2 font-normal">
            <span>1-1 of 1</span>
            <div className="flex items-center gap-0.5">
              <button className="p-0.5 rounded text-gray-400 hover:text-ticketit-navy transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-0.5 rounded text-gray-400 hover:text-ticketit-navy transition-colors disabled:opacity-50" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
