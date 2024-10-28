import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

type Plan = {
  id: number;
  title: string;
  monthlyPrice: number;
  features: string[];
  isActive?: boolean;
};

const packagesData: Plan[] = [
  {
    id: 1,
    title: 'Silver',
    monthlyPrice: 7.99,
    features: [
      '100 Inclusive minutes per user (UK landline and Mobile)',
      'One UK number included',
      'Mobile and desktop apps(iOS® and Android™)',
      'Team messaging',
      'Document sharing',
      'Call logs',
      'International calls from 3p per minute',
      '24/7 Customer Support',
    ],
  },
  {
    id: 2,
    title: 'Gold',
    monthlyPrice: 14.99,
    features: [
      'Everything in Silver plan PLUS',
      '2000 Inclusive minutes per user(UK landline and mobile)',
      'On-Demand Call Recording',
      'Video meetings with up to 100 participants',
      'Internet fax',
      'Unlimited audio conferencing',
      'Multi-level iVR',
      'VR, ring group, call queue and more.Click to dial',
      'Click to dial from most popular CRMs. Automatic call recording',
      '30 Days unlimited call recording. Custom roles and permissions',
      'Manage your whole team on different levels',
      'Up to 24-hour meeting duration',
      'Quality-of-service reports',
    ],
    isActive: true,
  },
  {
    id: 3,
    title: 'Diamond',
    monthlyPrice: 19.99,
    features: [
      'Everything in Gold Plan PLUS',
      'Unlimited Outbound calls (UK landline and mobile)',
      'Automatic Call Recording',
      'Video meetings with up to 200 participants',
      'Multi-site admin and management',
      '100+ CRM Integrations and API access including Salesforce, Zoho, Hubspot and Bullhorn',
      'Advanced call handling including whisper, barge and more',
      'Empower your managers with powerful analytics Collaboration tools',
      'Video conferencing, screen share, chat and SMS Developer platform',
      'Full API access',
    ],
  },
];

type PlanCardProps = {
  plan: Plan;
  isHovered: boolean;
  setHovered: (id: number | null) => void;
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, isHovered, setHovered }) => (
  <Box
    onMouseEnter={() => setHovered(plan.id)}
    onMouseLeave={() => setHovered(null)}
    p={5}
    borderRadius="md"
    boxShadow="md"
    transition="transform 0.3s, background-color 0.3s"
    transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
    bg={isHovered ? '#010156' : '#F3F6FB'}
    _hover={{
      backgroundColor: '#010156', 
      color: 'white',
    }}
    color={isHovered ? 'white' : '#2A4365'}
    maxW="350px"
    mx="auto"
  >
    <Text fontSize="2xl" fontWeight="bold"  mb={4}>
      {plan.title}
    </Text>
    <Box mb={3}>
      <Text fontSize="xl" fontWeight="bold" className="d-inline">${plan.monthlyPrice}</Text>
      <Text fontSize="sm" className="d-inline"> /month</Text>
    </Box>
    <List spacing={2} color={isHovered ? 'white' : 'gray.700'} mb={4}>
      {plan.features.map((feature, idx) => (
        <ListItem key={idx} display="flex" alignItems="start">
          <CheckIcon color={isHovered ? 'white' : 'blue.500'} mr={2} />
          <Text fontSize="sm">{feature}</Text>
        </ListItem>
      ))}
    </List>
    <Box textAlign="center" mt={4}>
      <Button colorScheme="orange" size="lg">
        Get Started
      </Button>
    </Box>
  </Box>
);

export const Packages: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Text fontSize="4xl" fontWeight="bold"  textAlign="center" mb={4} color="#010156">
        Packages
      </Text>
      <Text textAlign="center" color="gray.700" className="animate__animated animate__fadeIn animate__infinite my-fade-in" fontSize="2xl" mb={8}>
        UK Business VoIP Virtual Landline Provider
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {packagesData.map((plan) => (
          <GridItem key={plan.id}>
            <PlanCard plan={plan} isHovered={hovered === plan.id} setHovered={setHovered} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
