const routes = {
  auth: {
    login: "auth/login",
    registerI: "auth/company-register",
    registerII: "auth/store-company-details",
    forgotPassword: "auth/forgot-password",
  },
  companyDetails: {
    getDetails: "auth/get-company-details",
  },
  settings: {
    getApiKey: "settings/get-api-key",
    changePassword: "settings/change-password",
  },
  dashboard: {
    addEmployee: "/add-employee-from-ui",
    deleteEmployee: "/delete-employee-from-ui",
    getAllEmployees: "/get-all-employee",
  },
  qrCode: {
    getQRCode: "/get-qr-code?companyEmployeeHash=",
  }
};

export default routes;
