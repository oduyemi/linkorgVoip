import { Box } from "@chakra-ui/react";
import React from "react";
import { Dashboard } from "../components/Dashboard";
import { Footer } from "../components/Footer";

const UserDashboard: React.FC = () => {
    return(
        <Box>
            <Dashboard />
        </Box>
    )
}

export default UserDashboard;