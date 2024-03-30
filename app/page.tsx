'use client'

import Image from "next/image";
import Page from "./landing/page";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      <div className="mx-auto bg-gray-50 px-10">
        <Header></Header>
      </div>
      <Page></Page>
      <Footer></Footer>
    </>
  );
}
