const routes = {
    auth: {
        login: "auth/login",
        registerI: "auth/company-register",
        registerII: "auth/store-company-details",
        forgotPassword: "auth/forgot-password"
    }, 
    companyDetails: {
        getDetails: "auth/get-company-details",
    },
    settings: {
        getApiKey: "settings/get-api-key",
        changePassword: "settings/change-password"
    }
};

export default routes;