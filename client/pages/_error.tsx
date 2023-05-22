import Header from '../components/header';
import Footer from '../components/footer';
import { NextApiResponse, NextPageContext } from 'next'

function Error({ statusCode }: NextApiResponse) {
    return (
        <div className='bg-[#F9F9FB]'>
            <Header />
            <div className={'w-full h-[70vh] my-6 flex flex-col justify-center items-center text-center bg-[#F9F9FB]'}>
                <img src='https://donderhiroba.jp/image/sp/640/caution_640.png' alt='caution_640' />
                <div className="w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']"> {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'} </div>
            </div>
            <Footer />
        </div>
    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error