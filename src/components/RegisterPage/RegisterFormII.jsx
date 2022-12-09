import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import showPasswordLogo from "../../assets/logos/show-password.svg";
import hidePasswordLogo from "../../assets/logos/hide-password.svg";
import { registerIIValidationSchema, postCompanyRegisterIIDetails, getCompanyDetails } from "./form-utils.js"
import routes from "../../utils/routes.js";

const RegisterFormII = ({ toast }) => {
    const [searchParams] = useSearchParams();
    
    const [registerConfirmMsg, setRegisterConfirmMsg] = useState("");

    const [companyDetails, setCompanyDetails] = useState({
        companyName: "",
        companyEmailId: ""
    });

    const [registerCompanyDetails, setRegisterCompanyDetails] = useState({
        otpRefreshDuration: 0,
        algorithm: "",
        password: "",
        confirmPassword: "",
        companyUniqueId: searchParams.get('uniqueId')
    });

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false
    }) 

    const [errors, setErrors] = useState({
        otpRefreshDuration: "",
        algorithm: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        getCompanyDetails(routes.companyDetails.getDetails, searchParams.get('uniqueId'), setCompanyDetails);
    }, [searchParams]);

    const handleShowOrHidePasswords = (event, passwordType) => {
        setShowPasswords((previousState) => {
            return {...previousState, [passwordType]: !previousState[passwordType]}
        });
    };

    const handleChangeInRegisterDetails = (event) => {
        setRegisterCompanyDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };

    const handleSubmitCompanyDetails = (event) => {
        event.preventDefault();
        
        const registerCompDetails = JSON.parse(JSON.stringify(registerCompanyDetails));
    
        const formErrors = registerIIValidationSchema(registerCompanyDetails);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            delete registerCompDetails["confirmPassword"];
            postCompanyRegisterIIDetails(routes.auth.registerII, registerCompDetails, setRegisterCompanyDetails, setRegisterConfirmMsg, toast);
        } 
    };

    const decreaseByOne = () => {
        setRegisterCompanyDetails((previousState) => {
            if (previousState.otpRefreshDuration > 0) {
                return { ...previousState, otpRefreshDuration: previousState.otpRefreshDuration - 1 };
            }
            
            return previousState;
        });
    }

    const increaseByOne = () => {
        setRegisterCompanyDetails((previousState) => {
            return { ...previousState, otpRefreshDuration: previousState.otpRefreshDuration + 1 };
        });
    }

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmitCompanyDetails}
                className="flex flex-col w-full gap-y-8"
                noValidate
            >
                <div>
                    <p className="text-3xl text-black">Enter Details For</p>
                    <p className="text-3xl text-black">{companyDetails.companyName}</p>
                </div>

                <div className="flex flex-col justify-center gap-y-2">
                    <input
                        type="email"
                        value={companyDetails.companyEmailId} 
                        disabled={true}
                        className="rounded-md bg-[#E8EDDF]"
                    />
                </div>
                
                <div className="flex flex-col justify-center gap-y-2">
                    <div className="rounded-md flex flex-row justify-between items-center bg-[#E8EDDF] px-4">
                        <span>OTP Refresh Duration</span>
                        <div className="flex flex-row items-center py-4 gap-x-4">
                            <button type="button" onClick={decreaseByOne}>-</button>
                            <span className="">{registerCompanyDetails.otpRefreshDuration}</span>
                            <button type="button" onClick={increaseByOne}>+</button>
                        </div>
                        <span>Mins</span>
                    </div>
                    {errors.otpRefreshDuration !== "" ? <p className="text-red-700 indent-1.5">{errors.otpRefreshDuration}</p> : null}
                </div>

                <div className="flex flex-col justify-center gap-y-2">
                    <select className="rounded-md" name="algorithm" value={registerCompanyDetails.algorithm} onChange={handleChangeInRegisterDetails}>
                        <option value="">Select your algorithm</option>
                        <option value="SHA1">SHA 1</option>
                        <option value="SHA256">SHA 256</option>
                        <option value="SHA512">SHA 512</option>
                    </select>
                    {errors.algorithm !== "" ? <p className="text-red-700 indent-1.5">{errors.algorithm}</p> : null}
                </div>
                
                <div className="flex flex-col justify-center gap-y-2">
                    <div className="flex flex-row justify-between items-center"> 
                        <input
                            type={showPasswords.password ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={registerCompanyDetails.password}
                            onChange={handleChangeInRegisterDetails}
                            className="w-[100%] h-[100%] bg-[#E8EDDF] outline-none"
                        />
                        <button
                            type="button"
                            onClick={(event) => handleShowOrHidePasswords(event, "password")}
                            className="bg-[#E8EDDF]"
                        >
                            <img
                                src={showPasswords.password ? showPasswordLogo : hidePasswordLogo}
                                alt={
                                    showPasswords.password
                                    ? "password is visible"
                                    : "password is not visible"
                                }
                                className="w-8 h-8"
                            />
                        </button>
                    </div>
                    {errors.password !== "" ? <p className="text-red-700 indent-1.5">{errors.password}</p> : null}
                </div>

                <div className="flex flex-col justify-center gap-y-2">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={registerCompanyDetails.confirmPassword}
                        onChange={handleChangeInRegisterDetails}
                        className="rounded-md bg-[#E8EDDF]"
                    />
                    {errors.confirmPassword !== "" ? <p className="text-red-700 indent-1.5">{errors.confirmPassword}</p> : null}
                </div>
                
                <button type="submit" className="text-white bg-[#333533] rounded-full">Enter</button>
                {registerConfirmMsg !== ""
                    ? (<div className="flex flex-col ">
                        <p className="text-red-700 indent-1.5">{registerConfirmMsg}</p>
                        <button className="w-fit px-8 text-white bg-[#333533] rounded-full">Proceed to Login</button>
                    </div>)
                    : null
                }
            </form>
        </React.Fragment>
    );  
};

export default RegisterFormII;