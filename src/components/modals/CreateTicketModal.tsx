import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

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
    // Navigate directly to ticket editor. 
    // In a real application, you might pass selectedOption and targetDeviceSize as query params.
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Ticket"
      maxWidth="md"
      headerColor="navy"
    >
      <div className="flex flex-col gap-4">
        <div className="text-sm text-gray-600 mb-2">
          Select the type of ticket you want to create:
        </div>

        {/* Radio Options */}
        <div className="flex flex-col gap-3">
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
    </Modal>
  );
};
