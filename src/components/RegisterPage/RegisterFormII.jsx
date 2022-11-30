import React, { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import routes from "../../utils/routes.js";

const RegisterFormII = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName: "Example",
        companyEmailId: "example@gmail.com"
    });

    const [registerDetails, setRegisterDetails] = useState({
        otpRefreshDuration: 0,
        algorithm: "",
        password: "",
        confirmPassword: "",
        companyUniqueId: ""
    });

    // const uniqueCompanyId = 1235;

    // const getCompanyDetails = async (companyId) => {
    //     try {
    //         const res = await axios.get(routes.companyDetails.getDetails, companyId);
    //         const compData = await res.data;
            
    //         setCompanyDetails(compData);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getCompanyDetails(uniqueCompanyId);
    // }, []);

    const handleChangeInRegisterDetails = (event) => {
        setRegisterDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };

    return (
        <React.Fragment>
            <p className="">Enter Details For: {companyDetails.companyName}</p>
            <form
                // onSubmit={handleSubmitCompanyDetails}
                className="flex flex-col w-full gap-4 bg-red-500"
            >
                <input
                    type="email"
                    value={companyDetails.companyName}
                    disabled={true}
                    className="rounded-md bg-[#E8EDDF]"
                />

                {/* <input
                    type="text"
                    placeholder="Application/Company EmailId"
                    name="companyEmailId"
                    value={companyDetails.companyEmailId}
                    onChange={handleChangeInCompanyDetails}
                    className="bg-[#E8EDDF]"
                /> */}

                <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={registerDetails.password}
                    onChange={handleChangeInRegisterDetails}
                    className="bg-[#E8EDDF]"
                />

                <input
                    type="text"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={registerDetails.password}
                    onChange={handleChangeInRegisterDetails}
                    className="bg-[#E8EDDF]"
                />
                
                {/* <button type="submit" className="text-white bg-[#333533] rounded-full">Enter</button> */}
            </form>
        </React.Fragment>
    );  
};

export default RegisterFormII;