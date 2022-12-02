import React from "react";
import duosecLogo from "../../assets/logos/duosec-logo.svg";
import lighteningImg from "../../assets/logos/lightening.png";

const Welcome = () => {
    return (
        <React.Fragment>
            <p className="text-white text-4xl">Welcome To</p>
            <img src={duosecLogo} className="w-[50%] h-[10%]" />   
            <img src={lighteningImg} className="block absolute bottom-0 left-0 w-[20%] h[45%]"/>    
        </React.Fragment>
    )
};

export default Welcome;