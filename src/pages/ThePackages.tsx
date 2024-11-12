import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { Packages } from "../components/Packages/index";
import { PackagesBanner } from "../components/Packages/Banner";
// import { AdBox } from "../components/Home/AdBox";



const ThePackages: React.FC = () => {
    return(
        <Box>
            <PackagesBanner />
            <Packages />
            <Footer />
        </Box>
    )
}

export default ThePackages;