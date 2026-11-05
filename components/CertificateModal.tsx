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

  const handleClose = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const handleFlip = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFlipped(prev => !prev);
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center pt-14 pb-4 px-3 sm:p-6 bg-black/85 animate-fade-in select-none"
      onClick={handleClose}
      onTouchEnd={(e) => {
        if (e.target === e.currentTarget) {
          handleClose(e);
        }
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Outer Wrapper for frame + outside buttons, centered relative to screen */}
      <div 
        className="relative w-[86vw] max-w-[400px] max-h-[72vh] h-auto sm:w-auto sm:h-[86vh] sm:max-h-[86vh] sm:max-w-[78vw] flex items-center justify-center"
        style={{ aspectRatio: '210 / 297', perspective: '1200px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flip Button: Outside Top-Left Corner */}
        <button
          onClick={handleFlip}
          onTouchEnd={handleFlip}
          className="absolute -top-12 sm:-top-13 left-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border border-white/30 touch-manipulation z-50 pointer-events-auto"
          aria-label="Flip"
        >
          <RefreshCw 
            size={18} 
            className={`transition-transform duration-700 ${isFlipped ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Close Button: Outside Top-Right Corner */}
        <button
          onClick={handleClose}
          onTouchEnd={handleClose}
          className="absolute -top-12 sm:-top-13 right-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border border-white/30 touch-manipulation z-50 pointer-events-auto"
          aria-label="Close"
        >
          <X size={20} />
        </button>

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
                  decoding="async"
                  loading="eager"
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
                  decoding="async"
                  loading="eager"
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
