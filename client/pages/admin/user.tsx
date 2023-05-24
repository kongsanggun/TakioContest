import dynamic from 'next/dynamic';
import Router from "next/router";
import React, { useState, useEffect } from "react";

import Spanner from '../../components/spanner';
import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';

export default function Admin() {
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(true);

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
        () => import('../../components/gird/gridDataUser'),
        { ssr: false }
    )

    return (
        <>
            {<Spanner loading={loading} />}
            <div className={"w-full h-auto bg-[#F9F9FB]" + (openAlert? " blur-sm" : "")}>
                <AdminHeader />
                <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                    <div className="w-[80vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                        <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                            <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">유저관리</div>
                        </div>
                        <GridData />
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}