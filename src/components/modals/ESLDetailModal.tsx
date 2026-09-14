import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { BatteryFull, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const availableProducts = [
  { id: 1, name: 'Tarsier Pink Gin', size: '700ml', price: '68.99', sku: '13415' },
  { id: 2, name: 'C/Dra Can 6pk', size: '330ml', price: '12.50', sku: '16232' },
  { id: 3, name: 'H/Raiser 8% 24Pk', size: '330ml', price: '45.00', sku: '6751' },
  { id: 4, name: 'Smirn DB Sgl', size: '250ml', price: '10.00', sku: '7210' },
  { id: 5, name: 'FSG PN Gin', size: '750ml', price: '59.99', sku: '13754' },
];

interface ESLDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  eslData?: any; // We can type this better later if needed
}

export const ESLDetailModal: React.FC<ESLDetailModalProps> = ({
  isOpen,
  onClose,
  eslData
}) => {
  // Using dummy data based on the screenshot, but allowing overrides via props
  const data = eslData || {
    barcode: '8467939B6',
    model: 'ZKC42B-N',
    shelfNo: '',
    softVersion: '2.2.56',
    lastUpdated: '2026-09-14 07:03:20',
    size: '4.2',
    turnOver: '0',
    type: '1',
    batteryLevel: '100%',
    items: [
      { no: '1', barcode: '134158467939B6', name: '' }
    ]
  };

  const renderMultiPreview = () => {
    if (!data.layout) return null;
    const { columns, rows, deviceSize } = data.layout;
    const totalSlots = columns * rows;
    const slots = [];
    
    for (let i = 0; i < totalSlots; i++) {
      const item = data.items[i];
      let product = null;
      if (item && item.barcode) {
        product = availableProducts.find(p => p.sku.toLowerCase() === item.barcode.toLowerCase()) || {
          name: item.name || 'Unknown Product',
          size: 'N/A',
          price: '0.00',
          sku: item.barcode
        };
      }

      slots.push(
        <div 
          key={i} 
          className="flex flex-col justify-center items-center border border-dashed border-gray-300 p-2 relative bg-white rounded shadow-sm overflow-hidden h-full w-full"
        >
          {product ? (
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="text-[9px] text-gray-500 font-semibold mb-0.5 uppercase tracking-wider">{product.sku}</div>
                <div className="font-bold text-gray-900 leading-tight text-[10px] sm:text-xs line-clamp-2">{product.name}</div>
                <div className="text-[9px] text-gray-500 mt-0.5">{product.size}</div>
              </div>
              <div className="mt-auto pt-1 flex items-baseline">
                <span className="text-ticketit-pink font-bold text-[10px] mr-0.5">$</span>
                <span className="text-ticketit-pink font-black text-sm sm:text-base leading-none">
                  {product.price.split('.')[0]}
                </span>
                <span className="text-ticketit-pink font-bold text-[10px] ml-0.5">
                  .{product.price.split('.')[1] || '00'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon className="w-4 h-4 mx-auto mb-1 opacity-50" />
              <div className="text-[9px] font-bold uppercase tracking-widest">Slot {i + 1}</div>
              <div className="text-[8px] mt-0.5">Empty</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        className="w-full bg-white p-2 shadow-sm grid border-[4px] border-gray-800 rounded gap-1 mx-auto"
        style={{
          aspectRatio: deviceSize === '7.5 inch' ? '800/480' : deviceSize === '4.2 inch' ? '400/300' : '296/128',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {slots}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ESL Detail"
      maxWidth="3xl"
      headerColor="navy"
    >
      <div className="space-y-8 py-2">
        {/* Base Information */}
        <section>
          <h3 className="text-lg font-bold text-ticketit-navy mb-3 pb-2 border-b border-gray-200">
            Base Information
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div className="space-y-4">
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">ESL Barcode :</span>
                <span className="text-gray-700">{data.barcode}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Model :</span>
                <span className="text-gray-700">{data.model}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Shelf No :</span>
                <span className="text-gray-700">{data.shelfNo}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Soft Version :</span>
                <span className="text-gray-700">{data.softVersion}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Last Updated Time :</span>
                <span className="text-gray-700 whitespace-pre-wrap">{data.lastUpdated.replace(' ', '\n')}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Size :</span>
                <span className="text-gray-700">{data.size}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">TurnOver :</span>
                <span className="text-gray-700">{data.turnOver}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-start">
                <span className="font-bold text-gray-800">Type :</span>
                <span className="text-gray-700">{data.type}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <span className="font-bold text-gray-800">Battery Level :</span>
                <span className="text-gray-700 flex items-center gap-2">
                  {data.batteryLevel}
                  <BatteryFull className="w-5 h-5 text-green-500" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Item Information */}
        <section>
          <h3 className="text-lg font-bold text-ticketit-navy mb-3 pb-2 border-b border-gray-200">
            Item Information
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#eef2f6] text-ticketit-navy font-bold">
                <tr>
                  <th className="px-4 py-3 w-16">No.</th>
                  <th className="px-4 py-3">Item Barcode</th>
                  <th className="px-4 py-3">Item Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.items.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{item.no}</td>
                    <td className="px-4 py-3 text-gray-700">{item.barcode}</td>
                    <td className="px-4 py-3 text-gray-700">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ESL Information */}
        <section>
          <h3 className="text-lg font-bold text-ticketit-navy mb-4 pb-2 border-b border-gray-200">
            ESL Information
          </h3>
          <div className="flex justify-center bg-gray-50 py-6 px-4 rounded-lg border border-gray-100 min-h-[300px] items-center">
            {data.layout ? (
              <div className="w-full max-w-[460px]">
                {renderMultiPreview()}
              </div>
            ) : (
              <div className="relative w-[300px] h-[300px] shadow-sm">
                <Image 
                  src="/images/esl_preview.jpg" 
                  alt="ESL Tag Preview" 
                  fill 
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
};
