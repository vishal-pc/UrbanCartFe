"use client"
import Link from "next/link"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserForgotType } from "@/app/types/userTypes";
// import { forgotPasswordAPI } from "@/app/services/apis/user";
import ResetPass from "./reset";
import "@/app/style/globelColor.css"
import { usePathname } from "next/navigation";
import Image from "next/image";
// import siteIcon from "@/public/images/4.svg";

const ForgotPass = () => {

  // const [formValue, setFormValue] = useState<UserForgotType>({ email: "" })
  const [otpSend, setOtpSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname();


  // const handleForgot = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault()

  //     setLoading(true)
  //     const resp = await forgotPasswordAPI(formValue);
  //     if (resp.status == 404 && resp.message == "Email not found") {
  //       toast.error(resp.message)

  //     } else if (resp.status == 200) {

  //       toast.success(resp.message)
  //       setTimeout(() => {
  //         setLoading(false)
  //         setOtpSend(true)

  //       }, 2000)
  //     }

  //   } catch (error) {
  //     console.log("handleForgot--", error);
  //   }
  // }

  // const handleForm = (e: any) => {
  //   try {
  //     const { name, value } = e.target;

  //     setFormValue((prevProps: any) => ({
  //       ...prevProps,
  //       [name]: value
  //     }));

  //   } catch (error) {
  //     console.log("error--", error);
  //   }
  // }

  return (
    <>
      <ToastContainer autoClose={2000} />
      {/* {otpSend == false ? */}
      <div className="h-screen flex flex-col">
        <div className="relative w-full h-[250px]">
          <Image
            src="/DIMG/goldblack.png"
            fill
            style={{ objectFit: 'cover' }}
            alt="Header Background"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold">ACCOUNT</h1>
            <p>Home / Forgot Password</p>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center text-white background-color">
          <h1 className="text-3xl text-center mb-4">Forgot Password</h1>
          <form className="flex flex-col items-center w-full max-w-md "
          // onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 mb-3 bg-gray-800 border border-amber-200 rounded background-color "
            // value={formValue.email}
            // onChange={handleChange}
            />
            <button className="w-full py-3 mt-4 bg-gray-700 text-white font-bold rounded">Send Otp {loading == true ? "Loading...." : ""}</button>
          </form>
          <Link href="/login" className="block text-center mt-4 custom-text-color">
            Login Account
          </Link>
        </div>
      </div>
      {/* : <ResetPass formValue={formValue} />} */}
    </>
  )
}

export default ForgotPass