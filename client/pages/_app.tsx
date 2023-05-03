import Header from '@/components/header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{`
        header, #Footer {
          font-family: 'SDKukdetopokki-Lt';
        }
      `}
            </style>
        </>
    )
}
