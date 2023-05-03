import Header from '../components/header';
import Footer from '../components/footer';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

export default function Main() {


    const MainDoor = () => {
        return (
            <div className="w-full h-auto flex items-center justify-center py-7 sm:py-10 border-b-[1px] border-b-[#BEC0D7]">
                <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex text-center flex-col font-['SDKukdetopokki-Lt']">
                    <b className="mb-4">리드미컬한 타격!</b>
                    <b className="mb-4">경쾌한 사운드!</b>
                    <b className="mb-4">당신도 <span className="text-[#FF0000]">Do the G 초고수</span>가 될 수 있습니다!</b>
                </div>
            </div>
        )
    } // 메인 대문란

    const DoTheG = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-7 sm:py-10 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-3xl my-5 font-bold w-[auto]'>Do the G란?</div>
                    <p className='text-xl mb-2 w-[full]'>2000년대 후반 온게임넷에서 방송했던 방송 프로그램입니다.</p>
                    <p className='text-xl mb-5 w-[full]'>그 중 2000년대 당시에 운영되고 있는 리듬게임의 고수들의 모습을 볼 수 있었습니다.</p>
                    <iframe className="w-[70vw] h-[calc(70vw/3*2)]" src="https://www.youtube-nocookie.com/embed/QPvz01_QsQc?start=49" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-3xl my-5 font-bold w-[auto]'>초고수 소개</div>
                    <p className='text-xl mb-2 w-[full]'>Do the G에 등장한 초고수 Naru님을 소개합니다!</p>
                    <p className='text-xl mb-5 w-[full]'>2009년 2월 20일 방송분에 출현한 Naru님은 초고수 출현 외 일본에서 온 초고수로도 등장하신 적이 있답니다!</p>
                </div>
            </div>
        )
    } // 초고수 소개

    const Contest = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-7 sm:py-10 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-3xl my-5 font-bold w-[auto]'>Do the G 2023 대회 소개</div>
                    <p className='text-xl mb-2 w-[full]'>대회곡은 2가지 모드로 나뉘고 온라인으로 진행 할 예정이며 다음과 같습니다.</p>
                    <div className='text-3xl my-5 font-bold w-[auto]'>오리지널 모드</div>
                    <p className='text-xl mb-2 w-[full]'>방송에 출현 나온 곡들 위주로 나오는 Do the G 오리지널 그 자체입니다!</p>
                    <p className='text-xl mb-2 w-[full]'>초고수 인증의 그 느낌을 느껴보세요!!!</p>
                    <p className='text-xl mb-2 w-[full]'>- 연애편지 2000 (연문 2000)</p>
                    <p className='text-xl mb-2 w-[full]'>- 타베루나 2000</p>
                    <p className='text-xl mb-2 w-[full]'>- 키타사이타마 2000</p>
                    <div className='text-3xl my-5 font-bold w-[auto]'>초고수 모드</div>
                    <p className='text-xl mb-2 w-[full]'>Do the G 초고수가 선정한 곡들도 진정한 초고수에 도전하세요!</p>
                    <p className='text-xl mb-2 w-[full]'>인 단위 이상의 진정한 초고수의 실력이라면 이 쪽에 도전해보세요!</p>
                    <p className='text-xl mb-2 w-[full]'>- Xevel</p>
                    <p className='text-xl mb-2 w-[full]'>- Hurtling Boys</p>
                    <p className='text-xl mb-2 w-[full]'>- ANiMA</p>
                </div>
            </div>
        )
    } // 대회 소개

    const Notice = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-7 sm:py-10 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className='text-3xl my-5 font-bold w-[auto]'>유의 사항</div>
                    <p className='text-xl mb-2 w-[full]'>아래 유의사항을 잘 읽어보세요! 위반시 위 대회에 바로 제외되며 추후에 불이익을 받을 수 있습니다.</p>
                    <p className='text-xl mb-2 w-[full]'> - 모드는 하나만 선택해주네요. </p>
                    <p className='text-xl mb-2 w-[full]'> - 정정당당한 실력으로 대리 없이 스스로 참가해주세요. </p>
                    <p className='text-xl mb-2 w-[full]'> - 1인당 1계정만 참가해주세요. 중복 참가를 금합니다. </p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#F9F9FB]'>
            <Header />
            <MainDoor />
            <DoTheG />
            <Contest />
            <Notice />
            <Footer />
        </div>
    )
}
