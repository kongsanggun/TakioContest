import React from "react";

const ModalComfirm = ({ onOpenAlert, onConfirm, data } : any,) => {

    const inputButton= "text-sm sm:text-base text-[#F9F9FB] hover:text-[#3E484A] font-['SDKukdetopokki'] py-1 w-[100px] h-auto rounded-3xl bg-gradient-to-r from-[#ADE9F1] to-[#0A96E9] duration-300";
    const inputButton2= "text-sm sm:text-base text-[#245A8D] hover:text-[#3E484A] font-['SDKukdetopokki-Lt'] py-1 w-[100px] h-auto bg-[#F9F9FB] rounded-3xl border-[2px] border-[#245A8D] duration-300";

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className = "w-full h-full" onClick={onOpenAlert}></div>
            <div className="bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[500px] px-2 sm:px-4 py-2 sm:py-4 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">알림</h3>
                </div>
                <div className='flex flex-col items-start w-auto h-auto my-8 text-base text-left font-["SDKukdetopokki-Lt"]'>
                    {data}
                </div>
                <div className="flex flex-col sm:flex-row text-[#121316] text-sm items-center">
                    <button className={inputButton + " mb-4 sm:mb-0 sm:mr-4"} onClick={onConfirm}>확인</button>
                    <button className={inputButton2} onClick={onOpenAlert}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default ModalComfirm;