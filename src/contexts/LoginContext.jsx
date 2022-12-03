import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "../utils/axios.js";

export const LoginContext = createContext({
  authStatus: false,
  compData: null,
  setUserAuthStatus: () => {},
  setCompData: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

export const LoginProvider = (props) => {
    const [authStatus, setAuthStatus] = useState(false);
    const [compData, setCompData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const compData = JSON.parse(sessionStorage.getItem("auth"));
        if (compData !== null) {
            setAuthStatus(true);
            setCompData(compData);
        }
    }, []);

    async function handleLogin(url, payload, setErrors) {
        try {
            const res = await axios.post(url, payload);
            const compData = await res.data;
            
            sessionStorage.setItem("auth", JSON.stringify(compData));

            setAuthStatus(true);
            setCompData(compData);

            navigate("/company/dashboard", {replace: true});
        } catch (err) {
            if (err.response && err.response.status === 500) {
                setErrors({ invalidCredentials: "You have entered either invalid email or password" });
            }
        }
    }

    const handleLogout = () => {
        sessionStorage.clear();
        setCompData(null);
        setAuthStatus(false);
        navigate("/", { replace: true });
    };

    const contextValue = {
        authStatus,
        compData,
        setAuthStatus,
        setCompData,
        handleLogin,
        handleLogout,
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {props.children}
        </LoginContext.Provider>
    );
};