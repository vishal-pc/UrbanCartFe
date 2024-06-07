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
import Image from "next/image";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
// import siteIcon from "@/public/images/4.svg";

const ResetPass = (props: { formValue: { email: string } }) => {

  const router = useRouter()
  const pathname = usePathname();
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [isSubmit, setIsSubmit] = useState(false);
  const { email } = props.formValue;


  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
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
      <ToastContainer autoClose={2000} />
      {/* {email ? */}
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
            <p>Home / Reset Password</p>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center text-white background-color">
          <h1 className="text-3xl text-center mb-4">Reset Password</h1>
          <form className="flex flex-col items-center w-full max-w-md "
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
            <div className="w-full relative">
              <input
                type={type}
                placeholder="Password"
                name="password"
                className="w-full p-3 mb-3 bg-gray-800 border border-amber-200 rounded background-color"
              // value={formVal.newPassword}
              // onChange={handleChange}
              />
              <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                <Icon icon={icon} size={20} />
              </span>
              <input
                type={type}
                placeholder="Password"
                name="password"
                className="w-full p-3 mb-3 bg-gray-800 border border-amber-200 rounded background-color"
              // value={formVal.confirmPassword}
              // onChange={handleChange}
              />
              <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                <Icon icon={icon} size={20} />
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gray-700 text-white font-bold rounded "
            >
              {isSubmit ? "Loading......." : "Reset password"}
            </button>
          </form>
          <Link href="/login" className="block text-center mt-4 custom-text-color">
            Login Account
          </Link>
        </div>
      </div>
      {/* : ""} */}
    </>
  )
}

export default ResetPass