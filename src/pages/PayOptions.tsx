import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { PaymentOption } from "../components/Cart/PaymentOptions";



const PayOptions: React.FC = () => {
    return(
        <Box>
            <PaymentOption />
        </Box>
    )
}



export default PayOptions;