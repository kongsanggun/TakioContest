import React from "react";

import Image from 'next/image';
import SnomAngry from '../../public/img/snom-angry.png';

const NualmotAlert = ({ onOpenAlert, onConfirm } : any,) => {

    const inputButton= "text-sm sm:text-base text-[#F9F9FB] hover:text-[#3E484A] font-['SDKukdetopokki'] py-3 w-[150px] h-auto rounded-3xl bg-gradient-to-r from-[#ADE9F1] to-[#0A96E9] duration-300";
    const inputButton2= "text-sm sm:text-base text-[#245A8D] hover:text-[#3E484A] font-['SDKukdetopokki-Lt'] py-3 w-[150px] h-auto bg-[#F9F9FB] rounded-3xl border-[2px] border-[#245A8D] duration-300";

    return (
        <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-screen text-center duration-150 bg-scroll bg-black bg-opacity-30">
            <div className = "w-full h-full" onClick={onOpenAlert}></div>
            <div className="bg-white rounded-lg w-[70vw] h-[calc(70vw/3*2 + 40px)] max-w-[720px] px-2 sm:px-5 py-2 sm:py-5 drop-shadow-xl flex flex-col fixed justify-center items-center">
                <div className="w-full h-auto border-b border-b-[#dfe0ea] px-2 py-2 flex justify-between items-center text-center">
                    <h3 className="font-['SDKukdetopokki'] text-base sm:text-xl">😡 누알못 발언이 감지 되었습니다. 😡</h3>
                </div>
                <div className="w-full h-auto text-gray-500 px-4 py-8 font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                    <Image src={SnomAngry} className='w-[80%] h-[auto] max-h-[480px]' alt='누알못을 감지한 누니머기'></Image>
                    <div className='flex flex-col items-start w-auto h-auto my-8 text-sm text-left sm:text-base'>
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