import React from "react";

import Image from 'next/image';
import GitHub from '../public/img/github-mark.png';

const Footer = () => {
    return (
        <footer>
            <div id="Footer" className='w-[full] h-auto min-h-[150px] text-[#121316] font-["SDKukdetopokki-Lt"] text-sm py-6 sm:py-8 border-t-[0.5px] border-t-[#BEC0D7] flex justify-center'>
                <div className='w-[10vw] sm:w-[15vw] h-full'> </div>
                <div className='w-[80vw] sm:w-[70vw] text-sm h-full text-[#121316] flex flex-col items-start justify-center font-["SDKukdetopokki-Lt"]'>
                    <div>Developed by <a href="https://snom.strongtrash.com" target="_blank" rel="noopener noreferrer"><u>Snom</u></a></div>
                    <div><del className='text-gray-400' title="진실된 발언" >누니머기는 엉덩이가 아닙니다!</del></div>
                    <div><a href="https://www.pokemon.com/us/pokedex/snom" target="_blank" rel="noopener noreferrer"><del className='text-gray-400'>누니머기가 무엇인가요?</del></a></div>
                </div>
                <div className='w-[10vw] sm:w-[15vw] min-w-[40px] h-full text-[#121316] flex items-center justify-center'>
                    <a href="https://github.com/kongsanggun" target="_blank" rel="noopener noreferrer"><Image src={GitHub} className='w-7 h-7 sm:w-10 sm:h-10' alt='github'></Image></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;