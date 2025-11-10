import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SessionProviderWrapper from "@/providers/session";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const defaultTitle = "Tech Challenge";
    const pageTitle = (pageProps && (pageProps as any).title) || (Component as any).title || defaultTitle;

    return (
        <SessionProviderWrapper>
            <>
                <Head>
                    <title>{pageTitle}</title>
                    <meta name="og:title" content={pageTitle} />
                    <link rel="icon" href="/favicon.svg" />
                </Head>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </div>
            </>
        </SessionProviderWrapper>
    );
}
