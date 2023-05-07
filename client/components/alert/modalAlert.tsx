import React from "react";

const ModalAlert = ({ onOpenAlert, data } : any,) => {
    return (
        <div className="h-screen w-full fixed left-0 right-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
            <div className="bg-white rounded w-10/12 md:w-1/3">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-extrabold">경고</h3>
                    <span onClick={onOpenAlert}>

                    </span>
                </div>
                <div className="text-gray-500 text-sm px-4 py-8">
                    {data}
                </div>
                <div className="flex justify-end items-center w-100 border-tp-3 text-gray-500">
                    <button onClick={onOpenAlert} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white">
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAlert;