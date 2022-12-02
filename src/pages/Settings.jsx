import React from "react";

const Settings = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <p className="bg-red-500 py-4 text-4xl border-b-2 border-b-solid border-black">CME Group</p>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <p>API Key</p>
                    <p>A7ey-X672-h238-Guyr</p>
                    <button>Reload</button>
                    <button>Copy</button>
                </div>
                <div>
                    <p>Change Password</p>
                    <form>
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