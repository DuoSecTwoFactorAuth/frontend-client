import axios from "../../utils/axios.js";

const validateEmpDetails = (values) => {
    const errors = {};
        
    if (!values.employeeId) {
        errors.employeeId = 'Employee Id is required';
    } 
    
    if (!values.name) {
        errors.name = 'Employee Name is required';
    }
    
    if (!values.emailId) {
        errors.emailId = 'Employee Email Id is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
        errors.emailId = 'Invalid email id is provided';
    };

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Employee Phone No is required';
    } 

    return errors;
};

const addEmployee = async (route, jwtToken, employeeDetails, clearFields, setEmployeesDetails, toast) => {
    try {
        const res = await axios.post(route, employeeDetails, {
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        });

        if (res.status === 202) {
            toast.success("Your employee has been successfully added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            clearFields({
                companyUniqueId: employeeDetails.companyUniqueId,
                employeeId: "",
                name: "",
                emailId: "",
                phoneNumber: ""
            });

            setEmployeesDetails((previousState) => {
                const empDetails = JSON.parse(JSON.stringify(employeeDetails));
                delete empDetails["companyUniqueId"];
                previousState.push(employeeDetails);
                return previousState;
            })
        }
    } catch (err) {
        console.error(err);
    }
}

export { validateEmpDetails, addEmployee };