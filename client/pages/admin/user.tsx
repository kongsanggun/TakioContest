import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/footer';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

export default function Main() {
    return (
        <div className='bg-[#F9F9FB]'>
            <AdminHeader />
            <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                준비중입니다.
            </div>
            <Footer />
        </div>
    )
}