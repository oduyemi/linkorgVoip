import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Grandstream } from "../components/Shop/Grandstream";



const GrandstreamStore: React.FC = () => {
    return(
        <Box>
            <Grandstream />
            <Footer />
        </Box>
    )
}

export default GrandstreamStore;