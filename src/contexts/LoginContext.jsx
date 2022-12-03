import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";

export const LoginContext = createContext({
  authStatus: false,
  compData: null,
  setUserAuthStatus: () => {},
  setUser: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

export const LoginProvider = (props) => {
    const [authStatus, setAuthStatus] = useState(false);
    const [compData, setCompData] = useState(null);

    const navigate = useNavigate();

    // useEffect(() => {
        
    // }, [userAuthStatus, user]);

    async function handleLogin(url, payload, setErrors) {
        try {
            const res = await axios.post(url, payload);
            const compData = await res.data;
            
            console.log(compData);
            sessionStorage.setItem("auth", JSON.stringify(compData));

            setAuthStatus(true);
            setCompData(compData);

            navigate("/dashboard", {replace: true});
        } catch (err) {
            // if (err.response && err.response.status === 406) {
            //     setErrors({ password: "You have entered a wrong password" });
            // }
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