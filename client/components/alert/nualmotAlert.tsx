import React from "react";

import Image from 'next/image';
import SnomAngry from '../../public/img/snom-angry.png';

const NualmotAlert = ({ onOpenAlert, onConfirm }: any,) => {

    const inputButton = "text-sm sm:text-base text-[#F9F9FB] hover:text-[#3E484A] font-['SDKukdetopokki'] py-1 w-[160px] h-auto rounded-3xl bg-gradient-to-r from-[#ADE9F1] to-[#0A96E9] duration-300";
    const inputButton2 = "text-sm sm:text-base text-[#245A8D] hover:text-[#3E484A] font-['SDKukdetopokki-Lt'] py-1 w-[160px] h-auto bg-[#F9F9FB] rounded-3xl border-[2px] border-[#245A8D] duration-300";

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className="z-10 w-full h-full" onClick={onOpenAlert}></div>
            <div className="z-20 bg-white border-2 border-gray-300 rounded-xl w-[70vw] h-[calc(70vw/3*2 + 40px)] min-w-[250px] max-w-[450px] px-2 sm:px-4 py-2 sm:py-4 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="z-30 w-full h-auto border-b border-b-[#dfe0ea] pb-2 flex justify-center items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2 fill-rose-600">
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm72.4-118.5c9.7-9 10.2-24.2 1.2-33.9C315.3 344.3 290.6 328 256 328s-59.3 16.3-73.5 31.6c-9 9.7-8.5 24.9 1.2 33.9s24.9 8.5 33.9-1.2c7.4-7.9 20-16.4 38.5-16.4s31.1 8.5 38.5 16.4c9 9.7 24.2 10.2 33.9 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z"/>
                    </svg>
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">누알못 발언 감지</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 ml-2 fill-rose-600">
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm72.4-118.5c9.7-9 10.2-24.2 1.2-33.9C315.3 344.3 290.6 328 256 328s-59.3 16.3-73.5 31.6c-9 9.7-8.5 24.9 1.2 33.9s24.9 8.5 33.9-1.2c7.4-7.9 20-16.4 38.5-16.4s31.1 8.5 38.5 16.4c9 9.7 24.2 10.2 33.9 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z"/>
                    </svg>
                </div>
                <div className="z-30 w-full h-auto text-[#121316] px-2 py-6 font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                    <Image src={SnomAngry} className='w-[120px] h-[85px]' alt='누알못을 감지한 누니머기' title="누니머기는 엉덩이가 아니다!"></Image>
                    <div className='flex flex-col items-start w-auto h-auto my-8 text-base text-left'>
                        <div className='w-full h-auto'>참가자 이름을 <span className="font-['SDKukdetopokki']">누알못 발언</span>으로 정해서 참가하는 건 위반은 아니지만</div>
                        <div className='w-full h-auto'><span className="font-['SDKukdetopokki']">거짓사실</span>을 퍼트리는 행위는 <span className="font-['SDKukdetopokki']">매우 좋지 않는 행위</span>입니다.</div>
                        <div className='w-full h-auto'>참가를 계속하시겠습니까?</div>
                    </div>
                    <div className="flex flex-col sm:flex-row text-[#121316] text-sm items-center">
                        <button className={inputButton + " mb-4 sm:mb-0 sm:mr-4"} onClick={onOpenAlert}>저는 누잘알입니다.</button>
                        <button className={inputButton2} onClick={onConfirm}>저는 누알못입니다.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NualmotAlert;