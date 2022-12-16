import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext.jsx";
import duosecLogo from "../assets/logos/duosec-logo.svg";
import logoutIcon from "../assets/logos/logout.svg";

const Navbar = () => {
    const { handleLogout } = useContext(LoginContext);
    
    const navigate = useNavigate();

    const btnAllEmps = () => {
        navigate("/company/dashboard");
    }

    const btnSettings = () => {
        navigate("/company/settings");
    }

    return (
        <>
            <div className="w-screen px-8 py-2 flex flex-row justify-between">
                <img src={duosecLogo} alt="duosec-logo" className="h-10" />
                <div className="flex flex-row gap-x-2">
                    <button onClick={btnAllEmps}>All Employees</button>
                    <button onClick={btnSettings}>Settings</button>
                    <button onClick={handleLogout}><img src={logoutIcon} alt="bell-icon" className="w-6 h-6" /></button>
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default Navbar;