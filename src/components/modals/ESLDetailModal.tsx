import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { BatteryFull } from 'lucide-react';
import Image from 'next/image';

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
          <div className="flex justify-center bg-gray-50 py-6 rounded-lg border border-gray-100">
            <div className="relative w-[300px] h-[300px] shadow-sm">
              <Image 
                src="/images/esl_preview.jpg" 
                alt="ESL Tag Preview" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};
