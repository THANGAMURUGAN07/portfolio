import React from 'react';
import { X, Download } from 'lucide-react';

type Props = {
  resumeUrl: string;
  open: boolean;
  onClose: () => void;
};

export default function ResumeModal({ resumeUrl, open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl w-[92%] md:w-4/5 lg:w-3/4 xl:w-3/5 max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <h3 className="text-lg font-semibold">Resume Preview</h3>
          <div className="flex items-center gap-2">
            <a href={resumeUrl} download className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </a>
            <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-gray-800">
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="h-[80vh] md:h-[80vh] bg-gray-800">
          <iframe
            title="Resume"
            src={resumeUrl}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
