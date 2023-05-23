import React from "react";

import Image from 'next/image';
import HowToSeeNumber from '../../public/img/how-to-see-number.png';

const ModelHowTo = ({ onOpenAlert }: any) => {

    const seglink = "text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']"

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className="w-full h-full" onClick={onOpenAlert}></div>
            <div className="bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[720px] px-2 sm:px-5 py-2 sm:py-5 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">북번호를 확인하는 방법</h3>
                </div>
                <div className="w-full h-auto text-[#121316] px-2 py-6 font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                    <Image src={HowToSeeNumber} className='w-[150px] h-[122px] drop-shadow-md' alt='북번호를 확인하는 방법'></Image>
                    <div className='flex flex-col items-start w-auto h-auto mt-8 text-sm text-left sm:text-base'>
                        <div className='w-full h-auto mb-2'>- <a className={seglink} href="https://donderhiroba.jp" target="_blank" rel="noopener noreferrer"><u>동더히로바</u></a>에 접속하여 로그인을 진행한다. </div>
                        <div className='w-full h-auto'>- 로그인 완료 후 메인화면에 있는 <span className="font-['SDKukdetopokki']">북번호(화살표) 숫자 12글자</span>를 가져와서 붙혀넣는다.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelHowTo;