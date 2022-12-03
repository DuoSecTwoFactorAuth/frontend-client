import React from "react";
import { useNavigate } from "react-router-dom";
import duosecLogo from "../assets/logos/duosec-logo.svg";
import facebookLogo from "../assets/logos/facebook-logo.svg";
import instagramLogo from "../assets/logos/instagram-logo.svg";
import twitterLogo from "../assets/logos/twitter-logo.svg";
import secureLogin from "../assets/LandingPage/secure-login.svg";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-between">
            {/* navbar */}
            <div className="w-screen flex flex-row justify-between items-center p-8">
                <img src={duosecLogo} alt="Duosec Logo" />
                <div className="flex flex-row justify-end gap-8">
                    <button className="text-md">Documentation</button>
                    <button className="text-md">About Us</button>
                    <button
                        className="text-md"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="bg-[#333533] text-white rounded-full px-6"
                        onClick={() => {
                            navigate("/registration-basic-details");
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>

            {/* main-content */}
            <div className="w-screen h-full flex flex-row">
                <div className="w-[50%] flex flex-col justify-center">
                    <div className="flex flex-col ml-[15%] pl-4 py-4 gap-8">
                        <p className="text-[#242423] text-3xl">
                            <span className="block">Secure, and</span>
                            <span className="block">Easy to integrate</span>
                        </p>
                        <p className="text-xl">
                            <span className="block">Secure your applications with us by implementing</span>
                            <span className="block">two factor authentication the easy way!</span>
                        </p>
                        <button
                            className="w-fit px-8 bg-[#333533] text-white rounded-2xl"
                            onClick={() => {
                                navigate("/registration-basic-details");
                            }}
                        >
                            Get Started
                        </button>
                    </div> 
                </div>
                <div className="w-[50%] flex flex-row justify-center items-center">
                    <img src={secureLogin} alt="Secure Login Photo" className="h-[60%] w-[60%]"/>
                </div>
            </div>

            {/* footer */}
            <div className="flex flex-row justify-between p-2 bg-[#333533]">
                <div className="flex flex-row items-center mx-12 gap-8">
                    <a href="https://www.instagram.com" target="_blank"><img src={instagramLogo} alt="Instagram Logo" /></a>
                    <a href="https://www.facebook.com" target="_blank"><img src={facebookLogo} alt="Facebook Logo" /></a>
                    <a href="https://twitter.com/i/flow/login" target="_blank"><img src={twitterLogo} alt="Twitter Logo" /></a>
                </div>
                <div className="flex flex-row items-center mx-12">
                    <p className="text-2xl text-white">&copy; Copyright: Duosec</p>
                </div>
            </div>
        </div>
    )
};

export default LandingPage;