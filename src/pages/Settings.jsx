import React, { useState, useEffect, useContext } from "react";
import copy from "copy-to-clipboard";
import { sha256 } from 'crypto-hash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  } else if (
    values.oldPassword !== "" &&
    values.newPassword !== "" &&
    values.newPassword === values.oldPassword
  ) {
    errors.newPassword = "Your new password is same as your old password";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Please retype your new password";
  } else if (
    values.newPassword !== "" &&
    values.confirmNewPassword !== "" && 
    values.newPassword !== values.oldPassword && 
    values.confirmNewPassword !== values.newPassword
  ) {
    errors.confirmNewPassword =
      "Your retyped password is not as same as your new password";
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
      getApiKey(
        routes.settings.getApiKey,
        compData.companyUniqueId,
        false,
        compData.token,
        setApiKey
      );
    }
  }, [authStatus, compData]);

  const getApiKey = async (
    route,
    companyUniqueId,
    apiKeyGenerated,
    jwtToken,
    setApiKey
  ) => {
    try {
      const res = await axios.post(
        route,
        {
          companyUniqueId: companyUniqueId,
          generateApiKey: apiKeyGenerated,
        },
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      if (res.status === 200) {
        const { apiKey } = res.data;
        setApiKey(apiKey);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshApiKey = () => {
    getApiKey(
      routes.settings.getApiKey,
      compData.companyUniqueId,
      true,
      compData.token,
      setApiKey
    );
  };

  const copyToClipboard = () => {
    copy(apiKey);
    toast.success(`Copied to clipboard.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const changePassword = async (route, jwtToken, password, toast) => {
    try {
      const res = await axios.post(route, password, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      if (res.status === 200) {
        toast.success("Your password has been successfully changed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        toast.error(
          "You have entered wrong current password. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    }
  };

  const handleChangePassword = (event) => {
    setPassword((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmitChangePassword = async(event) => {
    event.preventDefault();

    const formErrors = passwordValidationSchema(password);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // creating deep copy of password obj
      const changePasswordDetails = JSON.parse(JSON.stringify(password));

      changePasswordDetails.companyUniqueId = compData.companyUniqueId;

      const hashedOldPassword = await sha256(changePasswordDetails.oldPassword);
      changePasswordDetails.oldPassword = hashedOldPassword;

      const hashedNewPassword = await sha256(changePasswordDetails.newPassword);
      changePasswordDetails.newPassword = hashedNewPassword;

      delete changePasswordDetails["confirmNewPassword"];
      
      changePassword(
        routes.settings.changePassword,
        compData.token,
        changePasswordDetails,
        toast
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen place-items-center w-screen">
        <div className="flex flex-col w-4/5 h-screen">
          <h1 className="font-semibold text-3xl text-[#333533] p-6 border-b-2 border-[#D9D9D9]">
            {compData.companyName}
          </h1>
          <div className="grid grid-cols-3 gap-y-6 gap-x-20 h-full pt-10 pb-32">
            <div className="grid grid-rows-3 h-full">
              <div className="w-full p-8">
                <h1 className="text-2xl">API Key</h1>
              </div>
              <div className="row-span-2 w-full p-8">
                <h1 className="text-2xl">Change Password</h1>
              </div>
            </div>
            <div className="col-span-2 grid grid-rows-3 h-full border-l-2 border-[#D9D9D9]">
              <div className="flex flex-col justify-between w-full p-8">
                <div className="flex flex-row items-center gap-x-8">
                  <input
                    type="text"
                    placeholder="Api Key"
                    value={apiKey}
                    className="rounded-md bg-[#D9D9D9]"
                    disabled
                  />
                  <div
                    onClick={refreshApiKey}
                    className="flex flex-row place-items-center justify-center w-10 h-10 rounded-full bg-[#333533] cursor-pointer"
                  >
                    <img src={refreshLogo} alt="refresh btn" className="w-5" />
                  </div>
                </div>
                <div
                  onClick={copyToClipboard}
                  className="flex flex-row justify-center place-items-center px-9 py-2 w-fit  gap-x-2 rounded-full bg-[#333533] cursor-pointer"
                >
                  <img src={copyLogo} alt="copy btn" className="w-6 h-6" />
                  <p className="text-white text-lg">Copy</p>
                </div>
              </div>
              <div className="row-span-2 p-8 w-1/2">
                <form
                  className="flex flex-col gap-y-12"
                  onSubmit={handleSubmitChangePassword}
                >
                  <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        name="oldPassword"
                        value={password.oldPassword}
                        onChange={handleChangePassword}
                        className="rounded-md bg-[#D9D9D9]"
                      />
                      {errors.oldPassword !== "" ? (
                        <p className="text-red-700 indent-1.5">
                          {errors.oldPassword}
                        </p>
                      ) : null}
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
                      {errors.newPassword !== "" ? (
                        <p className="text-red-700 indent-1.5">
                          {errors.newPassword}
                        </p>
                      ) : null}
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
                      {errors.confirmNewPassword !== "" ? (
                        <p className="text-red-700 indent-1.5">
                          {errors.confirmNewPassword}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row justify-start">
                    <button
                      type="submit"
                      className="px-12 text-white bg-[#333533] rounded-full"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Settings;
