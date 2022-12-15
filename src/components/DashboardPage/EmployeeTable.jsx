import React, { useState } from "react";
import DeleteEmployeeModal from "./DeleteEmployeeModal.jsx";
import routes from "../../utils/routes.js";

const EmployeeTable = ({ employees, setEmployeesDetails, jwtToken, companyUniqueId, deleteEmployee, toast }) => {
	const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);

	const [employeeForDeletion, setEmployeeForDeletion] = useState({
		companyUniqueId: companyUniqueId,
		employeeId: ""
	});

	const handleDeleteEmployeeBtn = (employeeId) => {
		setEmployeeForDeletion((previousState) => {
			return { ...previousState, employeeId: employeeId }
		});
		setDeleteModalOpened(true);
	};

	const handleDeleteEmployeeModalBtn = (employeeForDeletion) => {
		deleteEmployee(routes.dashboard.deleteEmployee, jwtToken, employeeForDeletion, setEmployeesDetails, setDeleteModalOpened, toast);
	};

	return (
		<>
			<div className="w-[80%] overflow-x-auto shadow-md sm:rounded-lg mt-8 self-center">
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="p-1.5 w-full inline-block align-middle">
							<div className="overflow-hidden border rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-left text-gray-500 uppercase "
											>
												Employee ID
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-left text-gray-500 uppercase "
											>
												Employee Name
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-left text-gray-500 uppercase "
											>
												Email ID
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-left text-gray-500 uppercase "
											>
												Contact Number
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-center text-gray-500 uppercase "
											>
												Renew
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-sm font-bold text-center text-gray-500 uppercase "
											>
												Delete
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{employees.map((employee) => (
											<tr
												className="hover:bg-gray-100"
												key={employee.employeeId}
											>
												<td
													className="px-6 py-2 text-sm font-bold text-gray-800 whitespace-nowrap"
												>
													{employee.employeeId}
												</td>
												<td className="px-6 py-2 text-sm text-gray-800 whitespace-nowrap">{employee.name}</td>
												<td className="px-6 py-2 text-sm text-gray-800 whitespace-nowrap">
													{employee.emailId}
												</td>
												<td className="px-6 py-2 text-sm text-gray-800 whitespace-nowrap">
													{employee.phoneNumber}
												</td>
												<td className="px-6 py-2 text-sm font-medium text-center whitespace-nowrap">
													<button
														type="button"
														data-modal-toggle="popup-modal"
														onClick={() => { console.log(employee) }}
														className="text-green-500 hover:text-green-700"
													>
														Renew
													</button>
												</td>
												<td className="px-6 py-2 text-sm font-medium text-center whitespace-nowrap">
													<button
														type="button"
														data-modal-toggle="popup-modal"
														onClick={() => handleDeleteEmployeeBtn(employee.employeeId)}
														className="text-red-500 hover:text-red-700"
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
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