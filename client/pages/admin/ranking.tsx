import dynamic from 'next/dynamic';

import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';
import Spanner from '../../components/spanner';

import Router from "next/router";
import React, { useState, useEffect } from "react";

export default function Main() {
    const [loading, setLoading] = useState(true);

    // 주로 자주 사용하는 CSS 정리
    const mainDiv = "w-full h-auto flex flex-col items-center"
    const segDiv = "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt'] border-0"
    const segTitle = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"

    useEffect(() => {
        auth();
    }, []);

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
        setLoading(!loading);
    }

    const GridData = dynamic(
        () => import('../../components/gird/gridDataRanking'),
        { ssr: false }
    )


    return (
        <>
            {<Spanner loading={loading}/>}
            <div className='bg-[#F9F9FB]'>
                <AdminHeader />
                <div className={mainDiv}>
                    <div className={segDiv}>
                        <div className={segTitle}>랭킹수집관리</div>
                        <GridData />
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}