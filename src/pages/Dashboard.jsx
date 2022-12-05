import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import AddEmployeeModal from "../components/DashboardPage/AddEmployeeModal.jsx";
import { LoginContext } from "../contexts/LoginContext.jsx";

const Dashboard = () => {
    const { authStatus, compData } = useContext(LoginContext);
    
    const [showAddEmpModal, setShowAddEmpModal] = useState(false);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map(item => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>

            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowAddEmpModal(true)}
            >
                Open Add Employee modal
            </button>

            <AddEmployeeModal
                showAddEmpModal={showAddEmpModal}
                setShowAddEmpModal={setShowAddEmpModal}
                companyUniqueId={compData.companyUniqueId}
                jwtToken={compData.token}
                toast={toast}
            />

            <ToastContainer />
        </>
    );
};

export default Dashboard;