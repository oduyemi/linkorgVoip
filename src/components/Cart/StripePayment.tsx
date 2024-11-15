import React from 'react';
import { loadStripe } from '@stripe/stripe-js';  // Correct import
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Box, Button, VStack, useToast, Spinner, Text } from '@chakra-ui/react';


const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your Stripe public key



const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast({
        title: 'Stripe is not loaded',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        toast({
          title: 'Payment Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Payment Successful',
          description: `Payment method created: ${paymentMethod.id}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Handle further server-side integration here
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} p={6} borderWidth="1px" borderRadius="md" boxShadow="md" bg="white">
        <Text fontSize="2xl" fontWeight="bold">Complete Your Stripe Payment</Text>
        <CardElement />
        <Button
          type="submit"
          colorScheme="blue"
          size="md"
          mt={4}
          isDisabled={!stripe || loading}
          leftIcon={loading ? <Spinner size="sm" /> : undefined}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </VStack>
    </form>
  );
};

export const StripePayment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <Box maxW="400px" mx="auto" mt={8}>
        <CheckoutForm />
      </Box>
    </Elements>
  );
};

