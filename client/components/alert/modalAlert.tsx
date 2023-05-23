import React from "react";

const ModalAlert = ({ onOpenAlert, data } : any,) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className = "w-full h-full" onClick={onOpenAlert}></div>
            <div className="bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[500px] px-2 sm:px-4 py-2 sm:py-4 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">알림</h3>
                </div>
                <div className="w-full h-auto text-[#121316] px-4 py-8 font-['SDKukdetopokki-Lt'] flex flex-col items-center text-base">
                    {data}
                </div>
            </div>
        </div>
    )
}

export default ModalAlert;