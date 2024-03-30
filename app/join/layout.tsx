'use client'

import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="container mx-auto">
                <Header></Header>
            </div>
            {children}
            <Footer></Footer>
        </>

    );
}
