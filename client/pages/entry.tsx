import Header from '../components/header';
import Footer from '../components/footer';

import Router from "next/router";
import React, { useRef, useState } from "react";
import ModalAlert from "../components/alert/modalAlert"

export default function Entry() {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const onModalAlert = () => {
        setOpenAlert(!openAlert);
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

    async function Submit(e: any) {
        try {
            // TODO : POST 전 유효성 검사

            if (inputs.entryName.length > 10) {
                setAlertMessage("이름을 10글자 이하로 적어주세요.");
                throw Error();
            }

            if (inputs.taikoId.length !== 12) {
                setAlertMessage("참가자의 북번호는 숫자로 12글자여야합니다.");
                throw Error();
            }

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
            //Router.push("/");

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

    const Radio = () => {
        return (
            <div className='text-xl mb-5 p-2'>
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
                    className='ml-3'
                />
                초고수 모드
            </div>
        )
    }

    return (
        <>
            {openAlert && <ModalAlert onOpenAlert={onModalAlert} data={alertMessage}/>}
            <div className='bg-[#F9F9FB]'>
                <Header />
                <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                    <div className="w-[70vw] my-6 sm:my-10 text-[#121316] text-4xl flex flex-col font-['SDKukdetopokki-Lt']">
                        <div className='text-3xl my-5 font-bold w-[auto]'>접수하기</div>
                        <p className='text-xl mb-2 w-[full]'>Do the G 2023 대회를 접수합니다.</p>
                        <div className='w-[full] h-auto my-5'>
                            <p className='text-xl mb-3 w-[full]'>참가 모드를 선택해주세요.</p>
                            <Radio />
                            <p className='text-xl mb-3 w-[full]'>참가자 이름을 알려주세요.</p>
                            <input className='text-xl mb-5 p-2 w-[60vw] border-2 rounded-md' type="text" id="entryName" name="entryName" onChange={onChange} />
                            <p className='text-xl mb-3 w-[full]'>참가자의 북번호를 알려주세요.</p>
                            <input className='text-xl mb-5 p-2 w-[60vw] border-2 rounded-md' type="text" id="taikoId" name="taikoId" onChange={onChange} />
                            <p className='text-xl mb-3 w-[full]'>참가자의 이메일 연락처를 알려주세요.</p>
                            <input className='text-xl mb-10 p-2 w-[60vw] border-2 rounded-md' type="text" id="contacts" name="contacts" onChange={onChange} />
                            <button className='text-xl p-3 mb-3 w-[15vw] h-auto bg-slate-500 rounded-md' type="submit" onClick={Submit}>Submit</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}