import Header from '../components/header';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useState, useEffect } from "react";
import ModalAlert from "../components/alert/modalAlert"

// TODO : 로그인 버튼을 통해서 위 페이지에 접근하기 아닐시 오류 페이지 이동

export default function Main() {

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const onModalAlert = () => {
        let HTML = document.querySelector('html');
        setOpenAlert(!openAlert);
        if (HTML !== null) {
            openAlert ? HTML.style.overflowY = "auto" : HTML.style.overflowY = "hidden";
        }
    }

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

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

            alert('로그인 성공!');
            Router.push("/admin");

        } catch (Error) {
            if (Error) {
                // TODO : 팝업 생성;
                setOpenAlert(!openAlert);
            }
            else {
                setAlertMessage('등록에 실패하였습니다.');
                setOpenAlert(!openAlert);
            }

            return;
        }
    }

    return (
        <>
            {openAlert && <ModalAlert onOpenAlert={onModalAlert} data={alertMessage} />}
            <div className='bg-[#F9F9FB]'>
                <Header />
                <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 flex flex-col items-center">
                    <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                        <div className='text-base border-b-[1.5px] border-b-[#dfe0ea] pb-5 mb-2 w-[full]'>
                            <div className="text-4xl mb-6 font-['SDKukdetopokki'] w-[auto]">Login</div>
                            <div>Do the G 2023 관리자용 로그인 페이지입니다.</div>
                        </div>
                        <div className='py-4 px-4 mt-5 bg-[#F7F6F3] border-[1px] border-[#dfe0ea] rounded-lg'>
                            <p className='text-xl mb-4 w-[full]'>ID</p>
                            <input className='text-base mb-6 p-2 w-full border-2 rounded-md' type="text" id="username" name="username" onChange={onChange} />
                            <p className='text-xl mb-4 w-[full]'>Password</p>
                            <input className='text-base mb-6 p-2 w-full border-2 rounded-md' type="password" id="password" name="password" onChange={onChange} />
                                <div className='w-full h-auto mb-3 flex flex-col items-center'> 
                            <button className='text-base p-3 w-[15vw] h-auto bg-slate-500 rounded-md' type="submit" onClick={login} >로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}