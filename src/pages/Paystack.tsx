import React from 'react';
import { PaystackPayment } from '../components/Cart/PaystackPayment';

const PaystackPage: React.FC = () => {
  const publicKey = 'YOUR_PAYSTACK_PUBLIC_KEY'; 
  const email = 'customer@example.com'; 
  const amount = 5000 * 100; 

  return (
    <div>
      <PaystackPayment amount={amount} email={email} publicKey={publicKey} />
    </div>
  );
};

export default PaystackPage;
