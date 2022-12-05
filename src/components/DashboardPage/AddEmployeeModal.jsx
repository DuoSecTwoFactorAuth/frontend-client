import React, { useState } from "react";
import { validateEmpDetails, addEmployee } from "./form-utils.js";
import routes from "../../utils/routes.js";

const AddEmployeeModal = ({ showAddEmpModal, setShowAddEmpModal, companyUniqueId, jwtToken }) => {
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
            addEmployee(routes.dashboard.addEmployee, jwtToken, empDetails);
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
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                Modal Title
                </h3>
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
            <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main
                thing people are controlled by! Thoughts- their perception
                of themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you
                won’t do anything. I was taught I could do everything.
                </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowAddEmpModal(false)}
                >
                Close
                </button>
                <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowAddEmpModal(false)}
                >
                Save Changes
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