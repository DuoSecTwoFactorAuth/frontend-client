import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../contexts/LoginContext.jsx";
import EmployeeTable from "../components/DashboardPage/EmployeeTable.jsx";
import Pagination from '../components/DashboardPage/Pagination.jsx';
import AddEmployeeModal from "../components/DashboardPage/AddEmployeeModal.jsx";
import axios from "../utils/axios.js";
import routes from "../utils/routes.js";
import plusLogo from "../assets/logos/plus.svg";

const getAllEmployees = async (route, jwtToken, companyUniqueId, pageNo, setEmployeesDetails, setPageDetails) => {
    try {
        const res = await axios.post(route, {
            companyUniqueId: companyUniqueId,
            employeeName: "",
            sortBy: "",
            page: pageNo,
            size: 10,
            sort: true
        }, {
            headers: {
                "Authorization": "Bearer " + jwtToken
            }
        });

        if (res.status === 200) {
            const tableDetails = res.data;

            setEmployeesDetails(tableDetails.employeeData);

            setPageDetails({
                currentPage: pageNo,
                totalPages: tableDetails.totalPages,
                totalEmployees: tableDetails.totalEmployees
            })
        }
    } catch (err) {
        console.error(err);
    }
}

const deleteEmployee = async (route, jwtToken, employeeForDeletion, setEmployeesDetails, setDeleteModalOpened, toast) => {
    try {
        const res = await axios.delete(route, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
            data: employeeForDeletion
        });

        if (res.status === 202) {
            setEmployeesDetails((previousState) => {
                return previousState.filter((employee) => {
                    return employee.employeeId !== employeeForDeletion.employeeId
                });
            });

            toast.success(`Employee with Employee Id ${employeeForDeletion.employeeId} is successfully deleted.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            setDeleteModalOpened(false);
        }
    } catch (err) {
        console.error(err);
    }
};

const Dashboard = () => {
    const { authStatus, compData } = useContext(LoginContext);

    const [showAddEmpModal, setShowAddEmpModal] = useState(false);

    const [employeesDetails, setEmployeesDetails] = useState([
        {
            employeeId: "",
            name: "",
            emailId: "",
            phoneNumber: ""
        }
    ]);

    const [pageDetails, setPageDetails] = useState({
        currentPage: 0,
        totalPages: 0,
        totalEmployees: 0
    })

    useEffect(() => {
        if (authStatus === true && compData !== null) {
            getAllEmployees(routes.dashboard.getAllEmployees, compData.token, compData.companyUniqueId, pageDetails.currentPage, setEmployeesDetails, setPageDetails);
        }
    }, [authStatus, compData, pageDetails.currentPage]);

    const onPreviousPage = () => {
        setPageDetails((previousState) => {
            if (previousState.currentPage > 0) {
                return { ...previousState, currentPage: previousState.currentPage - 1 }
            }

            return previousState;
        });
    }

    const onPageChange = (pageNo) => {
        setPageDetails((previousState) => {
            return { ...previousState, currentPage: pageNo };
        });
    }

    const onNextPage = () => {
        setPageDetails((previousState) => {
            if (previousState.currentPage < previousState.totalPages) {
                return { ...previousState, currentPage: previousState.currentPage + 1 }
            }

            return previousState;
        });
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-start items-center gap-y-4">
                <div className='flex flex-row justify-between w-screen'>
                    <div className='flex flex-row justify-center -mr-40 w-full'>
                        <EmployeeTable
                            employees={employeesDetails}
                            setEmployeesDetails={setEmployeesDetails}
                            jwtToken={compData.token}
                            companyUniqueId={compData.companyUniqueId}
                            deleteEmployee={deleteEmployee}
                            toast={toast}
                        />
                    </div>
                    <div className='flex flex-col w-40 justify-end'>
                        <button
                            className="ml-auto bg-[#D9D9D9] shadow hover:shadow-lg outline-none focus:outline-none mr-16 mb-6 ease-linear transition-all duration-150 rounded-full"
                            type="button"
                            onClick={() => setShowAddEmpModal(true)}
                        >
                            <img src={plusLogo} className="w-6 h-8" />
                        </button>
                    </div>
                </div>

                <div className="w-[75%] h-fit py-2 flex flex-row justify-center items-center">
                    <Pagination
                        totalPages={pageDetails.totalPages}
                        onPreviousPage={onPreviousPage}
                        onPageChange={onPageChange}
                        onNextPage={onNextPage}
                    />
                </div>
            </div>

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