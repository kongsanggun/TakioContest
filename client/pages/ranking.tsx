import Header from '../components/header';
import Footer from '../components/footer';

import dynamic from 'next/dynamic'
import React, { useState, useEffect } from "react";

export default function Entry() {

    const [mode, setMode] = useState(true);
    
    const changeMode = () => {
        mode ? setMode(false) : setMode(true);
    }

    // TODO : 마감 시간 임박 시 정보 가리기

    useEffect(() => {
    },[]);


    const Origin = dynamic(
        () => import('../components/gridDataOrigin'),
        { ssr: false }
    )

    const Chogosu = dynamic(
        () => import('../components/gridDataChogosu'),
        { ssr: false }
    )

    const SubManu = () => {
        return (
            <div className='w-full h-auto'>
                <div className='w-auto h-10 text-[#121316] flex items-center justify-start font-["SDKukdetopokki-Lt"] font-extrabold duration-200'>
                    {
                        mode ?
                        <button className = "w-auto h-full text-xl font-light mr-7 flex items-center justify-center duration-150 text-[#BEC0D7] border-b-2" disabled>오리지널</button>
                        :
                        <button className = "w-auto h-full text-xl font-light mr-7 flex items-center justify-center duration-150 text-[#121316] hover:text-[#BEC0D7] hover:border-b-2" onClick={changeMode}>오리지널</button>
                    }
                    {
                        mode ?
                        <button className = "w-auto h-full text-xl font-light mx-7 flex items-center justify-center duration-150 text-[#121316] hover:text-[#BEC0D7] hover:border-b-2" onClick={changeMode}>초고수</button>
                        :
                        <button className = "w-auto h-full text-xl font-light mx-7 flex items-center justify-center duration-150 text-[#BEC0D7] border-b-2" disabled>초고수</button>
                    }  
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#F9F9FB]'>
            <Header />
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-5xl mb-10 font-bold w-[auto] h-auto'>참가자 랭킹</div>
                    <SubManu />
                    {mode ? <Origin/> : <Chogosu/>}
                </div>
            </div>
            <Footer />
        </div>
    )
}