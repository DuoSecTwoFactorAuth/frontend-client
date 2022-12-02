import React, { useState, useEffect } from "react";
import { registerIIValidationSchema, postCompanyRegisterIIDetails } from "./form-utils.js"
import routes from "../../utils/routes.js";

const RegisterFormII = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName: "Example",
        companyEmailId: "example@gmail.com"
    });

    const [registerDetails, setRegisterDetails] = useState({
        otpRefreshDuration: 0,
        algorithm: "default",
        password: "",
        confirmPassword: "",
        companyUniqueId: ""
    });

    const [errors, setErrors] = useState({ 
        otpRefreshDuration: "",
        algorithm: "",
        password: "",
        confirmPassword: "",
    })

    const handleChangeInRegisterDetails = (event) => {
        setRegisterDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };

    const handleSubmitCompanyDetails = (event) => {
        event.preventDefault();
        const formErrors = registerIIValidationSchema(companyDetails);
        console.error(formErrors);
        
        if (Object.keys(formErrors).length !== 0) {
            setErrors(formErrors);
            console.error(formErrors);
        } else {
            // postCompanyRegisterIIDetails(routes.auth.registerI, companyDetails);
        };
    };

    const decreaseByOne = () => {
        setRegisterDetails((previousState) => {
            if (previousState.otpRefreshDuration > 0) {
                return { ...previousState, otpRefreshDuration: previousState.otpRefreshDuration - 1 };
            }
            
            return previousState;
        });
    }

    const increaseByOne = () => {
        setRegisterDetails((previousState) => {
            return { ...previousState, otpRefreshDuration: previousState.otpRefreshDuration + 1 };
        });
    }

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmitCompanyDetails}
                className="flex flex-col w-full gap-y-8"
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
                
                <div className="rounded-md flex flex-row justify-between items-center bg-[#E8EDDF] px-4">
                    <span>OTP Refresh Duration</span>
                    <div className="flex flex-row items-center py-4 gap-x-4">
                        <button onClick={decreaseByOne}>-</button>
                        <span className="">{registerDetails.otpRefreshDuration}</span>
                        <button onClick={increaseByOne}>+</button>
                    </div>
                    <span>Mins</span>
                </div>

                <div className="flex flex-col justify-center gap-y-2">
                    <select className="rounded-md" name="algorithm" value={registerDetails.algorithm} onChange={handleChangeInRegisterDetails}>
                        <option value="">Select your algorithm</option>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                    {errors.algorithm !== "" && <p className="text-red-700 indent-1.5">{errors.algorithm}</p>}
                </div>
                
                <div className="flex flex-col justify-center gap-y-2">
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={registerDetails.password}
                        onChange={handleChangeInRegisterDetails}
                        className="rounded-md bg-[#E8EDDF]"
                    />
                    {errors.password !== "" && <p className="text-red-700 indent-1.5">{errors.password}</p>}
                </div>

                <div className="flex flex-col justify-center gap-y-2">
                    <input
                        type="text"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={registerDetails.oonfirmPassword}
                        onChange={handleChangeInRegisterDetails}
                        className="rounded-md bg-[#E8EDDF]"
                    />
                    {errors.confirmPassword !== "" && <p className="text-red-700 indent-1.5">{errors.confirmPassword}</p>}
                </div>
                
                <button type="submit" className="text-white bg-[#333533] rounded-full">Enter</button>
            </form>
        </React.Fragment>
    );  
};

export default RegisterFormII;