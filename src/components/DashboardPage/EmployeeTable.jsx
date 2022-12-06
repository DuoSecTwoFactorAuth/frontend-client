import React, { useState } from "react";
import DeleteEmployeeModal from "./DeleteEmployeeModal.jsx";

const EmployeeTable = ({ employees }) => {
    const [employeeForDeletion, setEmployeeForDeletion] = useState({});

    const btnHandleEmployeeDeletion = (employee) => {
        setEmployeeForDeletion(employee);
        setDeleteModalOpened(true);
    };

    const handleEmployeeDeleteModalBtn = (event) => {
        if (Object.keys(studentForDeletion).length !== 0) {
            deleteStudent(event, studentForDeletion.username, setDeleteModalOpened);
        }
    };

    return (
        <>
            <div className="w-[75%] overflow-x-auto shadow-md sm:rounded-lg mt-12 self-center">
                <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xl bg-[#D9D9D9] text-black uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Employee Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span>Renew</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span>Delete Employee</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.employeeId}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-[#333333] whitespace-nowrap"
                                >
                                    {employee.employeeId}
                                </th>
                                <td className="px-6 py-4 text-[#333333]">{employee.name}</td>
                                <td className="px-6 py-4 text-[#333333]">
                                    {employee.emailId}
                                </td>
                                <td className="px-6 py-4 text-[#333333]">
                                    {employee.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => {console.log(employee)}}
                                        className="block text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Renew
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => {console.log(employee)}}
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

            {/* <DeleteUserModal
                title={`Are you sure you want to delete this employee with Employee Id ${employeeForDeletion.employeeId}`}
                show={isDeleteModalOpened}
                username={studentForDeletion.username}
                onConfirmationCallback={handleStudentDeleteModalBtn}
                onCloseCallback={() => setDeleteModalOpened(false)}
            /> */}
        </>
    );
};

export default EmployeeTable;