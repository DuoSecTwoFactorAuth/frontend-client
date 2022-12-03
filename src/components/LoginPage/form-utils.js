const loginValidationSchema = (values) => {
    const errors = {};
    
    if (!values.companyEmailId) {
        errors.companyEmailId = 'Company EmailId is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.companyEmailId)) {
        errors.companyEmailId = 'Invalid email address';
    };

    if (!values.password) {
        errors.password = "Password is required";
    };

    return errors;
};

export { loginValidationSchema };