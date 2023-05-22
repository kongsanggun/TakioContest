import React from "react";

import Image from 'next/image';
import Don from '../../public/img/don.png';

const BeforeFinish = () => {
    return (
        <div className={'w-full h-[70vh] my-6 flex flex-col justify-center items-center text-center bg-[#F9F9FB]'}>
            <Image src={Don} alt='caution_640'/>
            <div className = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"> 종료 날짜가 얼마 안 남아서 결과를 공개하지 않습니다. </div>
            <div className = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"> 최종 결과는 종료 날에 공개됩니다! </div>
        </div>
    )
}


export default BeforeFinish;