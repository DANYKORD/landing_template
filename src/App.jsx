import React, { useState } from 'react';
import config from './config';
import TopHeading from './components/TopHeading';
import PromoTimer from './components/PromoTimer';
import Hero from './components/Hero';
import ContentBlocks from './components/ContentBlocks';
import Reviews from './components/Reviews';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 sm:py-8">
      <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        <TopHeading />
        <PromoTimer />
        <Hero openCheckout={() => setIsCheckoutOpen(true)} />
        <ContentBlocks />
        <Reviews />
        <FinalCTA openCheckout={() => setIsCheckoutOpen(true)} />
        <Footer />
      </div>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}

export default App;
