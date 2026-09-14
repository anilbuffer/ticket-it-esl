import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssignESLModalProps {
  isOpen: boolean;
  onClose: () => void;
  eslBarcode?: string;
}

export const AssignESLModal: React.FC<AssignESLModalProps> = ({
  isOpen,
  onClose,
  eslBarcode = ''
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign ESL"
      maxWidth="xl"
      headerColor="navy"
    >
      <div className="space-y-6 pt-2 pb-4">
        {/* ESL Barcode */}
        {eslBarcode && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ESL Barcode
            </label>
            <div className="w-full bg-gray-100 border border-gray-200 rounded p-3 text-sm text-gray-600 font-medium">
              {eslBarcode}
            </div>
          </div>
        )}

        {/* Add SKU / Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add SKU / Product Name
          </label>
          <input 
            type="text" 
            placeholder="Type and press Enter" 
            className="w-full border border-gray-300 rounded p-3 text-sm focus:border-ticketit-pink focus:outline-none"
          />
        </div>

        {/* Find Button */}
        <div>
          <button className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#F25555] text-white px-5 py-2.5 rounded font-semibold text-sm transition-colors shadow-sm">
            <Search className="w-4 h-4 font-bold" />
            Find
          </button>
        </div>
      </div>
    </Modal>
  );
};
