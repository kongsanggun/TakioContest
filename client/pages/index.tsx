import Header from '../components/header';
import Spanner from '../components/spanner';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";

import ModalMovie from '../components/alert/modalMovie';

import Image from 'next/image';
import MainIndex from '../public/img/main-index.png';
import ChogosuSmile from '../public/img/chogosu-smile.gif';
import ChogosuIntroduce from '../public/img/chogosu-introduce.gif';

import Link from 'next/link';

export default function Index() {
    const [url, setUrl] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [dates, setDates] = useState({
        start: "",
        end: "",
    });

    // 주로 자주 사용하는 CSS 정리
    const mainDiv = "w-full h-auto flex flex-col items-center"
    const segDiv = "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt']"
    const segTitle = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"
    const segSubTitle = "w-full h-auto text-xl sm:text-2xl mb-6 font-['SDKukdetopokki']"
    const segp = "w-full h-auto"
    const seglink = "w-[15%] min-w-[100px] h-auto text-[#245A8D] hover:text-[#1C3449] font-['SDKukdetopokki']"

    const segInside = "w-full h-auto py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#BED5ED] rounded-xl drop-shadow-md"
    const segInsideTitle = "w-full h-auto text-xl mb-4 text-[#245A8D] font-['SDKukdetopokki']"
    const segInsideP = "w-full h-auto text-sm"

    useEffect(() => {
        init();
    }, []);

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
                setLoading(!loading);
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
                <div className="w-[80vw] sm:w-[70vw] my-10 absolute z-0 flex text-center flex-col">
                    <div className="mb-10 font-['SDKukdetopokki'] text-[#4A273F] text-3xl sm:text-5xl text-border-white-b sm:text-border-white-b">
                        <div className="mb-4">리드미컬한 타격!</div>
                        <div >경쾌한 사운드~</div>
                    </div>
                    <div className="text-white font-['SDKukdetopokki-Lt']">
                        <div className="mb-6 text-base sm:text-2xl">
                            <span className="text-[#d19c63] font-['SDKukdetopokki'] text-border-white">Do the G 초고수</span>가 될 수 있는 기회에 도전해보세요!
                        </div>
                        <div className="mb-1 text-sm sm:text-lg">
                            참여 기간 : <span className="font-['SDKukdetopokki']">{dates.start}</span> ~ <span className="font-['SDKukdetopokki']">{dates.end}</span>
                        </div>
                        <div className="mb-1 text-sm sm:text-lg sm:mb-4">
                            현재 <span className="font-['SDKukdetopokki']">{count}</span>명이 이 대회에 참여 중입니다.
                        </div>
                        <div className='text-sm'>
                            위 페이지는 아케이드 리듬게임 태고의 달인 온라인 대회와 관련하여 웹페이지로 제작하는 <br /> 웹 프로젝트입니다.
                        </div>
                    </div>
                </div>
                <Image src={MainIndex} className='w-full max-w-[1080px] min-h-[400px] max-h-[600px] object-none sm:object-fill ' alt='Do the G 초고수'></Image>
            </div>
        )
    } // 메인 대문란

    const Main = () => {
        return (
            <div className={mainDiv}>
                <DoTheG />
                <Naru />
                <Entry />
                <Contest />
                <Notice />
            </div>
        )
    }

    const DoTheG = () => {
        return (
            <div className={segDiv + " border-b-[1.5px] border-b-[#dfe0ea]"}>
                <div className={segTitle}> Do the G란 무엇인가요? </div>
                <div className={segp + " mb-1"}> Do the G는 2000년 대 후반 온게임넷 채널에서 방송했던 방송 프로그램입니다.</div>
                <div className={segp + " mb-1"}> 위 프로그램은 그 당시 여러 게임을 소개하는 컨텐츠가 주로 이루어지고 있었습니다.</div>
                <div className={segp}> 그 중 여러 게임에서 고수를 소개하고 비법을 전수하는 G-익사이팅도 있었습니다.</div>
            </div>
        )
    }

    const Naru = () => {
        return (
            <div className={segDiv + " border-b-[1.5px] border-b-[#dfe0ea]"}>
                <div className={segTitle}> 태고의 달인의 초고수를 소개합니다. </div>
                <div className={segp + " mb-1"}> Do the G에 등장한 태고의 새로운 초고수 Naru님을 소개합니다! 👏👏👏</div>
                <div className={segp + " mb-1"}> Do the G 87회 방송에서 태고의 달인 초고수로 출현하여 그 당시 초난관곡들을 풀콤하시고 여러가지 비법을 전수한 내용이 담겨있습니다.</div>
                <div className={segp + " mb-6 sm:mb-0"}>  그 외에도 비공식 대회 우승 및 해설 그리고 이벤트에서 초고수로도 등장하신 적이 있답니다. </div>
                <div className="flex-row hidden w-full h-auto my-10 sm:flex">
                    <Image src={ChogosuIntroduce} height={120} width={120} alt='안녕하세요' className='mr-6 drop-shadow-md'></Image>
                    <Image src={ChogosuSmile} height={120} width={120} alt='웃는 모습' className='drop-shadow-md'></Image>
                </div>
                <div className={segp}>
                    <div className={seglink} onClick={function () { onModalMovie("QPvz01_QsQc?start=49") }}>영상보기 📺</div>
                </div>
            </div>
        )
    } // 초고수 소개

    const Contest = () => {
        return (
            <div className={segDiv + " border-b-[1.5px] border-b-[#dfe0ea]"}>
                <div className={segTitle}> 대회곡 소개 </div>
                <div className={segp + " mb-6"}> 해당 대회는 2가지 모드로 나뉘어서 온라인으로 진행합니다. </div>

                <li className={segSubTitle}> 오리지널 모드 </li>
                <div className={segp + " mb-1"}> Do the G 방송에서 나온 초고수 인증 오리지널 그 자체입니다. </div>
                <div className={segp + " mb-8"}> 초고수 인증 그대로 도전해보세요! </div>
                <div className={segInside}>
                    <div className={segInsideTitle + ' text-2xl sm:text-4xl mb-8'}>🎯 과제곡 🎯</div>
                    <div>
                        <div className={segInsideTitle + ' mb-4'}>- 연애편지 2000 (연문 2000) </div>
                        <div className={segInsideP + ' mb-1'}>연애편지 2000 (연문 2000)은 그 당시 정신없는 빠른 스피드를 극복해야하는 10렙의 극악곡이었습니다.</div>
                        <div className={segInsideP + ' mb-4'}>지금은 9렙에서도 중간 정도 하는 난이도지만 9렙치고는 많은 물량과 체력을 요구하는 곡입니다.</div>
                        <div className={' mb-6'}><span onClick={function () { onModalMovie("QPvz01_QsQc?start=97") }} className={seglink}>영상보기 📺</span></div>

                        <div className={segInsideTitle + ' mb-4'}>- 타베루나 2000 </div>
                        <div className={segInsideP + ' mb-1'}>타베루나 2000는 10렙의 난이도로 그 당시 어려운 채보를 섞어서 만든 까다로운 곡이었습니다.</div>
                        <div className={segInsideP + ' mb-4'}>지금도 10렙의 난이도로 그 당시 어려움을 존중하고있는 그런 곡입니다.</div>
                        <div className={' mb-6'}><span onClick={function () { onModalMovie("QPvz01_QsQc?start=181") }} className={seglink}>영상보기 📺</span></div>


                        <div className={segInsideTitle + ' mb-4'}>- 키타사이타마 2000 </div>
                        <div className={segInsideP + ' mb-1'}>키타사이타마 2000는 그 당시 0티어 난이도를 자랑하는 보면이었습니다.</div>
                        <div className={segInsideP + ' mb-4'}>그 이후로도 현인 곡에 등장하는 등 어려운 보면들이 많이 등장했음에도 10렙에서 통용될 만큼 어려운 곡입니다.</div>
                        <div className={' mb-4'}><span onClick={function () { onModalMovie("QPvz01_QsQc?start=311") }} className={seglink}>영상보기 📺</span></div>
                    </div>
                </div>

                <li className={segSubTitle}> 초고수 모드 </li>
                <div className={segp + " mb-1"}> Do the G 초고수 Naru가 직접 선정한 과제곡들입니다! </div>
                <div className={segp + " mb-1"}> 초고수가 인정하는 진정한 태고의 달인 초고수에 도전하세요. </div>
                <div className={segp + " mb-8"}> 인 단위 이상의 실력자라면 이 쪽에 도전해보세요! </div>
                <div className={segInside}>
                    <div className={segInsideTitle + ' text-2xl sm:text-4xl mb-8'}>🎯 과제곡 🎯</div>
                    <div>
                        <div className={segInsideTitle + ' mb-2'}>- Xevel </div>
                        <div className={segInsideP + ' mb-1'}>Xevel은 천하제일리겜대회 중에서 츄니즘에서 수록된 곡입니다.</div>
                        <div className={segInsideP + ' mb-1'}>많은 물량의 기차와 마지막의 X자 배치는 특징적입니다.</div>
                        <div className={segInsideP + ' mb-4'}>초고수 피셜 뇌정지가 자주 일어나는 곡이라 위의 곡을 선정했습니다.</div>
                        <div className={' mb-6'}><span onClick={function () { onModalMovie("xbVQb-9M5IQ?start=9") }} className={seglink}>영상보기 📺</span></div>

                        <div className={segInsideTitle + ' mb-2'}>- Hurtling Boys </div>
                        <div className={segInsideP + ' mb-1'}>Hurtling Boys은 에토우 빔으로도 유명한 곡입니다.</div>
                        <div className={segInsideP + ' mb-4'}>초고수가 개인적으로 풀콤하기 까다롭다고 생각하여 위의 곡을 선정했습니다.</div>
                        <div className={' mb-6'}><span onClick={function () { onModalMovie("_AoWY5A_xFk?start=28") }} className={seglink}>영상보기 📺</span></div>

                        <div className={segInsideTitle}>- ANiMA </div>
                        <div className={segInsideP + ' mb-1'}><del className='text-gray-400' title="않이;;" >제목이 초고수의 시그니처 않이가 들어가있는</del> Deemo에 수록되어있는 곡입니다.</div>
                        <div className={segInsideP + ' mb-4'}>보스곡이었던 상징성도 있고 난이도도 적당하다고 생각하여 위의 곡을 선정했습니다.</div>
                        <div className={' mb-4'}><span onClick={function () { onModalMovie("HcJuuIWMJ8w?start=8") }} className={seglink}>영상보기 📺</span></div>
                    </div>
                </div>
                <div className={segp}>
                    <Link className={seglink} href="/ranking">각 모드 랭킹 확인하기 🏆</Link>
                </div>
            </div>
        )
    } // 대회 소개

    const Entry = () => {
        return (
            <div className={segDiv + " border-b-[1.5px] border-b-[#dfe0ea]"}>
                <div className={segTitle}> Do the G 2023 </div>
                <div className={segp + " mb-1"}> 위 대회는 위에서 소개한 초고수 Naru님을 <del className='text-gray-400' title="않이;;" >놀리기</del> 기념하기 위해 개최하였습니다! </div>
                <div className={segp + " mb-1"}> 참여 기간은 위의 표시되어있듯이 5월 27일부터 6월 16일까지 개최됩니다. </div>
                <div className={segp + " mb-1"}> 참여하기 위해서는 사용하시는 태고 카드에 동더히로바가 등록이 되어있어야합니다!! </div>
                <div className={segp + " mb-6"}> 입상시 적지만 상금도 계획하고 있으니 많은 참여 부탁드립니다. </div>
                <div className={segSubTitle + " mb-6"}> 참여방법 </div>
                <div className={segp + " mb-1"}> 1. 접수하기 탭에 들어가서 먼저 참가신청을 합니다. </div>
                <div className={segp + " mb-1"}> 2. <a className={seglink} href="https://donderhiroba.jp" target="_blank" rel="noopener noreferrer"><u>동더히로바</u></a>에 접속합니다. </div>
                <div className={segp + " mb-1"}> 3. <a className={seglink} href="https://donderhiroba.jp/compe_list.php" target="_blank" rel="noopener noreferrer"><u>대회 검색</u></a>에 들어가서 대회 기록을 위한 대회를 검색합니다. </div>
                <div className={segp + " mb-1"}>검색은 {"'[Do the G] 오리지널모드' 혹은 '[Do the G] 초고수모드'"}로 입력해주세요.  </div>
                <div className={segp + " mb-6"}> 4. 동더 히로바 대회에 들어가서 접수 후 실력을 뽐내보세요! 대회 기록은 오전 6시마다 이루어집니다. </div>
                <div className="flex flex-row items-center justify-start w-full h-auto mb-6 text-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <div className={segp}>
                        참가 접수 후 반드시 7일 이내에 동더 히로바 대회에 참가하여 점수를 기록해주세요! <span className="text-[#FF0000] font-['SDKukdetopokki']">7일이 지나면 참가 기록이 자동으로 사라지게 됩니다.</span>
                    </div>
                </div>
                <div className={segp}>
                    <Link className={seglink} href="/entry">대회 참여하기 🥁</Link>
                </div>
            </div>
        )
    } // 참여 방법 소개

    const Notice = () => {
        return (
            <div className={segDiv}>
                <div className={segTitle}>유의 사항</div>
                <div className={segp + " mb-1"}> 아래 유의사항을 잘 읽어보세요. </div>
                <div className={segp + " mb-8"}> 일부 사항은 위반시 <span className="text-[#FF0000] font-['SDKukdetopokki']">위 대회에 바로 제외되며 추후에 불이익을 받을 수 있습니다.</span> </div>
                <div className={segInside}>
                    <div className={segInsideTitle}>⚠️ 주의 사항 ⚠️</div>
                    <div>
                        <div className={segInsideP + ' mb-2'}> - 모드는 하나만 선택할 수 있습니다. 가급적이면 자신의 실력에 맞게 모드를 선택해주세요. </div>
                        <div className={segInsideP + ' mb-2'}> - 정정당당한 실력으로 참가에 임해주세요. 대리 등의 대리 참가는 불가합니다.</div>
                        <div className={segInsideP + ' mb-2'}> - 반드시 신청 후 7일 이내에 대회에 참가하여 점수를 기록해주세요.</div>
                        <div className={segInsideP + ' mb-2'}> - 해당 대회 같은 경우 동더히로바 사이트 가입이 필수입니다. 참가 전에 자신의 동더히로바 사이트를 확인해주세요. </div>
                        <div className={segInsideP + ' mb-2'}> - 1인당 1계정으로만 참가해주세요. 중복 참가를 금합니다. </div>
                        <div className={segInsideP + ' mb-2'}> - 간혹 여러 이유로 대회 집계가 안될 경우도 있습니다. </div>
                        <div className={segInsideP}> - 참가 이름의 경우 자유지만 정치, 특정 커뮤니티 은어 등과 같은 민감한 주제를 가지는 이름으로 참가할 경우 바로 제외 될 수 있습니다. </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start w-full h-auto mb-4 text-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <div className={segp}>
                        기타 문의 사항이 있다면 아래의 링크로 연락해주세요.
                    </div>
                </div>
                <div className={segp}>
                    <a className={seglink} href="https://discord.gg/JdYuyQZ5Dr" target="_blank" rel="noopener noreferrer">디스코드 연결</a>
                </div>
            </div>
        )
    }

    return (
        <>
            {<Spanner loading={loading} />}
            {openAlert && <ModalMovie onOpenAlert={onModalMovie} url={url} />}
            <div className={"w-full h-auto bg-[#F9F9FB]" + (openAlert ? " blur-sm" : "")}>
                <Header />
                <MainDoor />
                <Main />
                <Footer />
            </div>
        </>
    )
}
