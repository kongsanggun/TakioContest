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

    const OriginBar= dynamic(
        () => import('../components/bar/barDataOrigin'),
        { ssr: false }
    )

    const OriginGird = dynamic(
        () => import('../components/gird/gridDataOrigin'),
        { ssr: false }
    )

    const ChogosuBar = dynamic(
        () => import('../components/bar/barDataChogosu'),
        { ssr: false }
    )

    const ChogosuGird = dynamic(
        () => import('../components/gird/gridDataChogosu'),
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
                    <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                        <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">참가자 랭킹</div>
                        <div>Do the G 2023 대회의 랭킹입니다.</div>
                    </div>
                    <SubManu />
                    {mode ? <OriginBar/> : <ChogosuBar/>}
                    {mode ? <OriginGird/> : <ChogosuGird/>}
                </div>
            </div>
            <Footer />
        </div>
    )
}