import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ id, title, children, onClose, activeModal }) => {
  if (activeModal !== id) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:scale-110 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;