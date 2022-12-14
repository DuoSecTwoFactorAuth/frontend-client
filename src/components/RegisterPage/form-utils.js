import axios from "../../utils/axios.js";

const registerIValidationSchema = (values) => {
    const errors = {};
    
    if (!values.companyName) {
        errors.companyName = 'Company Name is required';
    };

    if (!values.companyEmailId) {
        errors.companyEmailId = 'Company EmailId is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.companyEmailId)) {
        errors.companyEmailId = 'Invalid email address';
    };

    return errors;
};

const postCompanyRegisterIDetails = async (route, companyDetails, setMailSent, setCompanyDetails, toast) => {
    try {
        const res = await axios.post(route, companyDetails);
        if (res.status === 201) {
            toast.success('You have successfully submitted your details.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setCompanyDetails({
                companyName: "",
                companyEmailId: ""
            });

            setMailSent(true);
        }        
    } catch (err) {
        console.log(err);
    }
};

const registerIIValidationSchema = (values) => {
    const errors = {};
    
    if (values.otpRefreshDuration <= 0) {
        errors.otpRefreshDuration = 'Please select a refresh time for otp greater than 0 mins';
    };

    if (!values.algorithm) {
        errors.algorithm = "Please select an algorithm";
    };

    if (!values.password) {
        errors.password = "Password is required";
    };

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password & Confirm Password don't match";
    };

    return errors;
};

const postCompanyRegisterIIDetails = async (route, companyDetails, setRegisterCompanyDetails, setRegisterConfirmMsg, toast) => {
    try {
        const res = await axios.post(route, companyDetails);
        if (res.status === 200) {
            toast.success('Your company details have been successfully submitted with our application.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            setRegisterCompanyDetails({
                otpRefreshDuration: 0,
                algorithm: "",
                password: "",
                confirmPassword: "",
                companyUniqueId: companyDetails.companyUniqueId
            });

            setRegisterConfirmMsg("Click on this text to proceed to login.");
        }
    } catch (err) {
        console.log(err);
    }
};

const getCompanyDetails = async (route, companyUniqueId, setCompanyDetails) => {
    try {
        const res = await axios.get(route, {
            params: {
                uniqueId: companyUniqueId
            }
        });
       
        if (res.status === 200) {
            const companyDetails = await res.data;
            setCompanyDetails(companyDetails);
        }
    } catch (err) {
        console.log(err);
    }
}

export { registerIValidationSchema, postCompanyRegisterIDetails, registerIIValidationSchema, postCompanyRegisterIIDetails, getCompanyDetails };