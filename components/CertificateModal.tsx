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
  const [enableTransition, setEnableTransition] = useState(false);
  const [imgErrorFront, setImgErrorFront] = useState(false);
  const [imgErrorBack, setImgErrorBack] = useState(false);

  // Reset flip state instantly on open without transition animation & lock body scroll
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      setIsFlipped(false);
      setEnableTransition(false);
      setImgErrorFront(false);
      setImgErrorBack(false);

      // Enable smooth transition AFTER initial front side render
      const timer = setTimeout(() => {
        setEnableTransition(true);
      }, 60);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    } else {
      setIsFlipped(false);
      setEnableTransition(false);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md sm:backdrop-blur-xl animate-fade-in select-none"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Outer Wrapper for frame + outside buttons, centered relative to screen */}
      <div 
        className="relative w-[86vw] max-w-[400px] max-h-[72vh] h-auto sm:w-auto sm:h-[88vh] sm:max-h-[88vh] sm:max-w-[80vw] flex items-center justify-center"
        style={{ aspectRatio: '210 / 297', perspective: '1200px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Action Buttons: Floating outside top-right corner */}
        <div className="hidden sm:flex absolute left-[calc(100%+14px)] top-0 flex-col gap-3.5 z-30">
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full liquid-pill text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-11 h-11 rounded-full liquid-pill text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Flip"
          >
            <RefreshCw 
              size={18} 
              className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Mobile Action Buttons: Minimalist Gray Circle Icons inside top-right corner */}
        <div className="flex sm:hidden absolute top-3 right-3 flex-col gap-2.5 z-30 pointer-events-auto">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full liquid-pill text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg touch-manipulation"
            aria-label="Close"
          >
            <X size={17} />
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-9 h-9 rounded-full liquid-pill text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg touch-manipulation"
            aria-label="Flip"
          >
            <RefreshCw 
              size={16} 
              className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Certificate Frame Box with Liquid Glass Frame */}
        <div className="w-full h-full liquid-glass p-1.5 sm:p-2 rounded-2xl shadow-2xl border border-white/50 dark:border-white/10">
          {/* 3D Flipping Card Container */}
          <div 
            className={`w-full h-full relative ${
              enableTransition ? 'transition-transform duration-700 ease-in-out' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              willChange: 'transform',
            }}
          >
            {/* Front Image Side (F image - rotateY 0deg) */}
            <div 
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              {/* Transparent protective overlay blocking right-click and long-press image popup */}
              <div 
                className="absolute inset-0 z-10 bg-transparent select-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />

              {!imgErrorFront ? (
                <img
                  src={frontImg}
                  alt="Certificate Front"
                  className="w-full h-full object-contain rounded-lg select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onError={() => setImgErrorFront(true)}
                  onLoad={(e) => {
                    if (e.currentTarget.naturalWidth === 0) setImgErrorFront(true);
                  }}
                  style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                  <FileText size={48} className="opacity-40 mb-2" />
                  <span className="text-xs font-mono text-slate-500">{frontImg}</span>
                </div>
              )}
            </div>

            {/* Back Image Side (B image - rotateY 180deg) */}
            <div 
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Transparent protective overlay blocking right-click and long-press image popup */}
              <div 
                className="absolute inset-0 z-10 bg-transparent select-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />

              {!imgErrorBack ? (
                <img
                  src={backImg}
                  alt="Certificate Back"
                  className="w-full h-full object-contain rounded-lg select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onError={() => setImgErrorBack(true)}
                  onLoad={(e) => {
                    if (e.currentTarget.naturalWidth === 0) setImgErrorBack(true);
                  }}
                  style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
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
  );
};

export default CertificateModal;
