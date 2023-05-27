import React from "react";
import { Oval } from "react-loader-spinner"

const ModalMovie = ({ onOpenAlert, url }: any,) => {

    const Loading = () => {
        return (
            <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-center w-full h-full">
                <Oval
                    height={50}
                    width={50}
                    color="#1973AA"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#1973AA"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        )
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full text-center bg-scroll bg-black bg-opacity-30">
                <div className="z-10 w-full h-full" onClick={onOpenAlert}></div>
                <div className="z-20 bg-white border-2 border-gray-300 rounded-xl w-auto h-auto max-w-[720px] max-h-[561px] pt-3 pb-5 py-5 drop-shadow-xl flex fixed flex-col justify-center items-center">
                    <div className="w-full h-auto border-b border-b-[#dfe0ea] pb-2 sm:pb-3 px-2 sm:px-5 flex justify-end items-center text-center z-40">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 sm:w-7 sm:h-7" onClick={onOpenAlert}>
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                    <iframe className="z-40 w-[70vw] h-[calc(70vw/3*2)] max-w-[720px] max-h-[480px]" src={"https://www.youtube-nocookie.com/embed/" + url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <Loading />
                </div>
            </div>
        </>

    )
}

export default ModalMovie;