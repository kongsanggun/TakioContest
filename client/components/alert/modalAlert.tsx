import React from "react";

const ModalAlert = ({ onOpenAlert, data }: any,) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className="w-full h-full" onClick={onOpenAlert}></div>
            <div className="bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] min-w-[200px] max-w-[400px] px-2 sm:px-4 py-2 sm:py-4 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
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