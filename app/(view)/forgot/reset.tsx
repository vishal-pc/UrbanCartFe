"use client"
import Link from "next/link"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserResetType } from "@/app/types/userTypes";
// import { forgotResetAPI } from "@/app/services/apis/user";
import { useRouter } from "next/navigation";
import "@/app/style/globelColor.css"
import { usePathname } from "next/navigation";
// import Image from "next/image";
// import siteIcon from "@/public/images/4.svg";

const ResetPass = (props: { formValue: { email: string } }) => {

  const router = useRouter()
  const pathname = usePathname();
  const { email } = props.formValue;

  // const [formVal, setFormVal] = useState<UserResetType>({
  //   email: email, otp: "", newPassword: "",
  //   confirmPassword: ""
  // })

  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault()
  //     let errForm: {} | "" = validate(formVal);

  //     if (!Object.keys(errForm).length) {

  //       const resp = await forgotResetAPI(formVal);
  //       if (resp.status == 404 && resp.message == "Invalid OTP or OTP expired") {
  //         toast.error(resp.message)
  //       } else if (resp.status == 200) {
  //         toast.success("your password reset successfully...!")
  //         setTimeout(() => {
  //           router.replace("/login");
  //         }, 1000)
  //       }

  //     }

  //   } catch (error) {
  //     console.log("handleForgot--", error);
  //   }
  // }

  // const handleForm = (e: any) => {
  //   try {
  //     const { name, value } = e.target;
  //     setFormVal((prevProps: any) => ({
  //       ...prevProps,
  //       [name]: value
  //     }));

  //   } catch (error) {
  //     console.log("error--", error);
  //   }
  // }

  // const validate = (values: any | {}) => {
  //   const errors: UserResetType | any = {};

  //   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   console.log("valuess", values, regex.test(values.email))

  //   if (!values.email) {
  //     errors.email = "Email cannot be empty.";
  //     toast.error("Email cannot be empty.");

  //   } else if (regex.test(values.email) == false) {
  //     errors.email = "Please enter a valid email address.";
  //     toast.error("Please enter a valid email address.");
  //   }

  //   if (!values.otp) {
  //     errors.otp = "OTP cannot be empty.";
  //     toast.error("OTP cannot be empty.");
  //   } else if (!/^\d+$/.test(values.otp)) {
  //     errors.otp = "OTP must be a numeric value.";
  //     toast.error("OTP must be a numeric value.");

  //   } else if (values.otp.length !== 4) {
  //     errors.otp = "OTP must be a 4-digit number.";
  //     toast.error("OTP must be a 4-digit number.");
  //   }

  //   if (values.newPassword !== values.confirmPassword) {
  //     errors.password = "Passwords do not match.";
  //     toast.error("Passwords do not match..");
  //   }

  //   if (!values.newPassword) {
  //     errors.password = "Password is required";
  //     toast.error("Password is required");
  //   } else if (values.newPassword.length < 8 || values.newPassword.length > 10) {
  //     errors.password = "Password must be between 8 and 10 characters long";
  //     toast.error("Password must be between 8 and 10 characters long");
  //   }
  //   return errors;
  // }


  return (
    <>
      <ToastContainer autoClose={1000} />
      {email ?
        <div className="h-screen bg-slate-800 flex items-center justify-center font-poppins" style={{ backgroundImage: `url('/images/blackBackground.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative w-[850px] h-[500px] bg-white shadow-custom rounded-lg overflow-hidden flex">
            <div className="w-1/2 custom-bg-color text-white flex flex-col justify-center items-center p-10">
              <h1 className="mb-4">Reset Password !</h1>
              <p className="text-center mb-8">Enter The Details For Rest Your Password</p>
            </div>
            <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-slate-400">
              <form className="flex flex-col items-center w-full"
              // onSubmit={handleSubmit}
              >
                <h1 className="custom-text-color mb-4 rounded-full">Reset Password</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none rounded-full bg-slate-700"
                  defaultValue={email}
                  disabled
                />
                <input
                  type="text"
                  placeholder="otp"
                  name="otp"
                  inputMode="numeric"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none rounded-full bg-slate-700"
                // value={formVal.otp}
                // onChange={handleForm}
                />
                <input
                  type="password"
                  placeholder="newPassword"
                  name="newPassword"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none rounded-full bg-slate-700"
                // value={formVal.newPassword}
                // onChange={handleForm}
                />
                <input
                  type="password"
                  placeholder="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none rounded-full bg-slate-700"
                // value={formVal.confirmPassword}
                // onChange={handleForm}
                />
                <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold rounded-full">Reset password</button>
              </form>
              <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold rounded-full"><Link href="/login">
                Back to login
              </Link></button>
            </div>
          </div>
        </div>
        : ""}
    </>
  )
}

export default ResetPass