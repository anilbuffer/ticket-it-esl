import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Barcode, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MultiESLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish?: (data: any) => void;
}

type DeviceSize = '2.9 inch' | '4.2 inch' | '7.5 inch';

// Dummy data for products
const availableProducts = [
  { id: 1, name: 'Tarsier Pink Gin', size: '700ml', price: '68.99', barcode: '8467939B6' },
  { id: 2, name: 'C/Dra Can 6pk', size: '330ml', price: '12.50', barcode: '847194950' },
  { id: 3, name: 'H/Raiser 8% 24Pk', size: '330ml', price: '45.00', barcode: '873373517' },
  { id: 4, name: 'Smirn DB Sgl', size: '250ml', price: '10.00', barcode: '873650245' },
  { id: 5, name: 'FSG PN Gin', size: '750ml', price: '59.99', barcode: '874926C99' },
];

export const MultiESLModal: React.FC<MultiESLModalProps> = ({ isOpen, onClose, onPublish }) => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('2.9 inch');
  const [skuCount, setSkuCount] = useState<number>(1);
  const [rowCount, setRowCount] = useState<number>(1);
  const [skus, setSkus] = useState<string[]>(Array(100).fill(''));
  const [eslBarcode, setEslBarcode] = useState('');
  
  const totalSkus = skuCount * rowCount;

  const handleSkuChange = (index: number, value: string) => {
    const newSkus = [...skus];
    newSkus[index] = value;
    setSkus(newSkus);
  };

  const getMatchedProduct = (sku: string) => {
    if (!sku) return null;
    return availableProducts.find(p => p.barcode.toLowerCase() === sku.toLowerCase()) || {
      name: 'Unknown Product',
      size: 'N/A',
      price: '0.00',
      barcode: sku
    };
  };

  const renderPreviewSlots = () => {
    const slots = [];
    for (let i = 0; i < totalSkus; i++) {
      const product = getMatchedProduct(skus[i]);
      slots.push(
        <div 
          key={i} 
          className="flex flex-col justify-center items-center border border-dashed border-gray-300 p-2 relative bg-white rounded shadow-sm overflow-hidden h-full w-full"
        >
          {product ? (
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="text-[9px] text-gray-500 font-semibold mb-0.5 uppercase tracking-wider">{product.barcode}</div>
                <div className="font-bold text-gray-900 leading-tight text-xs sm:text-sm line-clamp-2">{product.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{product.size}</div>
              </div>
              <div className="mt-auto pt-1 flex items-baseline">
                <span className="text-ticketit-pink font-bold text-xs mr-0.5">$</span>
                <span className="text-ticketit-pink font-black text-lg sm:text-xl leading-none">
                  {product.price.split('.')[0]}
                </span>
                <span className="text-ticketit-pink font-bold text-xs ml-0.5">
                  .{product.price.split('.')[1] || '00'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 opacity-50" />
              <div className="text-[10px] font-bold uppercase tracking-widest">Slot {i + 1}</div>
              <div className="text-[9px] mt-0.5">Awaiting SKU</div>
            </div>
          )}
        </div>
      );
    }
    return slots;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Product Ticket Modal" maxWidth="5xl">
      <div className="flex h-[600px] -mx-6 -my-5 bg-white">
        
        {/* Left Column: Configuration */}
        <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-ticketit-navy mb-4 border-b pb-2">Output & Layout Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Target Device Size
                </label>
                <select 
                  value={deviceSize}
                  onChange={(e) => setDeviceSize(e.target.value as DeviceSize)}
                  className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none bg-gray-50"
                >
                  <option value="2.9 inch">2.9" (Small)</option>
                  <option value="4.2 inch">4.2" (Medium)</option>
                  <option value="7.5 inch">7.5" (Large / Multi)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Columns
                  </label>
                  <select 
                    value={skuCount}
                    onChange={(e) => setSkuCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none bg-gray-50 font-bold text-gray-700"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Column{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Rows
                  </label>
                  <select 
                    value={rowCount}
                    onChange={(e) => setRowCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none bg-gray-50 font-bold text-gray-700"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Row{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-ticketit-navy mb-4 border-b pb-2">Dynamic SKU Inputs</h3>
            <div className="space-y-4">
              {Array.from({ length: totalSkus }).map((_, i) => (
                <div key={i} className="relative">
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
                    SKU {i + 1}
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={skus[i] || ''}
                      onChange={(e) => handleSkuChange(i, e.target.value)}
                      placeholder={`Enter SKU for Slot ${i + 1}`}
                      className="w-full border border-gray-300 rounded py-2 px-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <input 
                type="text" 
                value={eslBarcode}
                onChange={(e) => setEslBarcode(e.target.value)}
                placeholder="Search ESL Barcode to assign..."
                className="w-full border border-gray-300 rounded py-2 pl-9 pr-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
              />
              <Barcode className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                variant="green"
                onClick={() => {
                  if (onPublish) {
                    const validSkus = skus.slice(0, skuCount).filter(Boolean);
                    onPublish({
                      barcode: eslBarcode || ('Multi-' + Math.floor(Math.random() * 10000)),
                      model: deviceSize.includes('7.5') ? 'ZKC75B-N' : 'ZKC42B-N',
                      sku: validSkus.join(', ') || 'Multi-SKU',
                      name: `Multi-Ticket (${totalSkus} SKUs)`,
                      price: '-',
                      status: 'Online',
                      isPromo: 'false',
                      lastUpdated: new Date().toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    });
                  }
                }}
              >
                Assign & Publish
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="w-1/2 bg-[#E7EAEF] p-6 flex flex-col relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-ticketit-navy uppercase text-sm tracking-wider flex items-center gap-2">
              Live Preview
            </h3>
            <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded font-bold shadow-sm border border-gray-200">
              {deviceSize} • {skuCount} Col{skuCount > 1 ? 's' : ''} × {rowCount} Row{rowCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Background grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* The ESL Label Container */}
            <div className="w-[95%] max-w-[460px] mx-auto flex items-center justify-center relative z-10">
              <div 
                className="w-full bg-white p-2.5 shadow-2xl transition-all duration-300 grid border-[6px] border-gray-800 rounded-md gap-1.5"
                style={{
                  aspectRatio: deviceSize === '7.5 inch' ? '800/480' : deviceSize === '4.2 inch' ? '400/300' : '296/128',
                  gridTemplateColumns: `repeat(${skuCount}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`
                }}
              >
              {renderPreviewSlots()}
              </div>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};
