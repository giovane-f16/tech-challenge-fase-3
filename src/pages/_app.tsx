import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SessionProviderWrapper from "@/providers/session";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProviderWrapper>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </SessionProviderWrapper>
    );
}
