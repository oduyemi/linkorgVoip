import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Yealink } from "../components/Shop/Yealink";



const YealinkStore: React.FC = () => {
    return(
        <Box>
            <Yealink />
            <Footer />
        </Box>
    )
}

export default YealinkStore;