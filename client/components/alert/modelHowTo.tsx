import React from "react";

import Image from 'next/image';
import HowToSeeNumber from '../../public/img/how-to-see-number.png';

const ModelHowTo = ({ onOpenAlert }: any) => {

    const inputButton = "text-sm sm:text-base text-[#245A8D] hover:text-[#3E484A] hover:border-[#3E484A] font-['SDKukdetopokki-Lt'] py-1 w-[100px] h-auto bg-[#F9F9FB] hover:bg-[#E5FBFD] rounded-3xl border-[2px] border-[#245A8D] duration-300";
    const seglink = "text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']"

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className="z-10 w-full h-full" onClick={onOpenAlert}></div>
            <div className="z-20 bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] min-w-[250px] max-w-[450px] px-2 sm:px-5 py-2 sm:py-5 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="z-30 w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">북번호를 확인하는 방법</h3>
                </div>
                <div className="z-30 w-full h-auto text-[#121316] px-2 py-6 font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                    <Image src={HowToSeeNumber} className='w-[150px] sm:w-[300px] h-[122px] sm:h-[244px] drop-shadow-md' alt='북번호를 확인하는 방법' title="북번호 확인법"></Image>
                    <div className='flex flex-col items-start w-auto h-auto mt-8 text-sm text-left sm:text-base'>
                        <div className='w-full h-auto mb-2'>- <a className={seglink} href="https://donderhiroba.jp" target="_blank" rel="noopener noreferrer"><u>동더히로바</u></a>에 접속하여 로그인을 진행한다. </div>
                        <div className='w-full h-auto'>- 로그인 완료 후 메인화면에 있는 <span className="font-['SDKukdetopokki']">북번호(화살표) 숫자 12글자</span>를 가져와서 붙혀넣는다. (윗 그림 참조)</div>
                    </div>
                    <div className="flex flex-col sm:flex-row text-[#121316] text-sm items-center mt-4">
                        <button className={inputButton} onClick={onOpenAlert}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelHowTo;