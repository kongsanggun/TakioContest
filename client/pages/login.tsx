import Header from '../components/header';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";
import ModalAlert from "../components/alert/modalAlert"

// TODO : 로그인 버튼을 통해서 위 페이지에 접근하기 아닐시 오류 페이지 이동

export default function Login() {

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    // 주로 자주 사용하는 CSS 정리
    const mainDiv = "w-full h-auto flex flex-col items-center"
    const segDiv = "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt']"
    const segTitle = "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"
    const segSubTitle = "w-full h-auto text-xl sm:text-2xl mb-6 font-['SDKukdetopokki']"
    const segp = "w-full h-auto"
    const seglink = "w-[15%] min-w-[100px] h-auto text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']"

    const segInside = "w-full h-[500px] py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#BED5ED] rounded-xl drop-shadow-md"
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

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    async function login(e: any) {
        try {
            const cpInputs = {
                ...inputs,
            };

            let response = await fetch(`/auth/login`, {
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

            let resJSON = await response.json();

            alert('로그인 성공!');
            localStorage.setItem('token', resJSON.token);
            Router.push("/admin/user");

        } catch (Error) {
            if (Error) {
                // TODO : 팝업 생성;
                setOpenAlert(!openAlert);
            }
            else {
                setAlertMessage('로그인에 실패하였습니다.');
                setOpenAlert(!openAlert);
            }

            return;
        }
    }

    return (
        <>
            {openAlert && <ModalAlert onOpenAlert={onModalAlert} data={alertMessage} />}
            <div className={"w-full h-auto bg-[#F9F9FB]" + (openAlert ? " blur-sm" : "")}>
                <Header />
                <div className={mainDiv}>
                    <div className={segDiv}>
                        <div className={segTitle}>Login</div>
                        <div className={"w-full h-auto pb-6 border-b-[1.5px] border-b-[#dfe0ea]"}>Do the G 2023 관리자용 로그인 페이지입니다.</div>
                        <div className='flex flex-col items-center'>
                            <div className={segInside + " mt-10 max-w-[720px] flex flex-col items-center justify-center"}>
                                <div className={segInsideTitle}>ID</div>
                                <input className={inputDiv} type="text" id="username" name="username" placeholder='ID를 입력하세요.' onChange={onChange} />
                                <div className={segInsideTitle}>Password</div>
                                <input className={inputDiv} type="password" id="password" name="password" placeholder='비밀번호를 입력하세요.' onChange={onChange} />
                                <div className='flex flex-col items-center w-full h-auto mt-6'>
                                    <button className={inputButton} type="submit" onClick={login} >로그인</button>
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