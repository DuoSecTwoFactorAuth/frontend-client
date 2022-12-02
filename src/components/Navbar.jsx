import React from "react";
import duosecLogo from "../assets/logos/duosec-logo.svg";
import bellIcon from "../assets/logos/bell-icon.svg";

const Navbar = () => {
    return (
        <div className="w-screen px-8 py-4 flex flex-row justify-between">
            <img src={duosecLogo} alt="duosec-logo" />
            <div className="flex flex-row gap-x-2">
                <button>All Employees</button>
                <button>Settings</button>
                <button><img src={bellIcon} alt="bell-icon" className="w-8 h-8" /></button>
            </div>
        </div>
    )
};

export default Navbar;