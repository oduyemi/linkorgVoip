import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Link,
  HStack,
  Text,
  Divider,
  useToast,
  Image,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FaCreditCard } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';

export const PaymentOption: React.FC = () => {
  const toast = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.100', 'gray.600');
  const primaryColor = '#010156';
  const accentColor = '#e65d0f';

  const handlePayment = (provider: string) => {
    setSelectedProvider(provider);
    toast({
      title: `Redirecting to ${provider}`,
      description: `You are being redirected to ${provider} for payment.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack
      spacing={8}
      p={8}
      align="center"
      bgGradient={`linear(to-br, ${primaryColor}, ${accentColor})`}
      borderRadius="lg"
      boxShadow="xl"
      color="white"
      w="full"
      maxW="800px"
      margin="auto"
    >
      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
        Choose Your Payment Method
      </Text>
      <Text fontSize="md" opacity={0.9} textAlign="center" px={4}>
        We provide secure and convenient payment options. Select one to proceed.
      </Text>
      <Divider borderColor="whiteAlpha.700" />
      <Box w="full">
        <Stack
          direction={['column', 'row']}
          spacing={8}
          justify="center"
          align="center"
          wrap="wrap"
        >
          {/* Paystack Payment Option */}
          <VStack
            p={6}
            borderWidth="2px"
            borderRadius="lg"
            bg={cardBg}
            boxShadow="md"
            borderColor={selectedProvider === 'Paystack' ? accentColor : 'transparent'}
            transition="transform 0.3s, border-color 0.3s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: 'lg',
              borderColor: accentColor,
            }}
            onClick={() => handlePayment('Paystack')}
            cursor="pointer"
            align="center"
          >
            <Image
              src={require('../../assets/images/logo/paystack.png')}
              alt="Paystack"
              boxSize="80px"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.1)' }}
            />
            <Text fontSize="lg" fontWeight="medium" color={primaryColor}>
              Pay with Paystack
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center" maxW="200px">
              Fast and secure payment with Paystack.
            </Text>
            <Link href="payment/paystack">
                <Button
                bg={primaryColor}
                color="white"
                size="md"
                leftIcon={<FaCreditCard />}
                mt={4}
                onClick={(e) => {
                    e.stopPropagation();
                    handlePayment('Paystack');
                }}
                _hover={{ bg: accentColor }}
                boxShadow="sm"
                >
                Proceed to Paystack
                </Button>
            </Link>
          </VStack>

          {/* Stripe Payment Option */}
          <VStack
            p={6}
            borderWidth="2px"
            borderRadius="lg"
            bg={cardBg}
            boxShadow="md"
            borderColor={selectedProvider === 'Stripe' ? accentColor : 'transparent'}
            transition="transform 0.3s, border-color 0.3s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: 'lg',
              borderColor: accentColor,
            }}
            onClick={() => handlePayment('Stripe')}
            cursor="pointer"
            align="center"
          >
            <SiStripe size="50px" color={accentColor} />
            <Text fontSize="lg" fontWeight="medium" color={primaryColor}>
              Pay with Stripe
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center" maxW="200px">
              Trusted by millions for seamless payments.
            </Text>
            <Link href="/payment/stripe">
                <Button
                bg={primaryColor}
                color="white"
                size="md"
                leftIcon={<FaCreditCard />}
                mt={4}
                onClick={(e) => {
                    e.stopPropagation();
                    handlePayment('Stripe');
                }}
                _hover={{ bg: accentColor }}
                boxShadow="sm"
                >
                Proceed to Stripe
                </Button>
            </Link>
          </VStack>
        </Stack>
      </Box>
    </VStack>
  );
};
