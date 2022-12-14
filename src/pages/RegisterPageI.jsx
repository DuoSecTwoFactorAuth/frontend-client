import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Welcome from "../components/RegisterPage/Welcome.jsx";
import RegisterFormI from "../components/RegisterPage/RegisterFormI.jsx";

const RegisterPageI = () => {
    return (
        <>
            <div className="h-screen w-screen flex flex-row">
                <div className="h-[100%] w-[40%] flex flex-col justify-center items-center bg-[#333533]">
                    <Welcome />
                </div>
                <div className="h-[100%] w-[60%] flex flex-col justify-center items-start px-[14%]">
                    <RegisterFormI toast={toast} />
                </div>
            </div>
            <ToastContainer />
        </>
    )  
};

export default RegisterPageI;