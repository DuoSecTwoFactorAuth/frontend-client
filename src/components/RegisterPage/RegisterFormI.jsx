import React, { useState } from "react";
import axios from "../../utils/axios.js";
import routes from "../../utils/routes.js";

const RegisterFormI = () => {
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

    const test = async (companyDetails) => {
        try {
            const res = await axios.post(routes.auth.registerI, companyDetails);
            console.log(res);
        } catch (err) {
            console.log(err);            
        }
    }

    const handleSubmitCompanyDetails = (event) => {
        event.preventDefault();
        console.log(companyDetails);
        test(companyDetails);
    }

    return (
        <React.Fragment>
            <p className="">Enter Details</p>
            <form
                onSubmit={handleSubmitCompanyDetails}
                className="flex flex-col w-full gap-4 bg-red-500"
            >
                <input
                    type="text"
                    placeholder="Application/Company Name"
                    name="companyName"
                    value={companyDetails.companyName}
                    onChange={handleChangeInCompanyDetails}
                    className="rounded-md bg-[#E8EDDF]"
                />

                <input
                    type="text"
                    placeholder="Application/Company EmailId"
                    name="companyEmailId"
                    value={companyDetails.companyEmailId}
                    onChange={handleChangeInCompanyDetails}
                    className="bg-[#E8EDDF]"
                />
                
                <button type="submit" className="text-white bg-[#333533] rounded-full">Enter</button>
            </form>
        </React.Fragment>
    );  
};

export default RegisterFormI;