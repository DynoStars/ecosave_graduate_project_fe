import CheckoutComponent from '@/components/checkout/CheckoutComponent';
import React from 'react';

export default function Checkout() {
    
  return (
    <div className="min-h-screen px-10 lg:px-20 py-10">
      <div className="w-full mx-auto">
        <div className="bg-red-500 rounded-lg">
          <CheckoutComponent products={5} />
        </div>
      </div>
    </div>
  );
}
