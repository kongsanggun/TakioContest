import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';

import dynamic from 'next/dynamic'
import React, { useState, useEffect } from "react";

export default function Admin() {

    useEffect(() => {
    },[]);

    const GridData = dynamic(
        () => import('../../components/gridDataUser'),
        { ssr: false }
    )

    return (
        <div className='bg-[#F9F9FB]'>
            <AdminHeader />
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-5xl mb-10 font-bold w-[auto] h-auto'>유저 관리</div>
                    <GridData/>
                </div>
            </div>
            <Footer />
        </div>
    )
}