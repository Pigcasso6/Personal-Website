import React, { useState, useEffect } from 'react';
import { X, RefreshCw, FileText } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  frontImg: string;
  backImg: string;
  flipBtnText?: string;
  closeBtnText?: string;
  version?: 'v1' | 'v2';
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  frontImg,
  backImg,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgErrorFront, setImgErrorFront] = useState(false);
  const [imgErrorBack, setImgErrorBack] = useState(false);

  // Reset flip state when modal opens or images change
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      setImgErrorFront(false);
      setImgErrorBack(false);
    }
  }, [isOpen, frontImg, backImg]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Outer Wrapper for frame + outside buttons, centered relative to screen */}
      <div 
        className="relative max-h-[88vh] max-w-[90vw] sm:max-w-[80vw] h-[88vh] flex items-center justify-center"
        style={{ aspectRatio: '210 / 297' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Action Buttons: Floating outside top-right corner */}
        <div className="hidden sm:flex absolute left-[calc(100%+14px)] top-0 flex-col gap-3 z-30">
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 hover:scale-110 active:scale-95"
            title="Close"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 hover:scale-110 active:scale-95"
            title="Flip"
            aria-label="Flip"
          >
            <RefreshCw 
              size={18} 
              className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Mobile Action Buttons: Minimalist Gray Circle Icons inside top-right corner */}
        <div className="flex sm:hidden absolute top-2.5 right-2.5 flex-col gap-2 z-30">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            title="Close"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-8 h-8 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            title="Flip"
            aria-label="Flip"
          >
            <RefreshCw 
              size={15} 
              className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Certificate Frame Box with Narrow Border */}
        <div className="w-full h-full bg-white dark:bg-slate-900 p-1 sm:p-1.5 rounded-xl shadow-2xl border border-slate-200/30 dark:border-slate-800/80 overflow-hidden">
          {/* 3D Flipping Card Container */}
          <div 
            className="w-full h-full relative"
            style={{ perspective: '1200px' }}
          >
            <div 
              className="w-full h-full relative transition-transform duration-700 ease-in-out rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Image Side */}
              <div 
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {!imgErrorFront ? (
                  <img
                    src={frontImg}
                    alt="Certificate Front"
                    className="w-full h-full object-contain rounded-lg select-none"
                    onError={() => setImgErrorFront(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                    <FileText size={48} className="opacity-40 mb-2" />
                    <span className="text-xs font-mono text-slate-500">{frontImg}</span>
                  </div>
                )}
              </div>

              {/* Back Image Side */}
              <div 
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {!imgErrorBack ? (
                  <img
                    src={backImg}
                    alt="Certificate Back"
                    className="w-full h-full object-contain rounded-lg select-none"
                    onError={() => setImgErrorBack(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                    <FileText size={48} className="opacity-40 mb-2" />
                    <span className="text-xs font-mono text-slate-500">{backImg}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
