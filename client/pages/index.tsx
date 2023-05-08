import Header from '../components/header';
import Footer from '../components/footer';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

import ModalMovie from '@/components/alert/modalMovie';

import Image from 'next/image';
import MainIndex from '../public/img/main-index.png';
import ChogosuSmile from '../public/img/chogosu-smile.gif';
import Link from 'next/link';

export default function Main() {
    const [openAlert, setOpenAlert] = useState(false);

    const onModalMovie = () => {
        setOpenAlert(!openAlert);
    }

    const MainDoor = () => {
        return (
            <div className="w-full h-auto flex items-center justify-center border-b-[1px] border-b-[#BEC0D7]">
                <div className="w-[70vw] my-6 sm:my-10 absolute z-0 flex text-center flex-col">
                    <div className="mb-8 font-['SDKukdetopokki'] text-[#4A273F] text-5xl text-border-white-b">
                        <div className="mb-4">리드미컬한 타격!</div>
                        <div >경쾌한 사운드~</div>
                    </div>
                    <div className="text-white text-2xl font-['SDKukdetopokki-Lt']">
                        <div className="mb-2">
                            <span className="text-[#d19c63] font-['SDKukdetopokki'] text-border-white">Do the G 초고수</span>가 될 수 있는 기회에 도전해보세요!
                        </div>
                        <div className="text-lg mb-2">
                            참여 기간 : <span className="font-['SDKukdetopokki']">{"2023-05-01"}</span> ~ <span className="font-['SDKukdetopokki']">{"2023-05-31"}</span>
                        </div>
                        <div className="text-lg mb-4">
                            현재 <span className="font-['SDKukdetopokki']">{32}</span>명이 이 대회에 참여 중입니다.
                        </div>
                        <div className='text-sm'>
                            위 페이지는 아케이드 리듬게임 태고의 달인 온라인 대회와 관련하여 웹페이지로 제작하는 <br /> 웹 프로젝트입니다.
                        </div>
                    </div>
                </div>
                <Image src={MainIndex} alt='Do the G 초고수'></Image>
            </div>
        )
    } // 메인 대문란

    const DoTheG = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                <div className="w-[70vw] mt-10 pb-10 border-b-[1.5px] border-b-[#dfe0ea] text-[#121316] text-base flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">Do the G란 무엇인가요?</div>
                    <div className="mb-6 w-[full] h-auto">
                        Do the G는 2000년 대 후반 온게임넷 채널에서 방송했던 방송 프로그램입니다.<br />
                        위 프로그램은 그 당시 여러 게임을 소개하는 컨텐츠가 주로 이루어지고 있었습니다.<br />
                        그 중 여러 게임에서 고수를 소개하고 비법을 전수하는 G-익사이팅도 있었습니다.
                    </div>
                </div>
            </div>
        )
    }

    const Naru = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                <div className="w-[70vw] mt-10 pb-10 border-b-[1.5px] border-b-[#dfe0ea] text-[#121316] text-base flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">태고의 달인의 초고수를 소개합니다.</div>
                    <div className="mb-2 w-[full] h-auto">
                        Do the G에 등장한 태고의 새로운 초고수 Naru님을 소개합니다! 👏👏👏<br />
                    </div>
                    <div className="mb-2 w-[full] h-auto">
                        Do the G 87회 방송에서 태고의 달인 초고수로 출현하여<br />
                        그 당시 초난관곡들을 풀콤하시고 여러가지 비법을 전수한 내용이 담겨있습니다.<br />
                    </div>
                    <div className="mb-5 w-[full] h-auto">
                        그 외에도 비공식 대회 우승 및 해설 그리고 이벤트에서 초고수로도 등장하신 적이 있답니다.<br />
                    </div>
                    <div className="mb-10 w-[full] h-auto">
                        <Image src={ChogosuSmile} height={120} width={120} alt='웃는 모습'></Image>
                    </div>
                    <div className="mb-3 w-[full] h-auto">
                        <div className="text-[#245A8D] font-['SDKukdetopokki']" onClick={onModalMovie}>영상보기 📺</div>
                    </div>
                </div>
            </div>
        )
    } // 초고수 소개

    const Contest = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                <div className="w-[70vw] mt-10 pb-10 border-b-[1.5px] border-b-[#dfe0ea] text-[#121316] text-base flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">Do the G 2023 대회에 대해서</div>
                    <div className="mb-8 w-[full] h-auto">
                        해당 대회는 2가지 모드로 나뉘어서 온라인으로 진행합니다.<br />
                        각 모드의 자세한 내용은 다음과 같습니다.
                    </div>
                    <div className="mb-8 w-[full] h-auto">
                        <div className='font-["SDKukdetopokki"] text-2xl mb-4'>오리지널 모드</div>
                        <div className='mb-4'>
                            방송에 출현 나온 곡들 위주로 나오는 Do the G 오리지널 그 자체입니다.<br />
                            초고수 인증의 그 느낌을 느껴보세요!
                        </div>
                        <div>
                            <p className='mb-2 w-[full]'>- 연애편지 2000 (연문 2000)</p>
                            <p className='mb-2 w-[full]'>- 타베루나 2000</p>
                            <p className='mb-2 w-[full]'>- 키타사이타마 2000</p>
                        </div>
                    </div>
                    <div className="mb-8 w-[full] h-auto">
                        <div className='font-["SDKukdetopokki"] text-2xl mb-4'>초고수 모드</div>
                        <div className='mb-4'>
                            Do the G 초고수가 선정한 곡들도 진정한 초고수에 도전하세요.<br />
                            인 단위 이상의 진정한 초고수의 실력이라면 이 쪽에 도전해보세요!
                        </div>
                        <div>
                            <p className='mb-2 w-[full]'>- Xevel</p>
                            <p className='mb-2 w-[full]'>- Hurtling Boys</p>
                            <p className='mb-2 w-[full]'>- ANiMA</p>
                        </div>
                    </div>
                    <div className="mb-3 w-[full] h-auto">
                        <Link className="text-[#245A8D] font-['SDKukdetopokki']" href="/ranking">각 모드 랭킹 🏆</Link>
                    </div>
                </div>
            </div>
        )
    } // 대회 소개

    const Notice = () => {
        return (
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] flex flex-col items-center">
                <div className="w-[70vw] mt-10 pb-10 text-[#121316] text-base flex flex-col font-['SDKukdetopokki-Lt']">
                    <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">유의 사항</div>
                    <div className="mb-4 w-[full] h-auto">
                        아래 유의사항을 잘 읽어보세요.<br />
                        위반시 위 대회에 바로 제외되며 추후에 불이익을 받을 수 있습니다.
                    </div>
                    <div className="mb-8 w-[full] h-auto">
                        <p className='mb-2 w-[full]'> - 모드는 하나만 선택해주네요. </p>
                        <p className='mb-2 w-[full]'> - 정정당당한 실력으로 대리 없이 스스로 참가해주세요. </p>
                        <p className='mb-2 w-[full]'> - 1인당 1계정만 참가해주세요. 중복 참가를 금합니다. </p>
                    </div>
                    <div className="mb-3 w-[full] h-auto">
                        <Link className="text-[#245A8D] font-['SDKukdetopokki']" href="/ranking">대회 참여하기 🥁</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {openAlert && <ModalMovie onOpenAlert={onModalMovie} />}
            <div className='bg-[#F9F9FB]'>
                <Header />
                <MainDoor />
                <DoTheG />
                <Naru />
                <Contest />
                <Notice />
                <Footer />
            </div>
        </>
    )
}
