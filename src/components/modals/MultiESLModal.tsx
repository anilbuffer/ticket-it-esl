import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Barcode, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MultiESLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish?: (data: any) => void;
  availableEsls?: string[];
  actionText?: string;
}

type LayoutOption = 
  | '2.6_1x1'
  | '4.2_1x1'
  | '4.2_1x2'
  | '4.2_2x1'
  | '4.2_2x2'
  | '9.7_1x1'
  | '9.7_1x2'
  | '9.7_2x1'
  | '9.7_3x2';

// Dummy data for products
const availableProducts = [
  { id: 1, name: 'Tarsier Pink Gin', size: '700ml', price: '68.99', sku: '13415' },
  { id: 2, name: 'C/Dra Can 6pk', size: '330ml', price: '12.50', sku: '16232' },
  { id: 3, name: 'H/Raiser 8% 24Pk', size: '330ml', price: '45.00', sku: '6751' },
  { id: 4, name: 'Smirn DB Sgl', size: '250ml', price: '10.00', sku: '7210' },
  { id: 5, name: 'FSG PN Gin', size: '750ml', price: '59.99', sku: '13754' },
];

export const MultiESLModal: React.FC<MultiESLModalProps> = ({ isOpen, onClose, onPublish, availableEsls = [], actionText = 'Assign & Publish' }) => {
  const [layoutOption, setLayoutOption] = useState<LayoutOption>('2.6_1x1');
  const [skus, setSkus] = useState<string[]>(Array(100).fill(''));
  const [eslBarcode, setEslBarcode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSkuDropdown, setActiveSkuDropdown] = useState<number | null>(null);
  
  const getLayoutConfig = (option: LayoutOption) => {
    switch (option) {
      case '2.6_1x1': return { deviceSize: '2.6 inch', cols: 1, rows: 1 };
      case '4.2_1x1': return { deviceSize: '4.2 inch', cols: 1, rows: 1 };
      case '4.2_1x2': return { deviceSize: '4.2 inch', cols: 1, rows: 2 };
      case '4.2_2x1': return { deviceSize: '4.2 inch', cols: 2, rows: 1 };
      case '4.2_2x2': return { deviceSize: '4.2 inch', cols: 2, rows: 2 };
      case '9.7_1x1': return { deviceSize: '9.7 inch', cols: 1, rows: 1 };
      case '9.7_1x2': return { deviceSize: '9.7 inch', cols: 1, rows: 2 };
      case '9.7_2x1': return { deviceSize: '9.7 inch', cols: 2, rows: 1 };
      case '9.7_3x2': return { deviceSize: '9.7 inch', cols: 3, rows: 2 };
      default: return { deviceSize: '2.6 inch', cols: 1, rows: 1 };
    }
  };

  const { deviceSize, cols: skuCount, rows: rowCount } = getLayoutConfig(layoutOption);
  const totalSkus = skuCount * rowCount;

  const handleSkuChange = (index: number, value: string) => {
    const newSkus = [...skus];
    newSkus[index] = value;
    setSkus(newSkus);
  };

  const getMatchedProduct = (sku: string) => {
    if (!sku) return null;
    return availableProducts.find(p => p.sku.toLowerCase() === sku.toLowerCase()) || {
      name: 'Unknown Product',
      size: 'N/A',
      price: '0.00',
      sku: sku
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
                <div className="text-[9px] text-gray-500 font-semibold mb-0.5 uppercase tracking-wider">{product.sku}</div>
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
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Product Ticket Modal" maxWidth="5xl" headerColor="navy">
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
                  value={layoutOption}
                  onChange={(e) => setLayoutOption(e.target.value as LayoutOption)}
                  className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none bg-gray-50"
                >
                  <option value="2.6_1x1">2.6" (Small) - 1 Column × 1 Row</option>
                  <option value="4.2_1x1">4.2" (Medium) - 1 Column × 1 Row</option>
                  <option value="4.2_1x2">4.2" (Medium) - 1 Column × 2 Rows</option>
                  <option value="4.2_2x1">4.2" (Medium) - 2 Columns × 1 Row</option>
                  <option value="4.2_2x2">4.2" (Medium) - 2 Columns × 2 Rows</option>
                  <option value="9.7_1x1">9.7" (Large / Multi) - 1 Column × 1 Row</option>
                  <option value="9.7_1x2">9.7" (Large / Multi) - 1 Column × 2 Rows</option>
                  <option value="9.7_2x1">9.7" (Large / Multi) - 2 Columns × 1 Row</option>
                  <option value="9.7_3x2">9.7" (Large / Multi) - 3 Columns × 2 Rows</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-ticketit-navy mb-4 border-b pb-2">Dynamic SKU Inputs</h3>
            <div className="space-y-4">
              {Array.from({ length: totalSkus }).map((_, i) => (
                <div key={i} className={`relative ${activeSkuDropdown === i ? 'z-50' : 'z-20'}`}>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
                    SKU {i + 1}
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={skus[i] || ''}
                      onChange={(e) => {
                        handleSkuChange(i, e.target.value);
                        setActiveSkuDropdown(i);
                      }}
                      onFocus={() => setActiveSkuDropdown(i)}
                      onBlur={() => setTimeout(() => setActiveSkuDropdown(null), 200)}
                      placeholder={`Enter SKU for Slot ${i + 1}`}
                      className="w-full border border-gray-300 rounded py-2 px-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
                    />
                    {activeSkuDropdown === i && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                        {availableProducts.filter(p => p.sku.toLowerCase().includes((skus[i] || '').toLowerCase()) || p.name.toLowerCase().includes((skus[i] || '').toLowerCase())).length > 0 ? (
                          availableProducts
                            .filter(p => p.sku.toLowerCase().includes((skus[i] || '').toLowerCase()) || p.name.toLowerCase().includes((skus[i] || '').toLowerCase()))
                            .map((product) => (
                              <div
                                key={product.id}
                                className="px-3 py-2 text-sm text-gray-700 hover:bg-ticketit-pink hover:text-white cursor-pointer transition-colors flex justify-between items-center"
                                onClick={() => {
                                  handleSkuChange(i, product.sku);
                                  setActiveSkuDropdown(null);
                                }}
                              >
                                <span className="truncate mr-2">{product.name}</span>
                                <span className="text-xs opacity-70 font-mono shrink-0">{product.sku}</span>
                              </div>
                            ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500 text-center">
                            No matching products
                          </div>
                        )}
                      </div>
                    )}
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
                onChange={(e) => {
                  setEslBarcode(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                placeholder="Search ESL Barcode to assign..."
                className="w-full border border-gray-300 rounded py-2 pl-9 pr-3 text-sm focus:border-ticketit-pink focus:outline-none transition-colors"
              />
              <Barcode className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              {isDropdownOpen && availableEsls && (
                <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                  {availableEsls.filter(b => b.toLowerCase().includes(eslBarcode.toLowerCase())).length > 0 ? (
                    availableEsls
                      .filter(b => b.toLowerCase().includes(eslBarcode.toLowerCase()))
                      .map((barcode, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-ticketit-pink hover:text-white cursor-pointer transition-colors"
                          onClick={() => {
                            setEslBarcode(barcode);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {barcode}
                        </div>
                      ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                      No matching barcodes
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                variant="green"
                onClick={() => {
                  if (onPublish) {
                    const validSkus = skus.slice(0, totalSkus).filter(Boolean);
                    const items = validSkus.map((sku, index) => {
                      const product = getMatchedProduct(sku);
                      return {
                        no: (index + 1).toString(),
                        barcode: sku,
                        name: product ? product.name : 'Unknown Product'
                      };
                    });

                    onPublish({
                      barcode: eslBarcode || ('Multi-' + Math.floor(Math.random() * 10000)),
                      model: deviceSize.includes('9.7') ? 'ZKC97B-N' : deviceSize.includes('4.2') ? 'ZKC42B-N' : 'ZKC26B-N',
                      sku: validSkus.join(', ') || 'Multi-SKU',
                      name: `Multi-Ticket (${totalSkus} SKUs)`,
                      price: '-',
                      status: 'Online',
                      isPromo: 'false',
                      lastUpdated: new Date().toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                      items: items.length > 0 ? items : undefined,
                      layout: {
                        columns: skuCount,
                        rows: rowCount,
                        deviceSize: deviceSize
                      }
                    });
                  }
                }}
              >
                {actionText}
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
                  aspectRatio: deviceSize === '9.7 inch' ? '1200/825' : deviceSize === '4.2 inch' ? '400/300' : '296/152',
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
