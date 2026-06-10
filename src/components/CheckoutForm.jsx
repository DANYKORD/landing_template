import React, { useState } from "react";
import config from "../config";
import NpAutocomplete from "./NpAutocomplete";

export default function CheckoutForm({ onSuccessCallback }) {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("+380");
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: null, message: "" });

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (val.length < 4) {
      setUserPhone("+380");
      return;
    }
    if (!val.startsWith("+380")) {
      const digits = val.replace(/\D/g, "");
      if (digits.startsWith("380")) val = "+380" + digits.slice(3);
      else if (digits.startsWith("80")) val = "+380" + digits.slice(2);
      else if (digits.startsWith("0")) val = "+380" + digits.slice(1);
      else val = "+380" + digits;
    }
    const suffix = val.slice(4).replace(/\D/g, "");
    setUserPhone("+380" + suffix.slice(0, 9));
  };

  const isFormValid = userName.trim() !== "" && userPhone.length === 13;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const deliveryText = [selectedCity?.text, selectedBranch?.text].filter(Boolean).join(', ');

    const payload = {
      name: userName.trim(),
      phone: userPhone.trim(),
      price: config.product.price,
      product: config.product.title,
      quantity: quantity,
      totalPrice: config.product.price * quantity,
      delivery: deliveryText || "Не вказано"
    };

    try {
      await fetch(config.integrations.googleSheets.webAppUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      
      setFormStatus({ type: "success", message: config.uiText.checkout.success });
      setUserName("");
      setUserPhone("+380");
      setSelectedCity(null);
      setSelectedBranch(null);
      if (onSuccessCallback) {
        setTimeout(onSuccessCallback, 2000);
      }
    } catch (err) {
      setFormStatus({ type: "error", message: config.uiText.checkout.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-700">{config.uiText.checkout.nameLabel} <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
          placeholder={config.uiText.checkout.namePlaceholder}
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:bg-white transition font-medium text-lg"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-700">{config.uiText.checkout.phoneLabel} <span className="text-red-500">*</span></label>
        <input 
          type="tel" 
          value={userPhone} 
          onChange={handlePhoneChange} 
          required 
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:bg-white transition font-medium text-lg tracking-wider"
        />
      </div>

      <NpAutocomplete 
        type="city"
        label={config.uiText.checkout.cityLabel || "Місто доставки"}
        placeholder={config.uiText.checkout.cityPlaceholder || "Введіть місто"}
        onSelect={setSelectedCity}
        required={false}
      />

      <NpAutocomplete 
        type="branch"
        label={config.uiText.checkout.branchLabel || "Відділення або поштомат"}
        placeholder={config.uiText.checkout.branchPlaceholder || "Наприклад: Відділення №1"}
        cityRef={selectedCity?.ref}
        onSelect={setSelectedBranch}
        required={false}
      />

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mt-2 border border-gray-200">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-600 mb-2">{config.uiText.checkout.quantity}</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition shadow-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="font-bold text-xl w-6 text-center">{quantity}</span>
            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition shadow-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-gray-600 mb-1">{config.uiText.checkout.totalToPay}</span>
          <span className="font-black text-3xl text-gray-900">{config.product.price * quantity} {config.product.currency}</span>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || !isFormValid} 
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-xl uppercase shadow-[0_5px_15px_rgba(220,38,38,0.4)] disabled:shadow-none transform transition active:scale-[0.98] mt-2"
      >
        {isSubmitting ? config.uiText.checkout.submitting : config.uiText.checkout.submitButton}
      </button>

      {formStatus.message && (
        <div className={`text-center font-bold text-sm p-3 rounded-lg ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {formStatus.message}
        </div>
      )}
    </form>
  );
}
