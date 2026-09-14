import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Search, Monitor, LayoutTemplate, PackageOpen, Image as ImageIcon, ChevronRight, GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MultiESLModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MultiESLModal: React.FC<MultiESLModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState('7.5 inch');
  const [selectedLayout, setSelectedLayout] = useState('layout1');
  const [heroText, setHeroText] = useState('TOP DROPS');
  
  // Dummy data for products
  const availableProducts = [
    { id: 1, name: 'Tarsier Pink Gin', size: '700ml', price: '68.99', barcode: '8467939B6' },
    { id: 2, name: 'C/Dra Can 6pk', size: '330ml', price: '12.50', barcode: '847194950' },
    { id: 3, name: 'H/Raiser 8% 24Pk', size: '330ml', price: '45.00', barcode: '873373517' },
  ];

  const [slots, setSlots] = useState([
    { id: 'slot1', product: availableProducts[0] },
    { id: 'slot2', product: null },
  ]);

  const STEPS = [
    { id: 1, title: 'Output & Layout', icon: <Monitor className="w-4 h-4" /> },
    { id: 2, title: 'Products & Slots', icon: <PackageOpen className="w-4 h-4" /> },
    { id: 3, title: 'Templates & Hero', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Product Ticket Composer" maxWidth="6xl">
      <div className="flex h-[700px] -mx-6 -my-5 bg-gray-50">
        
        {/* Left Panel - Stepper Navigation */}
        <div className="w-64 bg-white border-r border-ticketit-border flex flex-col">
          <div className="p-4 border-b border-ticketit-border bg-gray-50">
            <h3 className="font-extrabold text-ticketit-navy uppercase text-sm tracking-wider">Configuration Steps</h3>
          </div>
          <div className="flex-1 py-4">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center px-6 py-4 border-l-4 transition-colors text-left ${
                  activeStep === step.id
                    ? 'border-ticketit-pink bg-pink-50/50'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                  activeStep === step.id ? 'bg-ticketit-pink text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-xs font-bold uppercase tracking-wider ${
                    activeStep === step.id ? 'text-ticketit-pink' : 'text-gray-500'
                  }`}>
                    Step {index + 1}
                  </div>
                  <div className={`text-sm font-semibold ${
                    activeStep === step.id ? 'text-ticketit-navy' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${
                  activeStep === step.id ? 'text-ticketit-pink' : 'text-gray-300'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Panel - Step Content */}
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-ticketit-navy mb-6">
              {STEPS.find(s => s.id === activeStep)?.title}
            </h2>

            {/* STEP 1: OUTPUT & LAYOUT */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Target Device Size
                  </label>
                  <select 
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none"
                  >
                    <option value="2.9 inch">2.9 inch (Small)</option>
                    <option value="4.2 inch">4.2 inch (Medium)</option>
                    <option value="7.5 inch">7.5 inch (Large/Multi)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Compatible Layouts
                    </label>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">Auto-suggested</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setSelectedLayout('layout1')}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedLayout === 'layout1' ? 'border-ticketit-pink bg-pink-50' : 'border-gray-200 hover:border-ticketit-pink/50'
                      }`}
                    >
                      <LayoutTemplate className={`w-8 h-8 mb-2 ${selectedLayout === 'layout1' ? 'text-ticketit-pink' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-ticketit-navy text-sm">Top Drops 2-Slot</h4>
                      <p className="text-xs text-gray-500 mt-1">Hero banner with 2 product slots arranged vertically.</p>
                    </div>
                    <div 
                      onClick={() => setSelectedLayout('layout2')}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedLayout === 'layout2' ? 'border-ticketit-pink bg-pink-50' : 'border-gray-200 hover:border-ticketit-pink/50'
                      }`}
                    >
                      <LayoutTemplate className={`w-8 h-8 mb-2 ${selectedLayout === 'layout2' ? 'text-ticketit-pink' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-ticketit-navy text-sm">Grid 4-Slot</h4>
                      <p className="text-xs text-gray-500 mt-1">Standard 2x2 grid for up to 4 products without hero banner.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PRODUCTS & SLOTS */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Add Products
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input type="text" className="w-full border border-gray-300 rounded p-2 pl-8 text-sm focus:border-ticketit-pink focus:outline-none" placeholder="Scan Barcode or Search SKU..." />
                      <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" />
                    </div>
                    <Button variant="coral" icon={<Plus className="w-4 h-4" />}>Add</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                    Arrange Slots
                  </label>
                  <div className="space-y-3">
                    {slots.map((slot, idx) => (
                      <div key={slot.id} className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-lg">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                        <div className="w-16 h-16 bg-gray-200 rounded flex flex-col items-center justify-center text-gray-500 font-bold border border-gray-300">
                          <span className="text-xs font-normal">Slot</span>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          {slot.product ? (
                            <div className="bg-white border border-gray-200 rounded p-2.5 shadow-sm space-y-2 relative group">
                              <button 
                                onClick={() => {
                                  const newSlots = [...slots];
                                  newSlots[idx].product = null;
                                  setSlots(newSlots);
                                }}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs shadow-sm hover:bg-red-500 hover:text-white"
                                title="Remove product"
                              >
                                ✕
                              </button>
                              <input 
                                type="text" 
                                value={slot.product.name} 
                                onChange={(e) => {
                                  const newSlots = [...slots];
                                  if (newSlots[idx].product) {
                                    newSlots[idx].product = { ...newSlots[idx].product, name: e.target.value };
                                  }
                                  setSlots(newSlots);
                                }}
                                className="w-full text-sm font-bold text-ticketit-navy border-b border-dashed border-gray-300 focus:outline-none focus:border-ticketit-pink bg-transparent"
                              />
                              <div className="flex gap-2 items-end">
                                <input 
                                  type="text" 
                                  value={slot.product.size}
                                  onChange={(e) => {
                                    const newSlots = [...slots];
                                    if (newSlots[idx].product) {
                                      newSlots[idx].product = { ...newSlots[idx].product, size: e.target.value };
                                    }
                                    setSlots(newSlots);
                                  }}
                                  className="w-1/2 text-xs text-gray-500 border-b border-dashed border-gray-300 focus:outline-none focus:border-ticketit-pink bg-transparent pb-0.5"
                                />
                                <div className="flex w-1/2 items-center border-b border-dashed border-gray-300 focus-within:border-ticketit-pink">
                                  <span className="text-sm font-black text-ticketit-pink mr-1">$</span>
                                  <input 
                                    type="text" 
                                    value={slot.product.price}
                                    onChange={(e) => {
                                      const newSlots = [...slots];
                                      if (newSlots[idx].product) {
                                        newSlots[idx].product = { ...newSlots[idx].product, price: e.target.value };
                                      }
                                      setSlots(newSlots);
                                    }}
                                    className="w-full text-sm font-black text-ticketit-pink focus:outline-none bg-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <select 
                              className="w-full border border-dashed border-gray-300 rounded p-3 text-sm text-gray-500 bg-transparent focus:outline-none focus:border-ticketit-pink hover:border-ticketit-pink cursor-pointer"
                              onChange={(e) => {
                                const val = e.target.value;
                                if (!val) return;
                                const prod = availableProducts.find(p => p.id === parseInt(val));
                                if (prod) {
                                  const newSlots = [...slots];
                                  newSlots[idx].product = { ...prod }; // Clone so we can edit safely
                                  setSlots(newSlots);
                                }
                              }}
                              value=""
                            >
                              <option value="">Select a product to assign...</option>
                              {availableProducts.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: TEMPLATES & HERO */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Product Templates
                  </label>
                  <select className="w-full border border-gray-300 rounded p-2.5 text-sm focus:border-ticketit-pink focus:outline-none">
                    <option>Standard Price Emphasis</option>
                    <option>Promotional Tag (Savings)</option>
                    <option>Minimalist Data</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                    Hero Content Configuration
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Banner Text (Hero Slot 1)</label>
                      <input 
                        type="text" 
                        value={heroText}
                        onChange={(e) => setHeroText(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:border-ticketit-pink focus:outline-none uppercase" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Badge Style</label>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 border-2 border-ticketit-pink bg-pink-50 text-ticketit-pink font-bold rounded text-sm">
                          Red Wax Seal
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-600 font-bold rounded text-sm hover:bg-gray-50">
                          Yellow Starburst
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-[450px] bg-[#E7EAEF] border-l border-ticketit-border flex flex-col relative z-0">
          <div className="p-4 border-b border-ticketit-border bg-white flex justify-between items-center z-10">
            <h3 className="font-extrabold text-ticketit-navy uppercase text-sm tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4" /> Live Preview
            </h3>
            <span className="text-xs text-gray-500 font-semibold">{selectedDevice}</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-hidden relative z-0">
            
            {/* Background grid for context */}
            <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Ticket Container - Scaled to fit */}
            <div className="relative z-10 scale-[0.8] origin-center transition-all duration-300">
              
              {/* The Landscape Label Rotated to Portrait visually */}
              <div className="w-[380px] h-[250px] bg-black p-3.5 flex flex-col relative rotate-90 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* Top strip (Visually the Right strip in portrait) */}
                <div className="h-[65px] flex items-center justify-start pl-8 border-b-2 border-transparent">
                  <span className="text-white font-black text-5xl tracking-[0.15em] font-sans uppercase">
                    {heroText || 'BANNER TEXT'}
                  </span>
                </div>
                
                {/* White box - Slots container */}
                <div className="bg-white flex-1 mt-1 mb-2 mx-1 p-2 flex flex-col relative rounded-sm gap-2">
                  
                  {/* Slot 1 Render */}
                  <div className="flex-1 flex items-center px-4 border border-dashed border-transparent hover:border-gray-300 transition-colors relative group">
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                    {slots[0].product ? (
                      <>
                        <div className="flex flex-col gap-1 w-[55%] relative z-10">
                          <span className="text-black font-black text-3xl leading-[1.1] tracking-tight">{slots[0].product.name}</span>
                          <span className="text-black font-bold text-xl leading-none mt-1">{slots[0].product.size}</span>
                        </div>
                        <div className="ml-auto flex items-start -mt-4 relative z-10">
                          <span className="text-black font-bold text-[2rem] mt-4 mr-0.5">$</span>
                          <span className="text-black font-black text-[6.5rem] leading-[0.8] tracking-tighter">{slots[0].product.price.split('.')[0] || '0'}</span>
                          <span className="text-black font-bold text-4xl leading-none mt-2 ml-0.5">{slots[0].product.price.split('.')[1] || '00'}</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full text-center text-gray-300 font-black text-3xl tracking-widest uppercase">EMPTY SLOT</div>
                    )}
                  </div>
                  
                  {/* Slot 2 Render (if applicable for layout) */}
                  {selectedLayout === 'layout1' && (
                    <div className="flex-1 flex items-center px-4 border-t border-dashed border-gray-200 bg-gray-50/50">
                      {slots[1].product ? (
                        <>
                          <div className="flex flex-col gap-1 w-[55%] relative z-10">
                            <span className="text-black font-black text-3xl leading-[1.1] tracking-tight">{slots[1].product.name}</span>
                            <span className="text-black font-bold text-xl leading-none mt-1">{slots[1].product.size}</span>
                          </div>
                          <div className="ml-auto flex items-start -mt-4 relative z-10">
                            <span className="text-black font-bold text-[2rem] mt-4 mr-0.5">$</span>
                            <span className="text-black font-black text-[6.5rem] leading-[0.8] tracking-tighter">{slots[1].product.price.split('.')[0] || '0'}</span>
                            <span className="text-black font-bold text-4xl leading-none mt-2 ml-0.5">{slots[1].product.price.split('.')[1] || '00'}</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full text-center text-gray-300 font-black text-3xl tracking-widest uppercase">EMPTY SLOT</div>
                      )}
                    </div>
                  )}

                </div>
                
                {/* Red Seal */}
                <div className="absolute -bottom-8 -left-8 w-[120px] h-[120px] bg-[#E60000] rounded-full flex flex-col items-center justify-center shadow-xl z-20 border-[6px] border-dashed border-[#FF3333]"
                     style={{ clipPath: 'polygon(50% 0%, 61% 5%, 72% 2%, 81% 10%, 91% 11%, 97% 20%, 100% 30%, 98% 41%, 100% 50%, 98% 59%, 100% 70%, 97% 80%, 91% 89%, 81% 90%, 72% 98%, 61% 95%, 50% 100%, 39% 95%, 28% 98%, 19% 90%, 9% 89%, 3% 80%, 0% 70%, 2% 59%, 0% 50%, 2% 41%, 0% 30%, 3% 20%, 9% 11%, 19% 10%, 28% 2%, 39% 5%)' }}>
                  
                  {/* Rotate back to upright in portrait */}
                  <div className="-rotate-90 flex flex-col items-center justify-center w-full h-full text-white">
                    <svg className="w-10 h-10 mb-1 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="font-black text-sm tracking-widest leading-none">TOP</span>
                    <span className="font-black text-sm tracking-widest leading-none mt-1">DROPS</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-ticketit-border bg-white flex justify-end gap-3 relative z-10">
            <button className="px-6 py-2.5 rounded font-bold text-ticketit-navy border border-gray-300 hover:bg-gray-50 transition-colors text-sm shadow-sm">
              Save Draft
            </button>
            <button className="px-6 py-2.5 rounded font-bold bg-ticketit-green text-white hover:bg-opacity-90 shadow-sm transition-colors text-sm">
              Assign & Publish
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Quick helper component for missing icon
const Eye = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
