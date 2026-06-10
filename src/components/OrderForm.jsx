import React from 'react';

export default function OrderForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Дякуємо за замовлення! Ми зв'яжемося з вами найближчим часом.");
  };

  return (
    <div id="orderForm" className="px-4 py-8 bg-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 uppercase">Оформити замовлення</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input 
            type="text" 
            placeholder="Введіть ваше ім'я" 
            required 
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-yellow-400 focus:bg-white transition font-medium text-lg"
          />
        </div>
        <div>
          <input 
            type="tel" 
            placeholder="Введіть ваш телефон" 
            required 
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-yellow-400 focus:bg-white transition font-medium text-lg"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-xl uppercase shadow-[0_5px_15px_rgba(220,38,38,0.4)] transform transition active:scale-[0.98] mt-2"
        >
          Замовити зараз
        </button>
      </form>
      <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-500 font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
        Оплата при отриманні
      </div>
    </div>
  );
}
