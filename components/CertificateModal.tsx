import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, ZoomIn, FileText, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  frontImg: string;
  backImg: string;
  flipBtnText?: string;
  closeBtnText?: string;
  version?: 'v1' | 'v2';
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  frontImg,
  backImg,
  flipBtnText = "翻面",
  closeBtnText = "关闭",
  version = 'v1',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, px: 0, py: 0 });
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset flip state when modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      setIsHovering(false);
      setImgError(false);
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

  const currentImg = isFlipped ? backImg : frontImg;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.max(0, Math.min(100, (px / rect.width) * 100));
    const y = Math.max(0, Math.min(100, (py / rect.height) * 100));
    setMousePos({ x, y, px, py });
  };

  const isV2 = version === 'v2';
  const primaryColorClass = isV2 ? 'cyan' : 'indigo';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isV2 ? 'bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400' : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'}`}>
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {title}
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {isFlipped ? '背面 (Back)' : '正面 (Front)'}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Flip Button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                isV2 
                  ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-cyan-200 dark:border-cyan-800' 
                  : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800'
              }`}
              title={flipBtnText}
            >
              <RefreshCw size={16} className={`transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
              <span>{flipBtnText}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body / Image Container */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-y-auto">
          {/* Hint instruction */}
          <div className="mb-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <ZoomIn size={14} className={isV2 ? 'text-cyan-500' : 'text-indigo-500'} />
            <span>鼠标悬停在图片上可使用方形放大镜查看细节</span>
          </div>

          {/* 3D Card Container */}
          <div 
            className="w-full flex justify-center max-w-md sm:max-w-lg"
            style={{ perspective: '1000px' }}
          >
            <div 
              className="relative w-full aspect-[210/297] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-transform duration-700 select-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Image Container with Square Magnifier Lens */}
              <div
                ref={containerRef}
                className="relative w-full h-full cursor-crosshair overflow-hidden group"
                style={{
                  transform: isFlipped ? 'scaleX(-1)' : 'none', // correct image orientation when flipped
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
              >
                {!imgError ? (
                  <img
                    src={currentImg}
                    alt={title}
                    className="w-full h-full object-contain pointer-events-none"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                    <FileText size={48} className="mb-3 opacity-40" />
                    <p className="font-medium text-sm text-slate-600 dark:text-slate-300 mb-1">
                      {isFlipped ? '背面图片准备中' : '正面图片准备中'}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {currentImg}
                    </p>
                  </div>
                )}

                {/* Square Magnifier Lens */}
                {isHovering && !imgError && (
                  <div
                    className={`absolute pointer-events-none z-30 w-36 h-36 border-2 ${
                      isV2 ? 'border-cyan-500 shadow-cyan-500/30' : 'border-indigo-500 shadow-indigo-500/30'
                    } rounded-lg shadow-2xl bg-white dark:bg-slate-900 overflow-hidden`}
                    style={{
                      left: `${mousePos.px - 72}px`,
                      top: `${mousePos.py - 72}px`,
                      backgroundImage: `url("${currentImg}")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${280}% ${280}%`,
                      backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    }}
                  >
                    {/* Reticle grid or corner accents */}
                    <div className="absolute inset-0 border border-white/20 pointer-events-none"></div>
                    <div className={`absolute top-1 left-1 text-[9px] font-mono font-bold px-1 rounded bg-black/60 text-white`}>
                      2.8x
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={14} />
            <span>切换{isFlipped ? '正面' : '背面'}</span>
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-sm font-bold text-white transition-all shadow-md ${
              isV2 
                ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/20' 
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
            }`}
          >
            {closeBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
