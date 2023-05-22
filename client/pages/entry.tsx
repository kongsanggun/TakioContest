import Header from '../components/header';
import Spanner from '../components/spanner';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useRef, useState } from "react";
import ModalAlert from "../components/alert/modalAlert";
import NualmotAlert from "../components/alert/nualmotAlert";
import ModelHowTo from "../components/alert/modelHowTo";

export default function Entry() {
    const [openAlert, setOpenAlert] = useState(false);
    const [openSnom, setOpenSnom] = useState(false);
    const [openHowto, setOpenHowto] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [inputs, setInputs] = useState({
        taikoId: "",
        entryName: "",
        contacts: "",
        entryType: "",
    }); // 정보 입력

    // 주로 자주 사용하는 CSS 정리
    const mainDiv = "w-full h-auto flex flex-col items-center"
    const segDiv = "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt']"
    const segTitle = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"
    const segSubTitle = "w-full h-auto text-xl sm:text-2xl mb-6 font-['SDKukdetopokki']"
    const segp = "w-full h-auto"
    const seglink = "w-[15%] min-w-[100px] h-auto text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']"

    const segInside = "w-full h-[700px] py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#BED5ED] rounded-xl drop-shadow-md"
    const segInsideTitle = "w-full h-auto text-xl mb-4 text-[#245A8D] font-['SDKukdetopokki']"
    const segInsideP = "w-full h-auto text-sm"

    const inputDiv = "w-full h-auto p-2 mb-6 text-sm text-base border-2 focus:border-[#BED5ED] rounded-lg"
    const inputButton = "text-sm sm:text-base text-[#F9F9FB] hover:text-[#3E484A] font-['SDKukdetopokki'] py-3 w-[150px] h-auto bg-slate-500 rounded-3xl bg-gradient-to-r from-[#ADE9F1] to-[#0A96E9] duration-300";

    const onModalAlert = () => {
        let HTML = document.querySelector('html');
        setOpenAlert(!openAlert);
        if (HTML !== null) {
            openAlert ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const onSnomAlert = () => {
        let HTML = document.querySelector('html');
        setOpenSnom(!openSnom);
        if (HTML !== null) {
            openSnom ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const onHowtoAlert = () => {
        let HTML = document.querySelector('html');
        setOpenHowto(!openHowto);
        if (HTML !== null) {
            openHowto ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const onChange = (e: any) => {
        const { name, value } = e.target;
        const $input = document.getElementById(name);
        setInputs({
            ...inputs,
            [name]: value,
        });

        $input?.focus();
    };

    const vaild = () => {
        if (inputs.entryType === null || inputs.entryType === "") {
            setAlertMessage("모드를 선택해주세요.");
            return false;
        }

        if (inputs.entryName === null || inputs.entryName === "") {
            setAlertMessage("참가자 이름을 입력해주세요.");
            return false;
        }

        if (inputs.entryName.length > 10) {
            setAlertMessage("이름을 10글자 이하로 적어주세요.");
            return false;
        }

        if (inputs.taikoId === null || inputs.taikoId === "") {
            setAlertMessage("북번호를 입력해주세요.");
            return false;
        }

        if (inputs.taikoId.length !== 12) {
            setAlertMessage("참가자의 북번호는 숫자로 12글자여야합니다.");
            return false;
        }

        return true;
    } // 유효성 검사

    const snomVaild = () => {
        const snom = inputs.entryName.includes('누니머기');
        const ass = inputs.entryName.includes('엉덩이') || inputs.entryName.includes('궁뎅이') || inputs.entryName.includes('빵뎅이') || inputs.entryName.includes('오시리') || inputs.entryName.includes('둔부');
        const not = inputs.entryName.includes('아니') || inputs.entryName.includes('아님') || inputs.entryName.includes('다르')
        const NG = inputs.entryName.includes('누엉') || inputs.entryName.includes('오시리스시')

        if (snom && ass && !not) {
            return false;
        }

        if (NG) return false;

        return true;
    } // 누잘알 검사

    const PostEntry = async () => {
        try {
            const today = new Date();
            const expiredDay = new Date();

            const cpInputs = {
                ...inputs,
                entryAt: today,
                expiredAt: new Date(expiredDay.setDate(today.getDate() + 7)),
            };

            let response = await fetch(`/entry/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(cpInputs),
            })

            if (!response.ok) {
                const data = (await response.text()).split(',');
                const message = await data[1].split(':')[1].replaceAll('"', '');

                setAlertMessage(message);
                throw new Error(message);
            }

            //alert('참가 완료되었습니다.');
            Router.push("/");

        } catch (Error) {
            if (Error) {
                setOpenAlert(!openAlert);
            }
            else {
                setAlertMessage('참가자 등록에 실패하였습니다.');
                setOpenAlert(!openAlert);
            }

            return;
        }
    } // 참가자를 등록한다.

    const Submit = async () => {
        console.log(inputs)

        if (!vaild()) {
            setOpenAlert(!openAlert);
            return;
        } // 유효성 실패

        if (!snomVaild()) {
            setOpenSnom(!openSnom);
            return;
        } // 누알못 탐지

        //PostEntry();
    } // 등록하기

    const Radio = () => {
        return (
            <div className='w-full h-auto mb-6 text-sm sm:text-base'>
                <div className='mr-6'>
                    <input
                        id="ORIGIN"
                        value="ORIGIN"
                        name="entryType"
                        type="radio"
                        checked={inputs.entryType === "ORIGIN"}
                        onChange={onChange}
                    />
                    <span className='ml-2'>오리지널 모드</span>
                </div>
                <div>
                    <input
                        id="CHO_GO_SU"
                        value="CHO_GO_SU"
                        name="entryType"
                        type="radio"
                        checked={inputs.entryType === "CHO_GO_SU"}
                        onChange={onChange}
                    />
                    <span className='ml-2'>초고수 모드</span>
                </div>
            </div>
        )
    }

    return (
        <>
            {openHowto && <ModelHowTo onOpenAlert={onHowtoAlert} />}
            {openAlert && <ModalAlert onOpenAlert={onModalAlert} data={alertMessage} />}
            {openSnom && <NualmotAlert onOpenAlert={onSnomAlert} onConfirm={() => { setOpenSnom(!openSnom); PostEntry(); }} />}
            <div className={"w-full h-auto bg-[#F9F9FB]" + (openAlert ? " blur-sm" : "") + (openSnom ? " blur-sm" : "") + (openHowto ? " blur-sm" : "")}>
                <Header />
                <div className={mainDiv}>
                    <div className={segDiv}>
                        <div className={segTitle}>접수하기</div>
                        <div className={"w-full h-auto pb-6 border-b-[1.5px] border-b-[#dfe0ea]"}>Do the G 2023 대회를 접수합니다.</div>
                        <div className='flex flex-col items-center'>
                            <div className={segInside + " mt-10 max-w-[720px] flex flex-col items-center justify-center"}>
                                <div className={segInsideTitle}>참가 모드를 선택해주세요.</div>
                                <Radio />
                                <div className={segInsideTitle}>참가자 이름을 알려주세요.</div>
                                <input className={inputDiv} type="text" id="entryName" name="entryName" value={inputs.entryName} placeholder='최대 10글자까지 입력가능' onChange={onChange} autoFocus />
                                <div className={segInsideTitle}>참가자의 북번호를 알려주세요. <span className={seglink + " ml-2 " + segInsideP} onClick={onHowtoAlert}>방법</span></div>
                                <input className={inputDiv} type="text" id="taikoId" name="taikoId" value={inputs.taikoId} placeholder='숫자로 12글자 입력' onChange={onChange} />
                                <div className={segInsideTitle}>참가자의 이메일 연락처를 알려주세요.</div>
                                <input className={inputDiv} type="text" id="contacts" name="contacts" value={inputs.contacts} placeholder='이메일 형식으로 입력' onChange={onChange} />
                                <div className='flex flex-col items-center w-full h-auto mt-6'>
                                    <button className={inputButton} type="submit" onClick={Submit}>참가하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}