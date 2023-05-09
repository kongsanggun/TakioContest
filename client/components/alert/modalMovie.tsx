import React from "react";

const ModalMovie = ({ onOpenAlert, url } : any,) => {
    return (
        <div className="h-screen bg-scroll w-full fixed left-0 right-0 top-0 z-10 flex justify-center items-center bg-black bg-opacity-30 text-center duration-150" onClick={onOpenAlert}>
            <div className="bg-white rounded-lg w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[720px] max-h-[520px] px-5 py-5 drop-shadow-xl flex justify-center items-center" onClick={function(){}}>
                <iframe className="w-[70vw] h-[calc(70vw/3*2)] max-w-[720px] max-h-[480px]" src={"https://www.youtube-nocookie.com/embed/" + url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default ModalMovie;