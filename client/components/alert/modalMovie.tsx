import React from "react";
import { Oval } from "react-loader-spinner"

const ModalMovie = ({ onOpenAlert, url }: any,) => {

    const Loading = () => {
        return (
            <div className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-full">
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
            <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center bg-scroll bg-black bg-opacity-30">
                <div className = "w-full h-full" onClick={onOpenAlert}></div>
                <div className="bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[720px] max-h-[520px] px-5 py-5 drop-shadow-xl flex fixed justify-center items-center">
                    <iframe className="w-[70vw] h-[calc(70vw/3*2)] max-w-[720px] max-h-[480px] z-20" src={"https://www.youtube-nocookie.com/embed/" + url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <Loading />
                </div>
            </div>
        </>

    )
}

export default ModalMovie;