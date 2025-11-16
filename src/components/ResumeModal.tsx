import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';

type Props = {
  resumeUrl: string;
  open: boolean;
  onClose: () => void;
};

export default function ResumeModal({ resumeUrl, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-900 rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-3 border-b border-gray-800 sticky top-0 z-10 bg-gray-900/95 backdrop-blur">
          <h3 className="text-base md:text-lg font-semibold">Resume Preview</h3>
          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              download
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded-md text-white/90"
            >
              Open in New Tab
            </a>
            <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-gray-800">
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="h-[75vh] md:h-[80vh] bg-gray-800 overflow-auto">
          <iframe
            title="Resume"
            src={resumeUrl}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
