import React, { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Define the UserInformation interface
interface UserInformation {
  name: string;
  companyName: string;
  address: string;
  postcode: string;
  phone: string;
  email: string;
  country: string;
}

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const backendUrl = "https://linkorg-voip.vercel.app/api/v1/payment/stripe-payments";
  const [userInfo, setUserInfo] = useState<UserInformation>({
      name: '',
      companyName: '',
      address: '',
      postcode: '',
      phone: '',
      email: '',
      country: '',
    });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // To handle redirection after storing the details
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo.name || !userInfo.companyName || !userInfo.address || !userInfo.postcode || !userInfo.phone || !userInfo.email || !userInfo.country) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    if (!elements || !stripe) {
      return;
    }

    try {
      const price = 12;

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'GBP',
          email: emailInput,
          amount: price * 100, 
          paymentMethodType: "card"
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create payment intent.');
      }

      const { client_secret: clientSecret } = await res.json();
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });
      
      if (error) {
        setErrorMessage(error.message || 'An unknown error occurred'); // Fallback message if error.message is undefined
      }
      

      // After successful payment, handle any further actions (e.g., redirect)
      navigate('/success'); // Replace with your success route
    } catch (error: any) {
      setErrorMessage(error.message);
      toast({
        title: 'Payment Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <div className='mb-3'>
        <label htmlFor="email-input">Email</label>
        <div>
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            id="email-input"
            placeholder='johndoe@gmail.com'
            required
          />
        </div>
      </div>
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe || !elements}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
