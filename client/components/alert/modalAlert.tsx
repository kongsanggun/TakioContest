import React from "react";

const ModalAlert = ({ onOpenAlert, data } : any,) => {
    return (
        <div className="h-screen w-full fixed left-0 right-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center" onClick={onOpenAlert}>
            <div className="bg-white rounded w-10/12 md:w-1/3 drop-shadow-xl" onClick={function(){}}>
                <div className="border-b border-b-[#dfe0ea] px-4 py-2 flex justify-between items-center">
                    <h3 className="font-['SDKukdetopokki'] text-base">🚫 경고 🚫</h3>
                </div>
                <div className="text-gray-500 text-sm px-4 py-8 font-['SDKukdetopokki-Lt']">
                    {data}
                </div>
            </div>
        </div>
    )
}

export default ModalAlert;