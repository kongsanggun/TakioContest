import dynamic from 'next/dynamic';
import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";

export default function Main() {

    useEffect(() => {
        auth();
    },[]);

    async function auth() {
        let response = await fetch(`/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })

        console.log(response.status);

        if (response.status == 401) {
            Router.push("/login");
        }
        else if (!response.ok) {
            Router.push("/error")
        }
    }

    const GridData = dynamic(
        () => import('../../components/gird/gridDataRanking'),
        { ssr: false }
    )


    return (
        <div className='bg-[#F9F9FB]'>
            <AdminHeader />
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[80vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                        <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">랭킹 수집 관리</div>
                    </div>
                    <GridData />
                </div>
            </div>
            <Footer />
        </div>
    )
}