'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Square, Circle, Type, Triangle, Image as ImageIcon,
  Code2, Undo, Redo, Check, FolderPlus, ChevronRight, ChevronDown, AlignLeft, AlignCenter, AlignRight, Bold, Settings2, Hash
} from 'lucide-react';

const availableProducts = [
  { id: 1, name: 'Tarsier Pink Gin', size: '700ml', price: '68.99', sku: '13415' },
  { id: 2, name: 'C/Dra Can 6pk', size: '330ml', price: '12.50', sku: '16232' },
  { id: 3, name: 'H/Raiser 8% 24Pk', size: '330ml', price: '45.00', sku: '6751' },
  { id: 4, name: 'Smirn DB Sgl', size: '250ml', price: '10.00', sku: '7210' },
  { id: 5, name: 'FSG PN Gin', size: '750ml', price: '59.99', sku: '13754' },
];

type LayerType = 'group' | 'text' | 'image';

interface Layer {
  id: string;
  type: LayerType;
  label: string;
  content?: string;
  sku?: string;
  children?: Layer[];
  isExpanded?: boolean;
}

export default function TicketEditorPage() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<any>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  const getMatchedProduct = (sku: string) => {
    if (!sku) return null;
    return availableProducts.find(p => p.sku.toLowerCase() === sku.toLowerCase()) || {
      name: 'Unknown Product',
      size: 'N/A',
      price: '0.00',
      sku: sku
    };
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('ticketData');
    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(decodeURIComponent(dataParam)));
        setTicketData(decoded);
        
        // Build initial layers
        const skuCount = decoded?.layout?.columns || 1;
        const rowCount = decoded?.layout?.rows || 1;
        const items = decoded?.items || [];
        const totalSkus = skuCount * rowCount;
        
        const initialLayers: Layer[] = [];
        for (let i = 0; i < totalSkus; i++) {
          const sku = items[i]?.barcode || '';
          const product = getMatchedProduct(sku);
          
          initialLayers.push({
            id: `slot-${i}`,
            type: 'group',
            label: `Slot ${i + 1}`,
            sku: sku,
            isExpanded: true,
            children: product ? [
              { id: `slot-${i}-sku`, type: 'text', label: 'SKU Text', content: product.sku },
              { id: `slot-${i}-name`, type: 'text', label: 'Product Name', content: product.name },
              { id: `slot-${i}-size`, type: 'text', label: 'Size', content: product.size },
              { id: `slot-${i}-price`, type: 'text', label: 'Price', content: `$${product.price}` }
            ] : []
          });
        }
        setLayers(initialLayers);

      } catch (e) {
        console.error("Failed to parse ticket data", e);
      }
    }
  }, []);

  const deviceSize = ticketData?.layout?.deviceSize || '4.2 inch';
  const skuCount = ticketData?.layout?.columns || 1;
  const rowCount = ticketData?.layout?.rows || 1;
  
  const canvasWidth = deviceSize === '9.7 inch' ? 1200 : deviceSize === '4.2 inch' ? 400 : 296;
  const canvasHeight = deviceSize === '9.7 inch' ? 825 : deviceSize === '4.2 inch' ? 300 : 152;

  const toggleLayerExpansion = (layerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, isExpanded: !layer.isExpanded } : layer
    ));
  };

  const handleSelectLayer = (layerId: string | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedLayerId(layerId);
  };

  const updateLayerContent = (layerId: string, newContent: string) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === layerId) {
        return { ...layer, content: newContent };
      }
      if (layer.children) {
        return {
          ...layer,
          children: layer.children.map(child => child.id === layerId ? { ...child, content: newContent } : child)
        };
      }
      return layer;
    }));
  };

  const updateSlotSku = (slotId: string, newSku: string) => {
    const product = getMatchedProduct(newSku);
    setLayers(prev => prev.map(layer => {
      if (layer.id === slotId) {
        if (product) {
          return {
            ...layer,
            sku: newSku,
            children: [
              { id: `${slotId}-sku`, type: 'text', label: 'SKU Text', content: product.sku },
              { id: `${slotId}-name`, type: 'text', label: 'Product Name', content: product.name },
              { id: `${slotId}-size`, type: 'text', label: 'Size', content: product.size },
              { id: `${slotId}-price`, type: 'text', label: 'Price', content: `$${product.price}` }
            ]
          };
        } else {
          return { ...layer, sku: newSku, children: [] };
        }
      }
      return layer;
    }));
  };

  const selectedLayer = React.useMemo(() => {
    if (!selectedLayerId) return null;
    for (const layer of layers) {
      if (layer.id === selectedLayerId) return layer;
      if (layer.children) {
        const child = layer.children.find(c => c.id === selectedLayerId);
        if (child) return child;
      }
    }
    return null;
  }, [layers, selectedLayerId]);

  const selectedSlot = React.useMemo(() => {
    if (!selectedLayerId) return null;
    return layers.find(l => l.id === selectedLayerId || (l.children && l.children.some(c => c.id === selectedLayerId))) || null;
  }, [layers, selectedLayerId]);

  const renderCanvasSlots = () => {
    return layers.map((layer, index) => {
      const isSlotSelected = selectedLayerId === layer.id;
      const skuChild = layer.children?.find(c => c.id.endsWith('-sku'));
      const nameChild = layer.children?.find(c => c.id.endsWith('-name'));
      const sizeChild = layer.children?.find(c => c.id.endsWith('-size'));
      const priceChild = layer.children?.find(c => c.id.endsWith('-price'));

      return (
        <div 
          key={layer.id} 
          onClick={(e) => handleSelectLayer(layer.id, e)}
          className={`flex flex-col justify-center items-center border p-2 relative bg-white rounded overflow-hidden h-full w-full cursor-pointer transition-colors ${
            isSlotSelected ? 'border-ticketit-pink ring-2 ring-ticketit-pink/30 shadow-md' : 'border-dashed border-gray-300 hover:border-ticketit-pink/50'
          }`}
        >
          {layer.children && layer.children.length > 0 ? (
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                {/* SKU */}
                <div 
                  onClick={(e) => handleSelectLayer(skuChild?.id || null, e)}
                  className={`text-[9px] text-gray-500 font-semibold mb-0.5 uppercase tracking-wider p-0.5 rounded border border-transparent ${selectedLayerId === skuChild?.id ? 'border-ticketit-pink bg-ticketit-pink/5' : 'hover:border-gray-200'}`}
                >
                  {skuChild?.content}
                </div>
                {/* Name */}
                <div 
                  onClick={(e) => handleSelectLayer(nameChild?.id || null, e)}
                  className={`font-bold text-gray-900 leading-tight text-xs sm:text-sm line-clamp-2 p-0.5 rounded border border-transparent ${selectedLayerId === nameChild?.id ? 'border-ticketit-pink bg-ticketit-pink/5' : 'hover:border-gray-200'}`}
                >
                  {nameChild?.content}
                </div>
                {/* Size */}
                <div 
                  onClick={(e) => handleSelectLayer(sizeChild?.id || null, e)}
                  className={`text-[10px] text-gray-500 mt-0.5 p-0.5 rounded border border-transparent ${selectedLayerId === sizeChild?.id ? 'border-ticketit-pink bg-ticketit-pink/5' : 'hover:border-gray-200'}`}
                >
                  {sizeChild?.content}
                </div>
              </div>
              
              {/* Price */}
              <div 
                onClick={(e) => handleSelectLayer(priceChild?.id || null, e)}
                className={`mt-auto pt-1 flex items-baseline p-0.5 rounded border border-transparent ${selectedLayerId === priceChild?.id ? 'border-ticketit-pink bg-ticketit-pink/5' : 'hover:border-gray-200'}`}
              >
                {(() => {
                  const pParts = (priceChild?.content || '$0.00').replace('$', '').split('.');
                  return (
                    <>
                      <span className="text-ticketit-pink font-bold text-xs mr-0.5">$</span>
                      <span className="text-ticketit-pink font-black text-lg sm:text-xl leading-none">
                        {pParts[0]}
                      </span>
                      <span className="text-ticketit-pink font-bold text-xs ml-0.5">
                        .{pParts[1] || '00'}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 opacity-50" />
              <div className="text-[10px] font-bold uppercase tracking-widest">Slot {index + 1}</div>
              <div className="text-[9px] mt-0.5">Awaiting SKU</div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <AppShell hidePrimaryNav>
      <div className="flex-1 w-full flex flex-col bg-white overflow-hidden" onClick={() => handleSelectLayer(null)}>
        
        {/* Breadcrumbs (Above Toolbar) */}
        <div className="px-4 py-2 border-b border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Ticket Management / <span className="text-gray-400">Ticket Editor</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
          {/* Left Actions */}
          <div className="flex items-center">
            <Link
              href="/ticket-management"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-ticketit-pink text-white rounded-l-md hover:bg-ticketit-pink-hover transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </Link>
            <div className="px-4 py-1.5 text-xs font-bold bg-ticketit-navy text-white rounded-r-md">
              Ticket Editor
            </div>
          </div>

          {/* Center Tools */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <Square fill="currentColor" className="w-4 h-4 text-ticketit-navy" />
              Rectangle
            </button>
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <Circle fill="currentColor" className="w-4 h-4 text-ticketit-navy" />
              Circle
            </button>
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <Type className="w-4 h-4 text-ticketit-navy" />
              Text
            </button>
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <div className="w-4 h-3 bg-ticketit-navy rounded-[100%]" />
              Ellipse
            </button>
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <Triangle fill="currentColor" className="w-4 h-4 text-ticketit-navy" />
              Triangle
            </button>
            <button className="flex items-center gap-1.5 hover:text-ticketit-pink transition-colors">
              <ImageIcon className="w-4 h-4 text-ticketit-navy" />
              Image
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-ticketit-navy text-white rounded-md hover:bg-ticketit-navy-light transition-colors">
              <Code2 className="w-3.5 h-3.5" />
              Add XML
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-ticketit-blush text-white rounded-md hover:bg-ticketit-blush-hover transition-colors">
              <Undo className="w-3.5 h-3.5" />
              Undo
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-ticketit-blush text-white rounded-md hover:bg-ticketit-blush-hover transition-colors">
              <Redo className="w-3.5 h-3.5" />
              Redo
            </button>
            <button 
              onClick={() => router.push('/ticket-management')}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-ticketit-green text-white rounded-md hover:bg-ticketit-green-hover transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Save Ticket
            </button>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 flex gap-2 p-2 bg-white overflow-hidden h-full">

          {/* Left Panel: Layers */}
          <div className="w-72 flex flex-col rounded-md border border-gray-200 bg-white overflow-hidden shrink-0" onClick={e => e.stopPropagation()}>
            <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <span className="font-bold text-sm text-ticketit-navy">Layers</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-ticketit-green text-white rounded hover:bg-ticketit-green-hover transition-colors">
                <FolderPlus className="w-3.5 h-3.5" />
                Group
              </button>
            </div>
            <div className="flex-1 bg-white overflow-y-auto py-2">
              {layers.map(layer => (
                <div key={layer.id} className="text-sm">
                  <div 
                    className={`flex items-center px-3 py-1.5 cursor-pointer ${selectedLayerId === layer.id ? 'bg-ticketit-pink/10 text-ticketit-pink font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                    onClick={(e) => handleSelectLayer(layer.id, e)}
                  >
                    <button onClick={(e) => toggleLayerExpansion(layer.id, e)} className="mr-1 opacity-50 hover:opacity-100">
                      {layer.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <FolderPlus className="w-3.5 h-3.5 mr-2 opacity-70" />
                    {layer.label}
                  </div>
                  {layer.isExpanded && layer.children && layer.children.map(child => (
                    <div 
                      key={child.id}
                      className={`flex items-center pl-10 pr-3 py-1.5 cursor-pointer ${selectedLayerId === child.id ? 'bg-ticketit-pink/10 text-ticketit-pink font-semibold' : 'hover:bg-gray-50 text-gray-600'}`}
                      onClick={(e) => handleSelectLayer(child.id, e)}
                    >
                      <Type className="w-3.5 h-3.5 mr-2 opacity-70" />
                      <span className="truncate">{child.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Center Canvas */}
          <div className="flex-1 rounded-md border border-gray-200 bg-ticketit-bg flex items-center justify-center overflow-auto relative" onClick={() => handleSelectLayer(null)}>
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div
              className="bg-white shadow-2xl transition-all duration-300 grid border-[6px] border-gray-800 rounded-md gap-1.5 p-2.5 relative z-10"
              style={{ 
                width: `${canvasWidth}px`, 
                height: `${canvasHeight}px`,
                gridTemplateColumns: `repeat(${skuCount}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`
              }}
            >
              {renderCanvasSlots()}
            </div>
          </div>

          {/* Right Panel: Layer Properties */}
          <div className="w-72 flex flex-col rounded-md border border-gray-200 bg-white overflow-hidden shrink-0" onClick={e => e.stopPropagation()}>
            <div className="px-3 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-sm text-ticketit-navy">
                {selectedLayer ? (selectedLayer.type === 'group' ? 'Slot Properties' : 'Text Properties') : 'Canvas Properties'}
              </span>
            </div>
            
            <div className="p-4 flex flex-col gap-5 bg-white flex-1 overflow-y-auto">
              
              {!selectedLayer && (
                <>
                  {/* Canvas Properties */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Canvas Width</label>
                    <div className="relative">
                      <input type="number" value={canvasWidth} readOnly className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500 bg-gray-50 focus:outline-none" />
                      <span className="absolute right-3 top-2.5 text-xs text-gray-400">px</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Canvas Height</label>
                    <div className="relative">
                      <input type="number" value={canvasHeight} readOnly className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500 bg-gray-50 focus:outline-none" />
                      <span className="absolute right-3 top-2.5 text-xs text-gray-400">px</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 border border-gray-300 rounded bg-white"></div>
                      <input type="text" defaultValue="#ffffff" className="flex-1 border border-gray-300 rounded p-2 text-sm text-gray-600 focus:border-ticketit-pink focus:outline-none" />
                    </div>
                  </div>
                </>
              )}

              {selectedLayer?.type === 'group' && (
                <>
                  {/* Slot Properties */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Assigned SKU</label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input 
                        type="text" 
                        value={selectedLayer.sku || ''}
                        onChange={(e) => updateSlotSku(selectedLayer.id, e.target.value)}
                        placeholder="Enter SKU..."
                        className="w-full border border-gray-300 rounded py-2 pl-9 pr-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500">
                      Changing the SKU will automatically pull product data and overwrite text layers inside this slot.
                    </div>
                  </div>
                </>
              )}

              {selectedLayer?.type === 'text' && (
                <>
                  {/* Text Properties */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Text Content</label>
                    <textarea 
                      value={selectedLayer.content || ''}
                      onChange={(e) => updateLayerContent(selectedLayer.id, e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 text-sm focus:border-ticketit-pink focus:outline-none min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Text Style</label>
                    <div className="flex gap-2 mb-3">
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600"><AlignLeft className="w-4 h-4" /></button>
                      <button className="p-2 border border-gray-300 rounded bg-gray-100 text-ticketit-navy"><AlignCenter className="w-4 h-4" /></button>
                      <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600"><AlignRight className="w-4 h-4" /></button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button className="p-2 border border-gray-300 rounded bg-gray-100 text-ticketit-navy"><Bold className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Color</label>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 border border-gray-300 rounded ${selectedLayer.label === 'Price' ? 'bg-ticketit-pink' : 'bg-gray-900'}`}></div>
                      <input 
                        type="text" 
                        value={selectedLayer.label === 'Price' ? '#E91E63' : '#111827'} 
                        readOnly
                        className="flex-1 border border-gray-300 rounded p-1.5 text-sm text-gray-600 bg-gray-50 focus:outline-none" 
                      />
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
