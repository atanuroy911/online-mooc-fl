'use client'

import Footer from "@/app/components/footer";
import Header from "../components/header";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="px-10 mx-auto bg-gray-50 w-full">
                <Header></Header>
            </div>
            {children}
        </>

    );
}
