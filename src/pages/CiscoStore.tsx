import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Cisco } from "../components/Shop/Cisco";



const CiscoStore: React.FC = () => {
    return(
        <Box>
            <Cisco />
            <Footer />
        </Box>
    )
}

export default CiscoStore;