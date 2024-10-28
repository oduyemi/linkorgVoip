import { Box } from "@chakra-ui/react";
import React from "react";
import { AboutBanner } from "../components/About/Banner";
import { Footer } from "../components/Footer";
import { AdBox } from "../components/Home/AdBox";
import { AboutIntro } from "../components/About/Intro";
import { CoreValues } from "../components/About/CoreValues";
import { FeaturedProducts } from "../components/Home/FeaturedProducts";





const About: React.FC = () => {
    return(
        <Box>
            <AboutBanner />
            <AboutIntro />
            <CoreValues />
            <FeaturedProducts />
            <AdBox backgroundImage={require("../assets/images/voip.jpg")} />
            <Footer />
        </Box>
    )
}

export default About;