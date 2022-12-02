import React from "react";

const Settings = () => {
    return (
        <div className="w-screen h-screen flex flex-col my-16 px-[15%]">
            <p className="py-4 text-5xl border-b-2 border-b-solid border-[#7C7C7C]">CME Group</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <p className="bg-green-500 pr-[15%] text-3xl border-r-2 border-r-solid border-[#7C7C7C]">API Key</p>
                    <div className="bg-green-500 flex flex-col">
                        <div className="flex flex-row">
                            <p>A7ey-X672-h238-Guyr</p>
                            <button>Reload</button>
                        </div>    
                        <button>Copy</button>
                    </div>
                </div>
                <div className="flex flex-row">
                    <p className="bg-red-500 pr-[15%] text-3xl border-r-2 border-r-solid border-[#7C7C7C]">Change Password</p>
                    <form className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Old Password"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                        />
                        <input
                            type="text"
                            placeholder="Retype New Password"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings;