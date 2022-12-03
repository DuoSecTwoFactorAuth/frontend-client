import React, { useState, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext.jsx" 
import { loginValidationSchema } from "./form-utils";
import routes from "../../utils/routes.js";

const LoginForm = () => {
    const { handleLogin } = useContext(LoginContext);

    const [loginDetails, setLoginDetails] = useState({
        companyEmailId: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        companyEmailId: "",
        password: ""
    });

    const handleLoginDetails = (event) => {
        setLoginDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value }
        })
    };

    const submitLoginDetails = (event) => {
        event.preventDefault();

        const formErrors = loginValidationSchema(loginDetails);
        setErrors(formErrors);
        
        if (Object.keys(formErrors).length === 0) {
            handleLogin(routes.auth.login, loginDetails, setErrors);
        }
    }

    return (
        <>
            <form
                className="w-full h-full px-[20%] flex flex-col gap-y-4 justify-center"
                onSubmit={submitLoginDetails}
                noValidate
            >
                <p className="flex flex-row justify-center text-3xl text-[#343634] ">Login</p>

                <div className="flex flex-col justify-center gap-y-4">
                    <div className="flex flex-col justify-center gap-y-2">
                        <input
                            type="email"
                            placeholder="Registered Email ID"
                            name="companyEmailId"
                            value={loginDetails.companyEmailId}
                            onChange={handleLoginDetails}
                            className="rounded-md bg-[#E8EDDF]"
                        />
                        {errors.companyEmailId !== "" ? <p className="text-red-700 indent-1.5">{errors.companyEmailId}</p>: null}
                    </div>

                    <div className="flex flex-col justify-center gap-y-2">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginDetails.password}
                            onChange={handleLoginDetails}
                            className="rounded-md bg-[#E8EDDF]"
                        />
                        {errors.password !== "" ? <p className="text-red-700 indent-1.5">{errors.password}</p>: null}
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <button type="submit" className="px-12 text-white bg-[#333533] rounded-full">Enter</button>
                </div>

                {errors.invalidCredentials ? <p className="flex flex-row justify-center text-red-700 indent-1.5">{errors.invalidCredentials}</p>: null}
            </form>
        </>
    )
}

export default LoginForm;