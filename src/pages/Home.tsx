import { Box } from "@chakra-ui/react";
import React from "react";
import { Banner } from "../components/Home/Banner";
import { Features } from "../components/Home/Features";
import { Benefits } from "../components/Home/Benefits";
import { Intro } from "../components/Home/Intro";
import { AdBox } from "../components/Home/AdBox";
import { Footer } from "../components/Footer";
import { FeaturedProducts } from "../components/Home/FeaturedProducts";





const Home: React.FC = () => {
    return(
        <Box>
            <Banner />
            <Features />
            <Intro />
            <Benefits />
            <FeaturedProducts />
            <AdBox backgroundImage={require("../assets/images/voip.jpg")} />
            <Footer />
        </Box>
    )
}

export default Home;