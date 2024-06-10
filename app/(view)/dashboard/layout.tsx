"use client"
import "../../globals.css"
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import "../../style/app.css"
import { useDispatch } from "react-redux";
import { UserRoleAPI } from "@/app/services/apis/user";
import { jwtEncodeData } from "@/app/helpers";
import { addUser } from "@/app/store/slices/userSlicer";
import { useLayoutEffect } from "react";
import React from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // const dispatch = useDispatch();

    const data = async()=>{
      const userData = await UserRoleAPI();
      const jwtencode:any = jwtEncodeData(userData.userData);
    //   dispatch(addUser(jwtencode))
    }

    useLayoutEffect(()=>{
      data()
    },[])
  return (
    <React.Suspense fallback={<>...</>}>
      <div className="bg-gray-200 text-gray-600 work-sans leading-normal text-base tracking-normal" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </React.Suspense>
  );
}
