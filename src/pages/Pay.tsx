import { Box } from "@chakra-ui/react";
import React from "react";
import { Payment } from "../components/Payment";
import { Footer } from "../components/Footer";



const Pay: React.FC = () => {
    return(
        <Box>
            <Payment />
            <Footer />
        </Box>
    )
}

export default Pay;