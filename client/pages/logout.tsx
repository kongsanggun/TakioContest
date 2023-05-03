import Header from '../components/header';
import Footer from '../components/footer';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

// TODO : 로그아웃 버튼을 통해서 위 페이지에 접근하기 아닐시 오류 페이지 이동

export default function Main() {
    return (
        <div className='bg-[#F9F9FB]'>
            <Header />
            <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                준비중입니다.
            </div>
            <Footer />
        </div>
    )
}