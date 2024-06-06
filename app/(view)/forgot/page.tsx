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
// import Image from "next/image";
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
      <div className="h-screen bg-slate-800 flex items-center justify-center font-poppins" style={{ backgroundImage: `url('/images/blackBackground.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative w-[850px] h-[500px] bg-white shadow-custom rounded-lg overflow-hidden flex">
          <div className="w-1/2 custom-bg-color text-white flex flex-col justify-center items-center p-10 ">
            <h1 className="mb-4">Forgot Password !</h1>
            <p className="text-center mb-8">Enter Your Email Id And We Will Send A Otp On Your Email !</p>
          </div>
          <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-slate-400">
            <form className="flex flex-col items-center w-full"
            // onSubmit={handleForgot}
            >
              <h1 className="custom-text-color mb-4">Forgot Password</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full p-3 mb-3 bg-gray-100 border-none outline-none rounded-full bg-slate-700"
              // value={formValue.email}
              // onChange={handleForm}
              />
              <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold rounded-full">Reset password {loading == true ? "Loading...." : ""}</button>
            </form>
            <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold rounded-full"><Link href="/login">
              Back to login
            </Link></button>
          </div>
        </div>
      </div>
      {/* : <ResetPass formValue={formValue} />} */}
    </>
  )
}

export default ForgotPass