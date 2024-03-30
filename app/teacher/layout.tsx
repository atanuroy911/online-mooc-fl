'use client'

import Footer from "../components/footer";
import Header from "./header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div suppressHydrationWarning>
                {children}
                <Footer></Footer>
            </div>
        </>

    );
}
