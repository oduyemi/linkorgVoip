import React, { useContext } from "react";
import { UserContext } from "../usercontext";
import { FaPowerOff } from 'react-icons/fa';



export const LogOut: React.FC = () => {
  const { handleLogout } = useContext(UserContext);

  return (
    <FaPowerOff
        color={"#ffffff"}
        height="20px"
        width="20px"
        onClick={handleLogout}
    />
  );
};