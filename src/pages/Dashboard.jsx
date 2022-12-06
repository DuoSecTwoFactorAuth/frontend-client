import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../contexts/LoginContext.jsx";
import EmployeeTable from "../components/DashboardPage/EmployeeTable.jsx";
import Pagination from '../components/DashboardPage/Pagination.jsx';
import AddEmployeeModal from "../components/DashboardPage/AddEmployeeModal.jsx";
import axios from "../utils/axios.js";
import routes from "../utils/routes.js";

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

const Dashboard = () => {
    const { authStatus, compData } = useContext(LoginContext);
    console.log(authStatus, compData);
    
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
            <EmployeeTable employees={employeesDetails} />    

            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowAddEmpModal(true)}
            >
                Open Add Employee modal
            </button>

            <Pagination
                totalPages={pageDetails.totalPages}
                onPreviousPage={onPreviousPage}
                onPageChange={onPageChange}
                onNextPage={onNextPage}
            />

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