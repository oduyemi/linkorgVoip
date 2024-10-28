import { Box } from "@chakra-ui/react";
import React from "react";
import { Shop } from "../components/Shop";
import { Footer } from "../components/Footer";



const GeneralShop: React.FC = () => {
    return(
        <Box>
            <Shop />
            <Footer />
        </Box>
    )
}

export default GeneralShop;