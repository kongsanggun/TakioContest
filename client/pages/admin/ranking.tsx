import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";

export default function Main() {

    useEffect(() => {
        auth();
    },[]);

    async function auth() {
        let response = await fetch(`/auth/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Bearer": "",
            },
        })

        console.log(response.status);

        if (response.status == 401) {
            Router.push("/login");
        }
    }

    return (
        <div className='bg-[#F9F9FB]'>
            <AdminHeader />
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-5xl mb-10 font-bold w-[auto] h-auto'>랭킹 관리</div>

                </div>
            </div>
            <Footer />
        </div>
    )
}