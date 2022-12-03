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

const postCompanyRegisterIDetails = async (route, companyDetails) => {
    try {
        const res = await axios.post(route, companyDetails);
        const data = await res.data;
        console.log(res);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const registerIIValidationSchema = (values) => {
    const errors = {};
    
    if (!values.otpRefreshDuration) {
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

const postCompanyRegisterIIDetails = async (route, companyDetails) => {
    try {
        await axios.post(route, companyDetails);
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
        
        if (res.statusText === "OK") {
            const companyDetails = await res.data;
            setCompanyDetails(companyDetails);
        }
    } catch (err) {
        console.log(err);
    }
}

export { registerIValidationSchema, postCompanyRegisterIDetails, registerIIValidationSchema, postCompanyRegisterIIDetails, getCompanyDetails };