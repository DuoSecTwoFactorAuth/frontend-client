import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Welcome from "../components/RegisterPage/Welcome.jsx";
import RegisterFormII from "../components/RegisterPage/RegisterFormII.jsx";

const RegisterPageII = () => {
    return (
        <>
            <div className="h-screen w-screen flex flex-row">
                <div className="h-[100%] w-[40%] flex flex-col justify-center items-center bg-[#333533]">
                    <Welcome />
                </div>
                <div className="h-[100%] w-[60%] flex flex-col justify-center items-start px-[14%]">
                    <RegisterFormII toast={toast} />
                </div>
            </div>
            <ToastContainer />
        </>
    )  
};

export default RegisterPageII;