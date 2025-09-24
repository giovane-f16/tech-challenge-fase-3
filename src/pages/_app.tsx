import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SessionProviderWrapper from "@/providers/session";
import KeepAlive from "@/components/keep";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProviderWrapper>
            <div className="flex flex-col min-h-screen">
                <Header />
                <KeepAlive />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </SessionProviderWrapper>
    );
}
