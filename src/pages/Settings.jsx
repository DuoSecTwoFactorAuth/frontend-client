import React, {useState, useEffect, useContext} from "react";
import copy from "copy-to-clipboard";
import { LoginContext } from "../contexts/LoginContext.jsx";
import axios from "../utils/axios.js";
import routes from "../utils/routes.js";
import refreshLogo from "../assets/logos/refresh.svg";
import copyLogo from "../assets/logos/copy.svg";

const passwordValidationSchema = (values) => {
    const errors = {};

    if (!values.oldPassword) {
        errors.oldPassword = "Old password is required";
    }

    if (!values.newPassword) {
        errors.newPassword = "New password is required";
    } else if (values.oldPassword !== "" && values.newPassword === values.oldPassword) {
        errors.newPassword = "Your new password is same as your old password";
    }

    if (!values.confirmNewPassword) {
        errors.confirmNewPassword = "Please retype your new password";
    } else if (values.newPassword !== "" && values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = "Your retyped password is not as same as your new password";
    }

    return errors;
};

const Settings = () => {
    const [apiKey, setApiKey] = useState("");

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    
    const { authStatus, compData } = useContext(LoginContext);

    useEffect(() => {
        if (authStatus && compData !== null) {
            getApiKey(routes.settings.getApiKey, compData.companyUniqueId, false, compData.token, setApiKey);
        }
    }, [authStatus, compData]);

    const getApiKey = async(route, companyUniqueId, apiKeyGenerated, jwtToken, setApiKey) => {
        try {
            const res = await axios.post(route, {
                companyUniqueId: companyUniqueId,
                generateApiKey: apiKeyGenerated
            }, {
                headers: {
                    'Authorization': 'Bearer ' + jwtToken
                }
            });
            
            if (res.status === 200) {
                const { apiKey } = res.data;
                setApiKey(apiKey);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const refreshApiKey = () => {
        getApiKey(routes.settings.getApiKey, compData.companyUniqueId, true, compData.token, setApiKey);
    }

    const copyToClipboard = () => {
        copy(apiKey);
        alert(`You have copied API KEY: "${apiKey}" to clipboard.`);
    }

    const changePassword = async(route, jwtToken, password) => {
        try {
            const res = await axios.post(route, password, {
                headers: {
                    'Authorization': 'Bearer ' + jwtToken
                }
            });

            if (res.statusCode === 200) {
                console.log("Password is successfully Changed");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePassword = (event) => {
        setPassword((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        })
    }

    const handleSubmitChangePassword = (event) => {
        event.preventDefault();
        
        const formErrors = passwordValidationSchema(password);
        setErrors(formErrors);
        
        delete password["confirmNewPassword"];
        password["companyUniqueId"] = compData.companyUniqueId;
        
        if (Object.keys(formErrors).length === 0) {
            console.log(formErrors);
            console.log(password);
            changePassword(routes.settings.changePassword, compData.token, password);
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col px-[15%]">
            <p className="py-4 text-5xl border-b-2 border-b-solid border-[#7C7C7C]">{"Example Group"}</p>
            <div className="flex flex-col gap-16">
                <div className="mt-16 flex flex-row">
                    <p className="pr-[30%] text-3xl border-r-2 border-r-solid border-[#7C7C7C]">API Key</p>
                    <div className="ml-[10%] flex flex-col gap-y-8">
                        <div className="flex flex-row items-center gap-x-8">
                            <input
                                type="text"
                                placeholder="Api Key"
                                value={apiKey}
                                className="rounded-md bg-[#D9D9D9]"
                                disabled
                            />
                            <button onClick={refreshApiKey} className="w-16 h-16 rounded-full bg-[#333533]"><img src={refreshLogo} alt="refresh btn" /></button>
                        </div> 
                        <button onClick={copyToClipboard} className="px-12 w-fit flex flex-row justify-center items-center gap-x-2 rounded-full bg-[#333533]">
                            <img src={copyLogo} alt="copy btn" className="w-8 h-8" />
                            <p className="text-white text-lg">Copy</p>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row">
                    <p className="pr-[17.5%] text-3xl border-r-2 border-r-solid border-[#7C7C7C]">Change Password</p>
                    <form className="ml-[10%] flex flex-col gap-y-12" onSubmit={handleSubmitChangePassword}>
                        <div className="flex flex-col gap-y-8">
                            <div className="flex flex-col gap-y-4">
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    value={password.oldPassword}
                                    onChange={handleChangePassword}
                                    className="rounded-md bg-[#D9D9D9]"
                                />
                                {errors.oldPassword !== "" ? <p className="text-red-700 indent-1.5">{errors.oldPassword}</p>: null}
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={password.newPassword}
                                    onChange={handleChangePassword}
                                    className="rounded-md bg-[#D9D9D9]"
                                />
                                {errors.newPassword !== "" ? <p className="text-red-700 indent-1.5">{errors.newPassword}</p>: null}
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <input
                                    type="password"
                                    placeholder="Retype New Password"
                                    name="confirmNewPassword"
                                    value={password.confirmNewPassword}
                                    onChange={handleChangePassword}
                                    className="rounded-md bg-[#D9D9D9]"
                                />
                                {errors.confirmNewPassword !== "" ? <p className="text-red-700 indent-1.5">{errors.confirmNewPassword}</p>: null}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            <button type="submit" className="px-12 text-white bg-[#333533] rounded-full">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings;