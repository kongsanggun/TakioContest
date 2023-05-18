import { useEffect } from "react";
import {Oval} from "react-loader-spinner"

const Spanner = ({loading} : any) => {
    return (
        <div className={'h-screen w-full bg-scroll left-0 right-0 top-0 flex fixed justify-center items-center bg-[#DAECFC] text-center duration-1000 ' + ((loading == true) ? 'opacity-100 z-10': 'opacity-0 -z-10')}>
            <Oval
                height={95}
                width={95}
                color="#1973AA"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#1973AA"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />
        </div>
    )
}

export default Spanner;