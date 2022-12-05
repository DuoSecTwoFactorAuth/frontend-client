import axios from "../../utils/axios.js";

const validateEmpDetails = (values) => {
    const errors = {};
        
    if (!values.employeeId) {
        errors.employeeId = 'Employee Id is required';
    } 
    
    if (!values.name) {
        errors.name = 'Employee name is required';
    }
    
    if (!values.emailId) {
        errors.emailId = 'Employee EmailId is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
        errors.emailId = 'Invalid email address';
    };

    if (!values.phoneNumber) {
        errors.phone = 'Employee phone no is required';
    } 

    return errors;
};

const addEmployee = async (route, jwtToken, empDetails) => {
    try {
        const res = await axios.post(route, empDetails, {
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export { validateEmpDetails, addEmployee };