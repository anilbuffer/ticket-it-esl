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
  const [skus, setSkus] = useState<string[]>(['', '', '', '']);

  // Reset or adjust inputs when size changes
  useEffect(() => {
    if (deviceSize === '7.5 inch' && skuCount < 2) {
      setSkuCount(2);
    } else if (deviceSize !== '7.5 inch' && skuCount > 3) {
      setSkuCount(3);
    }
  }, [deviceSize, skuCount]);

  const getLayoutOptions = () => {
    if (deviceSize === '7.5 inch') return [2, 3, 4];
    return [1, 2, 3];
  };

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
    for (let i = 0; i < skuCount; i++) {
      const product = getMatchedProduct(skus[i]);
      slots.push(
        <div 
          key={i} 
          className="flex-1 flex flex-col justify-center items-center border border-dashed border-gray-300 p-4 relative bg-white m-1 rounded shadow-sm overflow-hidden"
        >
          {product ? (
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="text-[10px] text-gray-500 font-semibold mb-1 uppercase tracking-wider">{product.barcode}</div>
                <div className="font-bold text-gray-900 leading-tight text-sm md:text-base line-clamp-2">{product.name}</div>
                <div className="text-xs text-gray-500 mt-1">{product.size}</div>
              </div>
              <div className="mt-auto pt-2 flex items-baseline">
                <span className="text-ticketit-pink font-bold text-sm mr-0.5">$</span>
                <span className="text-ticketit-pink font-black text-2xl leading-none">
                  {product.price.split('.')[0]}
                </span>
                <span className="text-ticketit-pink font-bold text-sm ml-0.5">
                  .{product.price.split('.')[1] || '00'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-xs font-bold uppercase tracking-widest">Col {i + 1}</div>
              <div className="text-[10px] mt-1">Awaiting SKU</div>
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

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Column Layout
                </label>
                <div className="flex gap-2">
                  {getLayoutOptions().map(num => (
                    <button
                      key={num}
                      onClick={() => setSkuCount(num)}
                      className={`flex-1 py-2.5 rounded border text-sm font-bold transition-colors ${
                        skuCount === num 
                          ? 'border-ticketit-pink bg-pink-50 text-ticketit-pink' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {num} SKU Column{num > 1 ? 's' : ''} + Rows
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-ticketit-navy mb-4 border-b pb-2">Dynamic SKU Inputs</h3>
            <div className="space-y-4">
              {Array.from({ length: skuCount }).map((_, i) => (
                <div key={i} className="relative">
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
                    SKU / Barcode {i + 1}
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={skus[i] || ''}
                      onChange={(e) => handleSkuChange(i, e.target.value)}
                      placeholder={`Enter Barcode for Column ${i + 1}`}
                      className="w-full border border-gray-300 rounded py-2 pl-9 pr-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
                    />
                    <Barcode className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              variant="green"
              onClick={() => {
                if (onPublish) {
                  const validSkus = skus.slice(0, skuCount).filter(Boolean);
                  onPublish({
                    barcode: 'Multi-' + Math.floor(Math.random() * 10000),
                    model: deviceSize.includes('7.5') ? 'ZKC75B-N' : 'ZKC42B-N',
                    sku: validSkus.join(', ') || 'Multi-SKU',
                    name: `Multi-Ticket (${skuCount} SKUs)`,
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

        {/* Right Column: Live Preview */}
        <div className="w-1/2 bg-[#E7EAEF] p-6 flex flex-col relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-ticketit-navy uppercase text-sm tracking-wider flex items-center gap-2">
              Live Preview
            </h3>
            <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded font-bold shadow-sm border border-gray-200">
              {deviceSize} • {skuCount} Column{skuCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Background grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* The ESL Label Container */}
            <div 
              className="relative z-10 bg-white p-2 shadow-xl transition-all duration-300 flex border-4 border-gray-800 rounded-sm"
              style={{
                width: deviceSize === '7.5 inch' ? '420px' : deviceSize === '4.2 inch' ? '300px' : '220px',
                height: deviceSize === '7.5 inch' ? '280px' : deviceSize === '4.2 inch' ? '200px' : '150px',
              }}
            >
              {renderPreviewSlots()}
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};
