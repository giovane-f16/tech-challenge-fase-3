import type { AppProps } from "next/app";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
}

export default MyApp;
