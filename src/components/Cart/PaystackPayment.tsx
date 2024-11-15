import React from 'react';
import { PaystackButton } from 'react-paystack';
import { VStack, Text, Box, useToast, Button } from '@chakra-ui/react';

interface PaystackPaymentProps {
  amount: number; 
  email: string; 
  publicKey: string; 
}

export const PaystackPayment: React.FC<PaystackPaymentProps> = ({ amount, email, publicKey }) => {
  const toast = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Payment Successful',
      description: 'Your payment was completed successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleClose = () => {
    toast({
      title: 'Payment Cancelled',
      description: 'You cancelled the payment.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const componentProps = {
    email,
    amount,
    publicKey,
    text: 'Pay Now',
    onSuccess: handleSuccess,
    onClose: handleClose,
    className: 'paystack-button', 
  };

  return (
    <VStack spacing={4} p={8} borderWidth="1px" borderRadius="md" boxShadow="md" bg="white">
      <Text fontSize="2xl" fontWeight="bold">
        Complete Your Payment
      </Text>
      <Text fontSize="md" color="gray.600">
        Amount: ₦{(amount / 100).toFixed(2)}
      </Text>
      <Box w="full">
        <PaystackButton {...componentProps} />
      </Box>
    </VStack>
  );
};

