'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MultiESLModal } from '@/components/modals/MultiESLModal';
import { ESLDetailModal } from '@/components/modals/ESLDetailModal';
import { AssignESLModal } from '@/components/modals/AssignESLModal';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  ListFilter, 
  RefreshCw, 
  Plus, 
  Zap, 
  Plug, 
  Eye, 
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

const DUMMY_DATA = [
  { id: 1, barcode: '8467939B6', model: 'ZKC42B-N', sku: '13415', name: 'Tarsier Pink Gin', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:03 AM' },
  { id: 2, barcode: '847194950', model: 'ZKC26B-NA', sku: '16232', name: 'C/Dra Can 6pk', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:03 AM' },
  { id: 3, barcode: '873373517', model: 'ZKC26B-NA', sku: '6751', name: 'H/Raiser 8% 24Pk', price: '-', status: 'Offline', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 4, barcode: '873650245', model: 'ZKC26B-NA', sku: '7210', name: 'Smirn DB Sgl', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 5, barcode: '874193666', model: 'ZKC26B-NA', sku: '6728', name: 'Balt Cap S Sgl', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 6, barcode: '874835651', model: 'ZKC18B-N', sku: '5173', name: 'Min Baileys 50ml', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 7, barcode: '874926C99', model: 'ZKC42B-N', sku: '13754', name: 'FSG PN Gin', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:03 AM' },
  { id: 8, barcode: '876072992', model: 'ZKC18B-N', sku: '508', name: 'J/Daniels 200ml', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 9, barcode: '876892168', model: 'ZKC18B-N', sku: '5969', name: 'Nob Mix/N 150g', price: '-', status: 'Online', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:04 AM' },
  { id: 10, barcode: '877035919', model: 'ZKC18B-N', sku: '13500', name: 'Nob H&S Jerk 25g', price: '-', status: 'Offline', isPromo: 'false', lastUpdated: 'Mon 14/09/2026 07:03 AM' },
];

export default function ESLManagementPage() {
  const [tableData, setTableData] = useState(DUMMY_DATA);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isMultiESLModalOpen, setIsMultiESLModalOpen] = useState(false);
  const [isESLDetailModalOpen, setIsESLDetailModalOpen] = useState(false);
  const [selectedESLData, setSelectedESLData] = useState<any>(null);
  const [isAssignESLModalOpen, setIsAssignESLModalOpen] = useState(false);
  const [assignESLBarcode, setAssignESLBarcode] = useState('');
  const [flashMenuOpenId, setFlashMenuOpenId] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setFlashMenuOpenId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map(d => d.id));
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        
        {/* Secondary Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ticketit-border pb-3">
          <div className="flex gap-2">
            <button className="bg-ticketit-pink text-white px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors border border-transparent">
              ESL Assignment
            </button>
            <button className="bg-white text-ticketit-navy border border-ticketit-border hover:border-ticketit-pink hover:text-ticketit-pink px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors">
              ESL Custom Content
            </button>
            <button className="bg-white text-ticketit-navy border border-ticketit-border hover:border-ticketit-pink hover:text-ticketit-pink px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors">
              ESL Change Report
            </button>
            <button className="bg-white text-ticketit-navy border border-ticketit-border hover:border-ticketit-pink hover:text-ticketit-pink px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors">
              ESL Statistics
            </button>
          </div>
          <div className="flex gap-2">
            <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />}>
              Force Update
            </Button>
            <Button 
              variant="green" 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setAssignESLBarcode('');
                setIsAssignESLModalOpen(true);
              }}
            >
              Add ESL
            </Button>
            <Button 
              className="text-white shadow-btn border border-transparent hover:opacity-90"
              style={{ backgroundColor: '#2b253e' }} 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsMultiESLModalOpen(true)}
            >
              Multi ESL
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mt-2">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-3 pr-10 py-2 rounded border border-ticketit-border focus:outline-none focus:border-ticketit-pink focus:ring-1 focus:ring-ticketit-pink text-sm"
            />
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
          </div>
          <Button variant="coral" icon={<ListFilter className="w-4 h-4" />}>
            Data Filter
          </Button>
          <div className="flex items-center gap-2 bg-ticketit-green text-white px-3 py-2 rounded text-sm font-semibold shadow-sm">
            <input type="checkbox" className="w-4 h-4 accent-white rounded-sm cursor-pointer" />
            <span>On Promotion</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-ticketit-border rounded-t mt-4 overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#E7EAEF] text-ticketit-navy font-bold text-[13px] border-b border-ticketit-border">
              <tr>
                <th className="px-4 py-3 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded-sm border-gray-300 cursor-pointer"
                    checked={selectedRows.length === tableData.length && tableData.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    ESL Barcode <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Model <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Product SKU <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Product Name <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Product Price <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Status <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    IsPromo <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Last Updated Time <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Action <ArrowUp className="w-3 h-3 text-gray-500" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded-sm border-gray-300 cursor-pointer"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td className="px-4 py-3.5 text-gray-700">{row.barcode}</td>
                  <td className="px-4 py-3.5 text-gray-700">{row.model}</td>
                  <td className="px-4 py-3.5 text-gray-700">{row.sku}</td>
                  <td className="px-4 py-3.5 text-gray-700">{row.name}</td>
                  <td className="px-4 py-3.5 text-gray-700">{row.price}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      row.status === 'Online' 
                        ? 'bg-[#EBF7F0] text-ticketit-green' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-700">{row.isPromo}</td>
                  <td className="px-4 py-3.5 text-gray-700">{row.lastUpdated}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <button 
                          className="w-7 h-7 rounded flex items-center justify-center bg-[#FF6B6B] hover:bg-[#F25555] text-white transition-colors" 
                          title="Flash"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlashMenuOpenId(flashMenuOpenId === row.id ? null : row.id);
                          }}
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                        {flashMenuOpenId === row.id && (
                          <div 
                            className="absolute top-full right-0 mt-1 w-28 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Blue', 'Purple', 'White'].map((color, i) => (
                              <button 
                                key={i} 
                                className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  console.log(`Flash ${color} on ${row.barcode}`);
                                  setFlashMenuOpenId(null);
                                }}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button 
                        className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-pink hover:bg-ticketit-pink-hover text-white transition-colors" 
                        title="Assign ESL"
                        onClick={() => {
                          setAssignESLBarcode(row.barcode);
                          setIsAssignESLModalOpen(true);
                        }}
                      >
                        <Plug className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        className="w-7 h-7 rounded flex items-center justify-center bg-[#2B2F42] hover:bg-[#1A1C29] text-white transition-colors" 
                        title="View Details"
                        onClick={() => {
                          setSelectedESLData(row);
                          setIsESLDetailModalOpen(true);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center bg-ticketit-green hover:bg-ticketit-green-hover text-white transition-colors" title="Action 4">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-end gap-4 mt-2 text-sm text-ticketit-navy font-medium">
          <div className="flex items-center gap-2">
            <span>Row Per Page:</span>
            <select className="border border-ticketit-border rounded px-2 py-1 focus:outline-none focus:border-ticketit-pink">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span>1-10 of 1854</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-gray-400 hover:text-ticketit-navy transition-colors disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1 rounded text-gray-600 hover:text-ticketit-navy transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MultiESLModal 
        isOpen={isMultiESLModalOpen} 
        onClose={() => setIsMultiESLModalOpen(false)} 
        onPublish={(newEntry) => {
          setTableData(prev => [{ ...newEntry, id: Date.now() }, ...prev]);
          setIsMultiESLModalOpen(false);
        }}
        availableEsls={tableData.map(d => d.barcode)}
      />
      <ESLDetailModal
        isOpen={isESLDetailModalOpen}
        onClose={() => setIsESLDetailModalOpen(false)}
        eslData={selectedESLData ? {
          barcode: selectedESLData.barcode,
          model: selectedESLData.model,
          shelfNo: '',
          softVersion: '2.2.56',
          lastUpdated: selectedESLData.lastUpdated,
          size: '4.2',
          turnOver: '0',
          type: '1',
          batteryLevel: '100%',
          items: selectedESLData.items || [
            { no: '1', barcode: selectedESLData.sku, name: selectedESLData.name }
          ],
          layout: selectedESLData.layout
        } : undefined}
      />
      <AssignESLModal
        isOpen={isAssignESLModalOpen}
        onClose={() => setIsAssignESLModalOpen(false)}
        eslBarcode={assignESLBarcode}
      />
    </AppShell>
  );
}
