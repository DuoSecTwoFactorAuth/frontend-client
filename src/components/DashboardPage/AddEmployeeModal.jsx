import React, { useState } from "react";
import { validateEmpDetails, addEmployee } from "./form-utils.js";
import routes from "../../utils/routes.js";

const AddEmployeeModal = ({ setEmployeesDetails, showAddEmpModal, setShowAddEmpModal, companyUniqueId, jwtToken, toast }) => {
    if (!showAddEmpModal) {
        return null;
    }

    const [empDetails, setEmpDetails] = useState({
        companyUniqueId: companyUniqueId,
        employeeId: "",
        name: "",
        emailId: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState({
        employeeId: "",
        name: "",
        emailId: "",
        phoneNumber: ""
    });

    const handleChangeEmpDetails = (event) => {
        setEmpDetails((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value }
        });
    }

    const handleSubmitEmpDetails = (event) => {
        event.preventDefault();

        const formErrors = validateEmpDetails(empDetails);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            addEmployee(routes.dashboard.addEmployee, jwtToken, empDetails, setEmpDetails, setEmployeesDetails, toast);
        }
    }

  return (
    <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between gap-x-8 p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Enter Employee Details</h3>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowAddEmpModal(false)}
                    data-modal-toggle="defaultModal"
                >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>                    
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col flex-auto">
                <form
                    id="empForm"
                    className="flex flex-col gap-y-8"          
                    onSubmit={handleSubmitEmpDetails}
                    noValidate
                >
                    <div className="flex flex-col gap-y-2">             
                        <input
                            type="text"
                            placeholder="Employee Id"
                            className="rounded-md bg-[#D9D9D9]"          
                            name="employeeId"          
                            value={empDetails.employeeId}     
                            onChange={handleChangeEmpDetails}          
                        />   
                        {errors.employeeId !== "" ? <p className="text-red-700 indent-1">{errors.employeeId}</p>: null}              
                    </div>
                    <div className="flex flex-col gap-y-2">                    
                        <input
                            type="text"
                            placeholder="Employee Name"
                            className="rounded-md bg-[#D9D9D9]"              
                            name="name"          
                            value={empDetails.name}      
                            onChange={handleChangeEmpDetails}          
                        />
                        {errors.name !== "" ? <p className="text-red-700 indent-1">{errors.name}</p>: null}                            
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <input
                            type="email"
                            placeholder="Employee Email Id"
                            className="rounded-md bg-[#D9D9D9]"          
                            name="emailId"          
                            value={empDetails.emailId}      
                            onChange={handleChangeEmpDetails}          
                        />
                        {errors.emailId !== "" ? <p className="text-red-700 indent-1">{errors.emailId}</p>: null}                            
                    </div>    
                    <div className="flex flex-col gap-y-2">
                        <input
                            type="tel"
                            placeholder="Employee Phone No"
                            maxLength="10"
                            className="rounded-md bg-[#D9D9D9]"          
                            name="phoneNumber"          
                            value={empDetails.phoneNumber}      
                            onChange={handleChangeEmpDetails}          
                        /> 
                        {errors.phoneNumber !== "" ? <p className="text-red-700 indent-1">{errors.phoneNumber}</p>: null}                            
                    </div>
                </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button              
                    className="text-white bg-red-500 hover:bg-red-700 background-transparent font-bold uppercase text-sm px-6 py-2 rounded shadow outline-none hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowAddEmpModal(false)}
                >
                    Close
                </button>
                <button
                    type="submit"
                    form="empForm"              
                    className="text-white bg-[#333533] hover:bg-[#303130] font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Add Employee
                </button>
            </div>
            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddEmployeeModal;