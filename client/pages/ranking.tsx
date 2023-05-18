import Header from '../components/header';
import Spanner from '@/components/spanner';
import Footer from '../components/footer';

import Router from "next/router";
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from "react";

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
                        labelO.push(element.entryName);

                        songScore1O.push(element.songScore1);
                        songScore2O.push(element.songScore2);
                        songScore3O.push(element.songScore3);
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
                        labelC.push(element.entryName);

                        songScore1C.push(element.songScore1);
                        songScore2C.push(element.songScore2);
                        songScore3C.push(element.songScore3);
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

    const SubManu = () => {
        return (
            <div className='w-full h-auto'>
                <div className='w-auto h-10 text-[#121316] flex items-center justify-start font-["SDKukdetopokki-Lt"] font-extrabold duration-200'>
                    {
                        mode ?
                            <button className="w-auto h-full text-xl font-light mr-7 flex items-center justify-center duration-150 text-[#BEC0D7] border-b-2" disabled>오리지널</button>
                            :
                            <button className="w-auto h-full text-xl font-light mr-7 flex items-center justify-center duration-150 text-[#121316] hover:text-[#BEC0D7] hover:border-b-2" onClick={changeMode}>오리지널</button>
                    }
                    {
                        mode ?
                            <button className="w-auto h-full text-xl font-light mx-7 flex items-center justify-center duration-150 text-[#121316] hover:text-[#BEC0D7] hover:border-b-2" onClick={changeMode}>초고수</button>
                            :
                            <button className="w-auto h-full text-xl font-light mx-7 flex items-center justify-center duration-150 text-[#BEC0D7] border-b-2" disabled>초고수</button>
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
                <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                    <div className="w-[70vw] my-8 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                        <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                            <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">참가자 랭킹</div>
                            <div>Do the G 2023 대회의 랭킹입니다.</div>
                        </div>
                        <SubManu />
                        {mode ? <OriginBar date={dates} size={sizeO} labels={labelO} songScore1={songScore1O} songScore2={songScore2O} songScore3={songScore3O} />
                            :
                            <ChogosuBar date={dates} size={sizeC} labels={labelC} songScore1={songScore1C} songScore2={songScore2C} songScore3={songScore3C} />}
                        {mode ? <OriginGird /> : <ChogosuGird />}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}