import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon } from 'lucide-react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TicketOption = 'adhoc' | 'multi' | 'campaign';

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<TicketOption>('adhoc');
  const [targetDeviceSize, setTargetDeviceSize] = useState('2.6" (Small) – 1 Column × 1 Row');

  const handleProceed = () => {
    router.push('/ticket-editor');
    onClose();
  };

  const deviceSizeOptions = [
    '2.6" (Small) – 1 Column × 1 Row',
    '4.2" (Medium) – 1 Column × 1 Row',
    '4.2" (Medium) – 1 Column × 2 Rows',
    '4.2" (Medium) – 2 Columns × 1 Row',
    '4.2" (Medium) – 2 Columns × 2 Rows',
    '9.7" (Large / Multi) – 1 Column × 1 Row',
    '9.7" (Large / Multi) – 1 Column × 2 Rows',
    '9.7" (Large / Multi) – 2 Columns × 1 Row',
    '9.7" (Large / Multi) – 3 Columns × 2 Rows',
  ];

  const getLayoutConfig = () => {
    // If not multi, default to a standard 1x1 2.6" layout for preview, or whichever is sensible
    const sizeString = selectedOption === 'multi' ? targetDeviceSize : '2.6" (Small) – 1 Column × 1 Row';
    
    if (sizeString.includes('2.6')) return { deviceSize: '2.6 inch', cols: 1, rows: 1 };
    if (sizeString.includes('4.2')) {
      if (sizeString.includes('1 Column × 1 Row')) return { deviceSize: '4.2 inch', cols: 1, rows: 1 };
      if (sizeString.includes('1 Column × 2 Rows')) return { deviceSize: '4.2 inch', cols: 1, rows: 2 };
      if (sizeString.includes('2 Columns × 1 Row')) return { deviceSize: '4.2 inch', cols: 2, rows: 1 };
      if (sizeString.includes('2 Columns × 2 Rows')) return { deviceSize: '4.2 inch', cols: 2, rows: 2 };
    }
    if (sizeString.includes('9.7')) {
      if (sizeString.includes('1 Column × 1 Row')) return { deviceSize: '9.7 inch', cols: 1, rows: 1 };
      if (sizeString.includes('1 Column × 2 Rows')) return { deviceSize: '9.7 inch', cols: 1, rows: 2 };
      if (sizeString.includes('2 Columns × 1 Row')) return { deviceSize: '9.7 inch', cols: 2, rows: 1 };
      if (sizeString.includes('3 Columns × 2 Rows')) return { deviceSize: '9.7 inch', cols: 3, rows: 2 };
    }
    return { deviceSize: '2.6 inch', cols: 1, rows: 1 };
  };

  const { deviceSize, cols: skuCount, rows: rowCount } = getLayoutConfig();
  const totalSkus = skuCount * rowCount;

  const renderPreviewSlots = () => {
    const slots = [];
    for (let i = 0; i < totalSkus; i++) {
      slots.push(
        <div 
          key={i} 
          className="flex flex-col justify-center items-center border border-dashed border-gray-300 p-2 relative bg-white rounded shadow-sm overflow-hidden h-full w-full"
        >
          <div className="text-center text-gray-400">
            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 opacity-50" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-ticketit-navy">Slot {i + 1}</div>
            <div className="text-[9px] mt-0.5">Awaiting SKU</div>
          </div>
        </div>
      );
    }
    return slots;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Ticket"
      maxWidth="5xl"
      headerColor="navy"
    >
      <div className="flex h-[500px] -mx-6 -my-5 bg-white">
        {/* Left Column: Configuration */}
        <div className="w-1/2 p-6 border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="text-sm text-gray-600 mb-4">
            Select the type of ticket you want to create:
          </div>

          {/* Radio Options */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Adhoc Ticket */}
            <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-md transition-colors ${selectedOption === 'adhoc' ? 'border-ticketit-pink bg-pink-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="pt-0.5">
                <input
                  type="radio"
                  name="ticketType"
                  value="adhoc"
                  checked={selectedOption === 'adhoc'}
                  onChange={() => setSelectedOption('adhoc')}
                  className="w-4 h-4 text-ticketit-pink focus:ring-ticketit-pink border-gray-300"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-ticketit-navy">Create Adhoc Ticket</div>
                <div className="text-xs text-gray-500 mt-1">Create a single standalone ticket.</div>
              </div>
            </label>

            {/* Multi-ESL Ticket */}
            <div className="flex flex-col gap-2">
              <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-md transition-colors ${selectedOption === 'multi' ? 'border-ticketit-pink bg-pink-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="pt-0.5">
                  <input
                    type="radio"
                    name="ticketType"
                    value="multi"
                    checked={selectedOption === 'multi'}
                    onChange={() => setSelectedOption('multi')}
                    className="w-4 h-4 text-ticketit-pink focus:ring-ticketit-pink border-gray-300"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-ticketit-navy">Create Multi-ESL Ticket</div>
                  <div className="text-xs text-gray-500 mt-1">Create a ticket spanning multiple ESL devices.</div>
                </div>
              </label>

              {/* Expanded Dropdown for Multi-ESL */}
              {selectedOption === 'multi' && (
                <div className="w-full border border-gray-200 bg-gray-50 rounded-md p-3 animate-in slide-in-from-top-2 fade-in duration-200">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Target Device Size
                  </label>
                  <select
                    value={targetDeviceSize}
                    onChange={(e) => setTargetDeviceSize(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-md shadow-sm focus:border-ticketit-pink focus:ring focus:ring-ticketit-pink focus:ring-opacity-50 py-2 pl-3 pr-8 bg-white"
                  >
                    {deviceSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Campaign Ticket */}
            <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-md transition-colors ${selectedOption === 'campaign' ? 'border-ticketit-pink bg-pink-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="pt-0.5">
                <input
                  type="radio"
                  name="ticketType"
                  value="campaign"
                  checked={selectedOption === 'campaign'}
                  onChange={() => setSelectedOption('campaign')}
                  className="w-4 h-4 text-ticketit-pink focus:ring-ticketit-pink border-gray-300"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-ticketit-navy">Create Campaign Ticket</div>
                <div className="text-xs text-gray-500 mt-1">Create a ticket as part of a campaign.</div>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="pink" onClick={handleProceed}>
              Proceed
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
              {deviceSize} • {skuCount} Col{skuCount > 1 ? 's' : ''} × {rowCount} Row{rowCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Background grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* The ESL Label Container */}
            <div className="w-[95%] max-w-[360px] mx-auto flex items-center justify-center relative z-10">
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
