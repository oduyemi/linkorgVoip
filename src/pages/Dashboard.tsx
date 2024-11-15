import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Dashboard } from "../components/Dashboard";
import { Footer } from "../components/Footer";

const UserDashboard: React.FC = () => {
    return(
        <Box>
            <Dashboard />
            <Footer />
        </Box>
    )
}

export default UserDashboard;