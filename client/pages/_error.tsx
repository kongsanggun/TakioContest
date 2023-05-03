import Header from '../components/header';
import Footer from '../components/footer';
import { NextApiResponse, NextPageContext } from 'next'

function Error({ statusCode }: NextApiResponse) {
    return (
        <div className='bg-[#F9F9FB]'>
            <Header />
            <div className="w-full h-auto text-[#121316] font-['SDKukdetopokki-Lt'] py-6 sm:py-8 border-b-[1.5px] border-b-[#BEC0D7] flex flex-col items-center">
                <p>
                    {statusCode
                        ? `An error ${statusCode} occurred on server`
                        : 'An error occurred on client'}
                </p>
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