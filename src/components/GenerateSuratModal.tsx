// GenerateSuratModal.tsx - AI-powered Letter Generator Component
// This component uses Google Generative AI to generate official letters
// Komponen ini menggunakan Google Generative AI untuk menghasilkan surat resmi

import React, { useState } from 'react';
import { X, Sparkles, Loader2, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// Note: Install @google/genai with: npm install @google/genai
// import { GoogleGenAI } from '@google/genai';
// import { useData } from '../store/DataContext';

interface GenerateSuratModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GenerateSuratModal({ isOpen, onClose }: GenerateSuratModalProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // TODO: Implement Google Generative AI integration
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    // const ai = new GoogleGenAI({ apiKey });
    
    setTimeout(() => {
      setGeneratedHtml('<p>Sample generated letter content here...</p>');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 uppercase tracking-tight">AI Surat Generator</h2>
                <p className="text-xs text-slate-500">Buat surat otomatis dengan AI</p>
              </div>
            </div>

            {!generatedHtml ? (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">
                  Deskripsikan surat yang ingin dibuat:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Contoh: Buatkan surat keterangan aktif organisasi untuk mahasiswa..."
                  className="w-full h-40 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-purple-500 resize-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black uppercase text-xs hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate Surat</>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-end gap-2 mb-4">
                  <button
                    onClick={() => setGeneratedHtml('')}
                    className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200"
                  >
                    Buat Ulang
                  </button>
                  <button
                    className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:opacity-90 flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" /> Cetak / PDF
                  </button>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8">
                  <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* 
FULL IMPLEMENTATION NOTES:
1. Install required packages:
   npm install @google/genai lucide-react framer-motion

2. Add VITE_GEMINI_API_KEY to your .env file:
   VITE_GEMINI_API_KEY=your_api_key_here

3. Replace handleGenerate function with actual Google GenAI implementation
4. Add print functionality with proper letter formatting
5. Integrate with your DataContext for settings (kopSuratUrl, tandaTanganUrl, stempelUrl)
*/
