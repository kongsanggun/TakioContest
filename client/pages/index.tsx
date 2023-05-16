import Header from '../components/header';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";

import ModalMovie from '@/components/alert/modalMovie';

import Image from 'next/image';
import MainIndex from '../public/img/main-index.png';
import ChogosuSmile from '../public/img/chogosu-smile.gif';
import Link from 'next/link';

export default function Main() {

    const [url, setUrl] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [count, setCount] = useState(0);
    const [dates, setDates] = useState({
        start: "",
        end: "",
    });

    useEffect(() => {
        init();
    },[]);

    const init = async () => {
        try {
            let response = await fetch(`/index`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            }).then(async (data) => {
                    const counts = data.count;
                    const start = data.start.split('T')[0];
                    const end = data.end.split('T')[0];

                    setCount(counts); // 참가자 수
                    setDates({
                        start: start,
                        end: end
                    });

                });

        } catch (Error) {
            Router.push("/error");
            return;
        }
    }

    const onModalMovie = (input: any) => {
        let HTML = document.querySelector('html');
        setUrl(input)
        setOpenAlert(!openAlert);
        if (HTML !== null) {
            openAlert ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const MainDoor = () => {
        return (
            <div className="w-full h-auto flex items-center justify-center border-b-[1px] border-b-[#BEC0D7] bg-zinc-700">
                <div className="w-[70vw] my-6 sm:my-10 absolute z-0 flex text-center flex-col">
                    <div className="mb-6 sm:mb-8 font-['SDKukdetopokki'] text-[#4A273F] text-4xl sm:text-5xl text-border-white-b">
                        <div className="mb-3 sm:mb-4">리드미컬한 타격!</div>
                        <div >경쾌한 사운드~</div>
                    </div>
                    <div className="text-white text-lg sm:text-2xl font-['SDKukdetopokki-Lt']">
                        <div className="mb-2">
                            <span className="text-[#d19c63] font-['SDKukdetopokki'] text-border-white">Do the G 초고수</span>가 될 수 있는 기회에 도전해보세요!
                        </div>
                        <div className="text-base sm:text-lg mb-2">
                            참여 기간 : <span className="font-['SDKukdetopokki']">{dates.start}</span> ~ <span className="font-['SDKukdetopokki']">{dates.end}</span>
                        </div>
                        <div className="text-base sm:text-lg mb-3 sm:mb-4">
                            현재 <span className="font-['SDKukdetopokki']">{count}</span>명이 이 대회에 참여 중입니다.
                        </div>
                        <div className='text-sm'>
                            위 페이지는 아케이드 리듬게임 태고의 달인 온라인 대회와 관련하여 웹페이지로 제작하는 <br /> 웹 프로젝트입니다.
                        </div>
                    </div>
                </div>
                <Image src={MainIndex} className='object-none sm:object-fill w-[100vw] max-w-[80vw] max-h-[720px]' alt='Do the G 초고수'></Image>
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
                        <div className="text-[#245A8D] font-['SDKukdetopokki']" onClick={function () { onModalMovie("QPvz01_QsQc?start=49") }}>영상보기 📺</div>
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
                            Do the G 방송에서 나온 초고수 인증 오리지널 그 자체입니다.<br />
                            초고수 인증 그대로 도전해보세요!
                        </div>
                        <div className='py-4 px-4 bg-[#F7F6F3] border-[1px] border-[#dfe0ea] rounded-lg'>
                            <div className='text-xl mb-4 text-[#245A8D]'>🎯 과제곡 🎯</div>
                            <div>
                                <div className='mb-2 w-[full]'>연애편지 2000 (연문 2000) <span onClick={function () { onModalMovie("QPvz01_QsQc?start=97") }} className='text-rose-600'>▶️</span></div>
                                <div className='mb-2 w-[full]'>타베루나 2000 <span onClick={function () { onModalMovie("QPvz01_QsQc?start=181") }} className='text-rose-600'>▶️</span></div>
                                <div className='w-[full]'>키타사이타마 2000 <span onClick={function () { onModalMovie("QPvz01_QsQc?start=311") }} className='text-rose-600'>▶️</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 w-[full] h-auto">
                        <div className='font-["SDKukdetopokki"] text-2xl mb-4'>초고수 모드</div>
                        <div className='mb-4'>
                            Do the G 초고수 Naru가 직접 선정한 과제곡들입니다!<br />
                            초고수가 인정하는 진정한 태고의 달인 초고수에 도전하세요.<br />
                            인 단위 이상의 실력자라면 이 쪽에 도전해보세요!
                        </div>
                        <div className='py-4 px-4 bg-[#F7F6F3] border-[1px] border-[#dfe0ea] rounded-lg'>
                            <div className='text-xl mb-4 text-[#245A8D]'>🎯 과제곡 🎯</div>
                            <div>
                                <div className='mb-2 w-[full]'>Xevel <span onClick={function () { onModalMovie("xbVQb-9M5IQ?start=9") }} className='text-rose-600'>▶️</span></div>
                                <div className='mb-2 w-[full]'>Hurtling Boys <span onClick={function () { onModalMovie("_AoWY5A_xFk?start=28") }} className='text-rose-600'>▶️</span></div>
                                <div className='w-[full]'>ANiMA <span onClick={function () { onModalMovie("HcJuuIWMJ8w?start=8") }} className='text-rose-600'>▶️</span></div>
                            </div>
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
                        일부 사항은 위반시 <span className="text-[#FF0000] font-['SDKukdetopokki']">위 대회에 바로 제외되며 추후에 불이익을 받을 수 있습니다.</span>
                    </div>
                    <div className='py-4 px-4 mb-10 bg-[#F7F6F3] border-[1px] border-[#dfe0ea] rounded-lg'>
                        <div className='text-xl mb-4 text-[#FF0000]'>⚠️ 주의 사항 ⚠️</div>
                        <div>
                            <p className='mb-3 w-[full]'> 모드는 하나만 선택할 수 있습니다. <br /> 가급적이면 자신의 실력에 맞게 모드를 선택해주세요. </p>
                            <p className='mb-3 w-[full]'> 정정당당한 실력으로 스스로 참가해주세요. </p>
                            <p className='mb-3 w-[full]'> 1인당 1계정으로만 참가해주세요. 중복 참가를 금합니다. </p>
                            <p className='mb-3 w-[full]'> 대회 집계가 안될 경우도 있습니다. <br /> 있다면 사진 및 시간을 입력하여 저한테 연락해주세요. </p>
                            <p className='mb-3 w-[full]'> 참가 이름의 경우 자유지만 정치, 특정 커뮤니티 은어 등과 같은  <br /> 민감한 주제를 가지는 이름으로 참가할 경우 바로 제외 될 수 있습니다. </p>
                        </div>
                    </div>
                    <div className="mb-3 w-[full] h-auto">
                        <Link className="text-[#245A8D] font-['SDKukdetopokki']" href="/entry">대회 참여하기 🥁</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {openAlert && <ModalMovie onOpenAlert={onModalMovie} url={url} />}
            <div className="bg-[#F9F9FB]">
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
