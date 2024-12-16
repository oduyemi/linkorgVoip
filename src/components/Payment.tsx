import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

const stripePromise = loadStripe("pk_live_51QIQGdP8MdHf1E0aoaEz6vArMtkofrdwKbpF66LedwC7g1JW7M8q0awmMGEAluKp3mr7IBWYnMyuvKHSRJGW2P3000tJSAaUYj");

export const Payment: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>(''); 
  const [userInfo, setUserInfo] = useState<any>(null); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0); 
  const navigate = useNavigate();
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/checkout');
    }

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const totalPrice = cartItems.reduce((total: number, item: any) => total + item.price, 0);
      setPrice(totalPrice); 
    }
  }, [navigate]);

  useEffect(() => {
    if (userInfo) {
      axios.post("https://linkorg-voip.vercel.app/api/v1/payment/stripe-payments", {
        amount: price * 100, // Price in cents
        email: userInfo.email, 
      })
      .then(response => {
        const { clientSecret } = response.data;
        if (clientSecret) {
          setClientSecret(clientSecret);
        } else {
          console.error('No clientSecret returned:', response.data);
        }
      })
      .catch(error => {
        console.error('Error creating payment intent:', error);
      });
    }
  }, [userInfo, price]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const generateXML = (userInfo: any) => {
    return `
      <order>
        <OrderRef>PO-00002</OrderRef>
        <cus_cusRefNum>12345</cus_cusRefNum>
        <Name>${userInfo.name}</Name>
        <CName>${userInfo.companyName}</CName>
        <Address>${userInfo.address}</Address>
        <Postcode>${userInfo.postcode}</Postcode>
        <Country>${userInfo.country}</Country>
        <Phone>${userInfo.phone}</Phone>
        <Email>${userInfo.email}</Email>
        <Branding>plain</Branding>
        <carrier_srv>DPD</carrier_srv>
        <lines>
          <line>
            <Item>Sample Item</Item>
            <Quantity>1</Quantity>
          </line>
        </lines>
      </order>
    `;
  };

  const sendOrderToVendor = async (xml: string) => {
    try {
      const response = await fetch('https://secure.provu.co.uk/prosys/xml.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': 'Basic ' + btoa("linkorgnet.api:Z%{K`\V9"), 
        },
        body: xml,
      });

      if (response.ok) {
        console.log('Order successfully sent');
      } else {
        console.log('Error sending order');
      }
    } catch (error) {
      console.log('Error sending order: ', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo || !userInfo.name || !userInfo.companyName || !userInfo.address || !userInfo.postcode || !userInfo.phone || !userInfo.email || !userInfo.country) {
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

    if (!stripe || !elements) {
      setErrorMessage('Stripe or Elements not loaded yet.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://linkorg-voip.vercel.app/api/v1/payment/stripe-payments', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'GBP',
          email: userInfo.email, 
          amount: price * 100, // Price in cents
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
        setErrorMessage(error.message || 'An unknown error occurred');
        return;
      }

      const xml = generateXML(userInfo);
      await sendOrderToVendor(xml);

      setSuccessMessage('Payment successful!');
      navigate('/success'); 
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
    <Box maxW="600px" mx="auto" p={4}>
      <Text fontSize="3xl" fontWeight="bold" className="blutext" textAlign="center" mb={6}>
        Payment Page
      </Text>
      {paymentStatus && <Text color="green.500">{paymentStatus}</Text>}
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      {successMessage && <Text color="green.500">{successMessage}</Text>}
        {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <form onSubmit={handleSubmit} className='px-4'>
            <div className='mb-3'>
              <label htmlFor="email-input"><b>Email</b></label>
              <div>
                <input 
                  value={userInfo.email}
                  type="email" 
                  id="email-input" 
                  placeholder='johndoe@gmail.com' 
                  disabled 
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="price"><b>Price</b></label>
              <input 
                value={`£${price.toFixed(2)}`} 
                type="text" 
                id="price" 
                disabled 
                style={{ width: '100%', padding: '10px', backgroundColor: '#f4f4f4' }}
              />
            </div>
            <PaymentElement />
            <Box className="text-center">
              <Button 
                type="submit" 
                isLoading={loading} 
                isDisabled={!stripe || !elements || !userInfo.email}
                colorScheme="orange"
                className="mt-3"
              >
                Complete Payment
              </Button>
            </Box>
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </Elements>
      )}
    </Box>
  );
};
