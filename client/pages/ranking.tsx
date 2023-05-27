import Header from '../components/header';
import Spanner from '../components/spanner';
import Footer from '../components/footer';

import Router from "next/router";
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from "react";
import Precontest from '../components/ranking/precontest';
import BeforeFinish from '../components/ranking/beforeFinish';

export default function Entry() {

    const [mode, setMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState({
        start: "",
        end: "",
    });

    const [sizeO, setSizeO] = useState(0);
    const [labelO] = useState([]);
    const [songScore1O] = useState([]);
    const [songScore2O] = useState([]);
    const [songScore3O] = useState([]);

    const [sizeC, setSizeC] = useState(0);
    const [labelC] = useState([]);
    const [songScore1C] = useState([]);
    const [songScore2C] = useState([]);
    const [songScore3C] = useState([]);

    const [compareStart, setCompareStart] = useState(0);
    const [compareEnd, setCompareEnd] = useState(0);

    // 주로 자주 사용하는 CSS 정리
    const mainDiv = "w-full h-auto flex flex-col items-center"
    const segDiv = "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt']"
    const segTitle = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"
    const segSubTitle = "w-full h-auto text-xl sm:text-2xl mb-6 font-['SDKukdetopokki']"
    const segp = "w-full h-auto"
    const seglink = "w-[15%] min-w-[100px] h-auto text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']"

    const active = "w-auto h-full text-base sm:text-xl font-['SDKukdetopokki'] mr-10 text-[#245A8D] border-b-2 border-b-[#245A8D]"
    const nonActive = "w-auto h-full text-base sm:text-xl font-['SDKukdetopokki-Lt'] mr-10 text-[#121316] border-b-[#245A8D] hover:text-[#245A8D] hover:border-b-2 duration-150"

    const offset = new Date().getTimezoneOffset() * 60000; // 시차 간격 맞추기;;
    const now = Number(new Date(Date.now() - offset).toISOString().split('T')[0].replaceAll("-", ""))
    
    const puls = new Date(Date.now() - offset)
    puls.setDate(puls.getDate() + 3)
    const now2 = Number(new Date(puls).toISOString().split('T')[0].replaceAll("-", ""))

    useEffect(() => {
        init();
        initBar();
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
                const start = data.start.split('T')[0];
                const end = data.end.split('T')[0];

                setDates({
                    start: start,
                    end: end
                });

                setCompareStart(Number(dates.start.replaceAll("-", "")));
                setCompareEnd(Number(dates.end.replaceAll("-", "")));

            });
            // TODO : 마감 시간 임박 시 정보 가리기

        } catch (Error) {
            Router.push("/error");
            return;
        }
    }

    const initBar = async () => {
        try {
            const setBarO = await fetch(`/ranking/origin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error();
                    }
                    return res.json();
                })
                .then(async (data) => {
                    const rankData = data.data.contents;
                    setSizeO(rankData.length); // 참가자 수

                    rankData.forEach((element: { entryName: never; songScore1: never; songScore2: never; songScore3: never; }, index: any) => {
                        if (index < 8) {
                            labelO.push(element.entryName);

                            songScore1O.push(element.songScore1);
                            songScore2O.push(element.songScore2);
                            songScore3O.push(element.songScore3);
                        }
                    });
                });

            const setBarC = await fetch(`/ranking/chogosu`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error();
                    }
                    return res.json();
                })
                .then(async (data) => {
                    const rankData = data.data.contents;
                    setSizeC(rankData.length); // 참가자 수

                    rankData.forEach((element: { entryName: never; songScore1: never; songScore2: never; songScore3: never; }, index: any) => {
                        if (index < 8) {
                            labelC.push(element.entryName);

                            songScore1C.push(element.songScore1);
                            songScore2C.push(element.songScore2);
                            songScore3C.push(element.songScore3);
                        }
                    });
                    setLoading(!loading);
                });
        } catch (Error) {
            Router.push("/error");
            return;
        }
    }

    const changeMode = () => {
        mode ? setMode(false) : setMode(true);
    }

    const OriginBar = dynamic(
        () => import('../components/bar/barDataOrigin'),
        { ssr: false }
    )

    const OriginGird = dynamic(
        () => import('../components/gird/gridDataOrigin'),
        { ssr: false }
    )

    const ChogosuBar = dynamic(
        () => import('../components/bar/barDataChogosu'),
        { ssr: false }
    )

    const ChogosuGird = dynamic(
        () => import('../components/gird/gridDataChogosu'),
        { ssr: false }
    )

    const Contest = () => {
        return (
            <div className='w-full min-h-[70vh] my-6'>
                {mode ? <OriginBar size={sizeO} labels={labelO} songScore1={songScore1O} songScore2={songScore2O} songScore3={songScore3O} />
                    :
                    <ChogosuBar size={sizeC} labels={labelC} songScore1={songScore1C} songScore2={songScore2C} songScore3={songScore3C} />}
                {mode ? <OriginGird /> : <ChogosuGird />}
            </div>
        )
    }

    const SubManu = () => {
        return (
            <div className='w-full h-auto'>
                <div className='flex items-center justify-start w-full h-auto'>
                    {
                        mode ?
                            <button className={active} disabled>오리지널</button>
                            :
                            <button className={nonActive} onClick={changeMode}>오리지널</button>
                    }
                    {
                        mode ?
                            <button className={nonActive} onClick={changeMode}>초고수</button>
                            :
                            <button className={active} disabled>초고수</button>
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            {<Spanner loading={loading} />}
            <div className='bg-[#F9F9FB]'>
                <Header />
                <div className={mainDiv}>
                    <div className={segDiv + " border-b-[1.5px] border-b-[#dfe0ea]"}>
                        <div className={segTitle}>참가자 랭킹</div>
                        <div className={segp + " mb-1"}>Do the G 2023 대회의 순위를 나타냅니다.</div>
                        <div className={segp + " mb-1"}>랭킹 갱신은 매일 갱신됩니다.</div>
                        <div className={segp}>참가 기간 : {dates.start} ~ {dates.end}</div>
                    </div>
                    <div className={segDiv + " pt-4"}>
                        <SubManu />
                        {compareStart > now ? <Precontest /> : (now2 >= compareEnd && now <= compareEnd) ? <BeforeFinish /> : <Contest />}
                        <div className="flex flex-row items-center justify-start w-full h-auto text-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                            </svg>
                            <div className={segp}>
                                집계 로직의 오류 등으로 인해서 위의 화면에 나타내는 데이터와 실제 결과가 다를 경우도 있습니다.
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}