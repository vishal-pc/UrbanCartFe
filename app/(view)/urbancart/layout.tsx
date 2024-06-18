"use client"
import "../../globals.css"
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import "../../style/app.css"
import React from "react";
import { SubMenu } from "@/app/components/subMenu";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <React.Suspense fallback={<>...</>}>
      <div className="bg-gray-200 text-gray-600 work-sans leading-normal text-base tracking-normal" suppressHydrationWarning={true}>
        <Navbar />
        <SubMenu/>
        {children}
        <Footer />
      </div>
    </React.Suspense>
  );
}
