import React, { useState, useEffect } from "react";
import { registerIValidationSchema, postCompanyRegisterIDetails } from "./form-utils.js";
import routes from "../../utils/routes.js";

const RegisterFormI = () => {
    const [isMailSent, setMailSent] = useState(false);

    const [companyDetails, setCompanyDetails] = useState({
        companyName: "",
        companyEmailId: ""
    });

    const [errors, setErrors] = useState({ 
        companyName: "",
        companyEmailId: ""
    })

    const handleChangeInCompanyDetails = (event) => {
        setCompanyDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };

    const handleSubmitCompanyDetails = (event) => {
        event.preventDefault();
        // const formErrors = registerIValidationSchema(companyDetails);
        // console.error(formErrors);
        
        postCompanyRegisterIDetails(routes.auth.registerI, companyDetails);
        setMailSent(true);
        // if (Object.keys(formErrors).length !== 0) {
        //     setErrors(formErrors);
        //     console.error(formErrors);
        // } else {
        //     // postCompanyRegisterIDetails(routes.auth.registerI, companyDetails);
        // };
    };

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmitCompanyDetails}
                className="flex flex-col w-full gap-y-8"
            >
                <p className="text-3xl text-black">Enter Details</p>

                <div className="flex flex-col justify-center gap-y-8">
                    <div className="flex flex-col justify-center gap-y-2">
                        <input
                            type="text"
                            placeholder="Application/Company Name"
                            name="companyName"
                            value={companyDetails.companyName}
                            onChange={handleChangeInCompanyDetails}
                            className="rounded-md bg-[#E8EDDF]"
                        />
                        {errors.companyName !== "" && <p className="text-red-700 indent-1.5">{errors.companyName}</p>}
                    </div>

                    <div className="flex flex-col justify-center gap-y-2">
                        <input
                            type="text"
                            placeholder="Application/Company EmailId"
                            name="companyEmailId"
                            value={companyDetails.companyEmailId}
                            onChange={handleChangeInCompanyDetails}
                            className="bg-[#E8EDDF]"
                        />
                        {errors.companyEmailId !== "" && <p className="text-red-700 indent-1.5">{errors.companyEmailId}</p>}
                    </div>
                </div>
                
                <div>
                    <button type="submit" className="px-12 text-white bg-[#333533] rounded-full">Enter</button>
                </div>

                {isMailSent ? <p className="text-red-700">*You have successfully registered. Please check your email for further steps</p> : null}
            </form>
        </React.Fragment>
    );  
};

export default RegisterFormI;