import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Noto_Sans } from 'next/font/google';

const noto_sans = Noto_Sans({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${noto_sans.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}
