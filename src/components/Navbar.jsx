import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import duosecLogo from "../assets/logos/duosec-logo.svg";
import bellIcon from "../assets/logos/bell-icon.svg";

const Navbar = () => {
    const navigate = useNavigate();

    const btnAllEmps = () => {
        navigate("/company/dashboard");
    }

    const btnSettings = () => {
        navigate("/company/settings");
    }

    return (
        <>
            <div className="w-screen px-8 py-4 flex flex-row justify-between">
                <img src={duosecLogo} alt="duosec-logo" />
                <div className="flex flex-row gap-x-2">
                    <button onClick={btnAllEmps}>All Employees</button>
                    <button onClick={btnSettings}>Settings</button>
                    <button><img src={bellIcon} alt="bell-icon" className="w-8 h-8" /></button>
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default Navbar;