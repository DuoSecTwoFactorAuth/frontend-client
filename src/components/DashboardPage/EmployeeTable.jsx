import React, { useState } from "react";
import DeleteEmployeeModal from "./DeleteEmployeeModal.jsx";
import routes from "../../utils/routes.js";

const EmployeeTable = ({ employees, jwtToken, companyUniqueId, deleteEmployee, toast }) => {
    const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);

    const [employeeForDeletion, setEmployeeForDeletion] = useState({
        companyUniqueId: companyUniqueId,
        employeeId: ""
    });

    const handleDeleteEmployeeBtn = (employeeId) => {
        setEmployeeForDeletion((previousState) => {
            return { ...previousState, employeeId: employeeId}
        });
        setDeleteModalOpened(true);
    };

    const handleDeleteEmployeeModalBtn = (employeeId) => {
        deleteEmployee(routes.dashboard.deleteEmployee, jwtToken, companyUniqueId, employeeId, toast)
    };

    return (
        <>
            <div className="w-[75%] overflow-x-auto shadow-md sm:rounded-lg mt-12 self-center">
                <table className="w-full text-left text-gray-500 dark:text-gray-400 gap-y-2">
                    <thead className="text-md bg-[#D9D9D9] text-black uppercase">
                        <tr className="mb-8">
                            <th scope="col" className="px-4 py-3">
                                Employee Id
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Email ID
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Contact Number
                            </th>
                            <th scope="col" className="px-4 py-3">
                                <span>Renew</span>
                            </th>
                            <th scope="col" className="px-4 py-3">
                                <span>Delete Employee</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {employees.map((employee) => (
                            <tr
                                key={employee.employeeId}
                                className="bg-[#D9D9D9] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-4 py-3 font-medium text-[#333333] whitespace-nowrap"
                                >
                                    {employee.employeeId}
                                </th>
                                <td className="px-4 py-3 text-[#333333]">{employee.name}</td>
                                <td className="px-4 py-3 text-[#333333]">
                                    {employee.emailId}
                                </td>
                                <td className="px-4 py-3 text-[#333333]">
                                    {employee.phoneNumber}
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        type="button"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => {console.log(employee)}}
                                        className="block text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Renew
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        type="button"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => handleDeleteEmployeeBtn(employee.employeeId)}
                                        className="block text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {employees.length === 0 && (
                <div className="flex flex-row justify-center items-center text-5xl w-full h-[10%] py-[10%]">
                    <h1>No Data Available</h1>
                </div>
            )}

            <DeleteEmployeeModal
                show={isDeleteModalOpened}
                title={`Are you sure you want to delete this employee with Employee Id: ${employeeForDeletion.employeeId}`}
                onConfirmationCallback={() => handleDeleteEmployeeModalBtn(employeeForDeletion)}
                onCloseCallback={() => setDeleteModalOpened(false)}
            />
        </>
    );
};

export default EmployeeTable;