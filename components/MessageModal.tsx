import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../utils/supabaseClient';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  version?: 'v1' | 'v2';
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, version = 'v1' }) => {
  const { content } = useLanguage();
  const formText = content.contact.form;

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isV2 = version === 'v2';
  const focusRingClass = isV2 ? 'focus:ring-cyan-500' : 'focus:ring-indigo-500';
  const buttonClass = isV2 
    ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20' 
    : 'bg-indigo-600 hover:bg-indigo-700';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form after delay when closing
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setName('');
        setContactInfo('');
        setMessage('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!supabase) {
        // Simulation for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.warn('Supabase not configured yet. Data:', { name, contactInfo, message });
        setSubmitStatus('success');
      } else {
        const { error } = await supabase
          .from('messages')
          .insert([
            { name, contact_info: contactInfo, message: message }
          ]);
        
        if (error) throw error;
        setSubmitStatus('success');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md sm:backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg liquid-glass liquid-sheen rounded-3xl shadow-2xl p-6 sm:p-8 animate-fade-in border border-white/70 dark:border-white/15">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full liquid-pill text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all active:scale-90 cursor-pointer touch-manipulation z-20"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {formText.title}
        </h3>

        {submitStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl liquid-pill flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-md">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{formText.success}</h4>
            <button 
              onClick={onClose}
              className="mt-6 px-7 py-2.5 rounded-full liquid-btn text-slate-800 dark:text-slate-200 font-semibold transition-all active:scale-95 cursor-pointer touch-manipulation"
            >
              {formText.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {formText.nameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl liquid-pill focus:ring-2 ${focusRingClass} focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400`}
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {formText.contactLabel}
              </label>
              <input
                type="text"
                id="contact"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl liquid-pill focus:ring-2 ${focusRingClass} focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400`}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {formText.messageLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl liquid-pill focus:ring-2 ${focusRingClass} focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 resize-none`}
              />
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm liquid-pill border-red-300 dark:border-red-800/50 p-3 rounded-xl">
                <AlertCircle size={16} />
                {formText.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 ${isV2 ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20' : 'liquid-btn-primary'} text-white font-bold py-3.5 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl active:scale-95 touch-manipulation cursor-pointer`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {formText.submitting}
                </>
              ) : (
                <>
                  {formText.submit}
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MessageModal;