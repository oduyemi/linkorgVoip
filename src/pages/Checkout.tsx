import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { CheckoutForm } from "../components/CheckoutForm";



const Checkout: React.FC = () => {
    return(
        <Box>
            <CheckoutForm />
            <Footer />
        </Box>
    )
}

export default Checkout;