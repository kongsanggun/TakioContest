import React from "react";
import { confirmAlert } from 'react-confirm-alert';

import Image from 'next/image';
import SnomAngry from '../../public/img/snom-angry.png';

const NualmotAlert = ({ onOpenAlert, data } : any,) => {
    return (
        <div className="h-screen w-full fixed left-0 right-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center" onClick={onOpenAlert}>
            <div className="bg-white rounded w-10/12 md:w-1/2 drop-shadow-xl" onClick={function(){}}>
                <div className="border-b border-b-[#dfe0ea] px-4 py-2 flex justify-between items-center">
                    <h3 className="font-['SDKukdetopokki'] text-base">😡 누알못 발언이 감지 되었습니다. 😡</h3>
                </div>
                <div className="text-gray-500 text-sm px-4 py-8 font-['SDKukdetopokki-Lt'] flex flex-col items-center text">
                    <Image src={SnomAngry} className='w-[80%] h-[auto]' alt='Do the G 초고수'></Image>
                    <div className='my-5 text-base'>
                        참가자 이름을 누알못 발언으로 정해서 참가하는 건 <br/>
                        규칙 위반은 아니지만<br/>
                        거짓사실을 퍼트리는 행위는 매우 좋지 않는 행위입니다.<br/>
                        참가를 계속하시겠습니까?
                    </div>
                    <div className="flex text-[#121316] text-sm items-center">
                        <button className='p-3 mr-5 w-[15vw] h-auto bg-slate-500 rounded-md' onClick={onOpenAlert}>저는 누잘알입니다.</button>
                        <button className='p-3 w-[15vw] h-auto bg-slate-500 rounded-md' onClick={onOpenAlert}>저는 누알못입니다.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NualmotAlert;