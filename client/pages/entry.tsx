import Header from '../components/header';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useRef, useState } from "react";
import ModalAlert from "../components/alert/modalAlert";
import NualmotAlert from "../components/alert/nualmotAlert";

export default function Entry() {
    const [openAlert, setOpenAlert] = useState(false);
    const [openSnom, setOpenSnom] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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
            openAlert ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const [inputs, setInputs] = useState({
        taikoId: "",
        entryName: "",
        contacts: "",
        entryType: "",
    });

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
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
        const NG = inputs.entryName.includes('누엉')

        if (snom && ass && !not ) {
            return false;
        }

        if(NG) return false;

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

    const Submit = async() => {
            if(!vaild()) {
                setOpenAlert(!openAlert);
                return;
            } // 유효성 실패

            if(!snomVaild()) {
                setOpenSnom(!openSnom);
                return;
            } // 누알못 탐지

            PostEntry();
    } // 등록하기

    const Radio = () => {
        return (
            <div className='text-base mb-6'>
                <input
                    id="ORIGIN"
                    value="ORIGIN"
                    name="entryType"
                    type="radio"
                    checked={inputs.entryType === "ORIGIN"}
                    onChange={onChange}
                />
                오리지널 모드
                <input
                    id="CHO_GO_SU"
                    value="CHO_GO_SU"
                    name="entryType"
                    type="radio"
                    checked={inputs.entryType === "CHO_GO_SU"}
                    onChange={onChange}
                    className='ml-5'
                />
                초고수 모드
            </div>
        )
    }

    return (
        <>
            {openAlert && <ModalAlert onOpenAlert={onModalAlert} data={alertMessage} />}
            {openSnom && <NualmotAlert onOpenAlert={onSnomAlert} onConfirm={() =>{setOpenSnom(!openSnom); PostEntry();}} />}
            <div className='bg-[#F9F9FB]'>
                <Header />
                <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 flex flex-col items-center">
                    <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                        <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                            <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">접수하기</div>
                            <div>Do the G 2023 대회를 접수합니다.</div>
                        </div>
                        <div className='py-4 px-4 mt-5 bg-[#F7F6F3] border-[1px] border-[#dfe0ea] rounded-lg'>
                            <p className='text-xl mb-4 w-[full]'>참가 모드를 선택해주세요.</p>
                            <Radio />
                            <p className='text-xl mb-4 w-[full]'>참가자 이름을 알려주세요.</p>
                            <input className='text-base mb-6 p-2 w-full border-2 rounded-md' type="text" id="entryName" name="entryName" onChange={onChange} />
                            <p className='text-xl mb-4 w-[full]'>참가자의 북번호를 알려주세요. <span className='text-rose-600'>❓</span></p>
                            <input className='text-base mb-6 p-2 w-full border-2 rounded-md' type="text" id="taikoId" name="taikoId" onChange={onChange} />
                            <p className='text-xl mb-4 w-[full]'>참가자의 이메일 연락처를 알려주세요.</p>
                            <input className='text-base mb-10 p-2 w-full border-2 rounded-md' type="text" id="contacts" name="contacts" onChange={onChange} />
                            <div className='w-full h-auto mb-3 flex flex-col items-center'> 
                            <button className='text-base p-3 w-[15vw] h-auto bg-slate-500 rounded-md' type="submit" onClick={Submit}>참가하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}