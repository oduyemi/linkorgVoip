import React from 'react';
import { PaystackPayment } from '../components/Cart/PaystackPayment';

const PaystackPage: React.FC = () => {
  const publicKey = 'pk_live_51QIQGdP8MdHf1E0aoaEz6vArMtkofrdwKbpF66LedwC7g1JW7M8q0awmMGEAluKp3mr7IBWYnMyuvKHSRJGW2P3000tJSAaUYj'; 
  const email = 'customer@example.com'; 
  const amount = 5000 * 100; 

  return (
    <div>
      <PaystackPayment amount={amount} email={email} publicKey={publicKey} />
    </div>
  );
};

export default PaystackPage;
