import React from "react";
import { TopBar } from "../components/TopBar";
import { MidBar } from "../components/MidBar";
import { NavMenu } from "../components/NavMenu";





export const Navbar: React.FC = () => {
    return(
        <>
            <TopBar />
            <MidBar />
            <NavMenu />
        </>
    )
}