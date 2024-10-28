import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Packages } from "../components/Packages";



const ThePackages: React.FC = () => {
    return(
        <Box>
            <Packages />
            <Footer />
        </Box>
    )
}

export default ThePackages;