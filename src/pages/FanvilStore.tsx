import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Fanvil } from "../components/Shop/Fanvil";



const FanvilStore: React.FC = () => {
    return(
        <Box>
            <Fanvil />
            <Footer />
        </Box>
    )
}

export default FanvilStore;