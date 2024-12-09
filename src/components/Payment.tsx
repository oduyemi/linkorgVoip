import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Text } from '@chakra-ui/react';

const stripePromise = loadStripe("pk_live_51QIQGdP8MdHf1E0aoaEz6vArMtkofrdwKbpF66LedwC7g1JW7M8q0awmMGEAluKp3mr7IBWYnMyuvKHSRJGW2P3000tJSAaUYj");

export const Payment: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<string>(''); 
  const [userInfo, setUserInfo] = useState<any>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/checkout');
    }
  }, [navigate]);

  const handlePaymentSuccess = () => {
    // After successful payment, generate and send the XML document
    if (userInfo) {
      const xml = generateXML(userInfo);
      sendOrderToVendor(xml);
      setPaymentStatus('Payment Successful');
    }
  };

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

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
        Payment Page
      </Text>
      {paymentStatus && <Text color="green.500">{paymentStatus}</Text>}
      <Elements stripe={stripePromise}>
        {/* Include Stripe Payment Form Component */}
        {/* After payment success, call handlePaymentSuccess */}
      </Elements>
      <Button onClick={handlePaymentSuccess} colorScheme="green">
        Complete Payment
      </Button>
    </Box>
  );
};
