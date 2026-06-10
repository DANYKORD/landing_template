import React, { useEffect } from "react";
import config from "../config";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutModal({ isOpen, onClose }) {
  useEffect(() => {
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white w-full max-w-[480px] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center z-10 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase">{config.uiText.checkout.title}</h2>
          <CheckoutForm onSuccessCallback={onClose} />
        </div>
      </div>
    </div>
  );
}
