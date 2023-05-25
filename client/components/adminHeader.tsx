import Link from "next/link";
import Router from "next/router";

const AdminHeader = () => {

    const Admin = () => {
        localStorage.removeItem('token');
        Router.push("/");
        return null;
    }

    const linkClass = "w-auto h-full mx-4 sm:mx-6 flex items-center text-center justify-center hover:text-[#245A8D] hover:border-b-8 hover:border-[#245A8D] duration-150"

    return (
        <header>
            <div className="w-full h-20 flex items-center justify-between border-b-[0.5px] border-b-[#BEC0D7]">
                <div className='w-[10vw] h-full'> </div>
                <div className='w-[80vw] text-base sm:text-2xl h-full text-[#121316] flex items-center justify-center font-["SDKukdetopokki-Lt"] duration-200'>
                    <Link className={linkClass} href="/admin/user">유저관리</Link>
                    <Link className={linkClass} href="/admin/ranking">랭킹수집관리</Link>
                </div>
                <div className='w-[10vw] h-full text-[#121316] flex items-center justify-center' onClick={Admin}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[40px] h-[40px] hover:fill-[#BEC0D7] duration-150">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader;