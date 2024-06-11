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
import * as Yup from "yup"
import { useFormik } from "formik";
import { error } from "console";
import { forgotResetAPI } from "@/app/services/apis/user";
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
  const val={
    email:email,
    otp:"",
    newPassword:"",
    confirmPassword:""
  }
 const passwordSchema=Yup.object({
    otp:Yup.number().required("Enter otp"),
    newPassword:Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+-]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)'
    ),
    confirmPassword:Yup.string().required("Confirm password please") .nullable().oneOf([Yup.ref("newPassword"),null],"Password must match")
  })

  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:val,
    validationSchema:passwordSchema,
    onSubmit:async(values,action)=>{
      console.log(values,email)
      const resp = await forgotResetAPI(values);
            if (resp.status == 404 && resp.message == "Invalid OTP or OTP expired") {
              toast.error(resp.message)
              
            } else if (resp.status == 200) {
              toast.success("your password reset successfully...!")
              setTimeout(() => {
                router.replace("/login");
              }, 1000)
            }
    }


  })

 

  return (
    <>
      <ToastContainer autoClose={2000} />
      {email ?
      <div className="h-screen flex flex-col">
        <div className="relative w-full h-[250px]">
          <Image
            src="/DIMG/bgImg.jpg"
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
        <div className="flex-grow flex flex-col items-center justify-center custom-text-color background-color">
        
          <form className="flex flex-col items-center w-full max-w-md "
          onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-center my-5">Reset Password</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
              value={values.email}
              readOnly
            />
            <div className="w-full relative ">

            <input
              type="text"
              placeholder="otp"
              name="otp"
              inputMode="numeric"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.otp && touched.otp ? <p className="text-gray-700">{errors.otp}</p>:null}
            </div>
            <div className="w-full relative ">
              <input
                type={type}
                placeholder="New Password"
                name="newPassword"
                className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                <Icon icon={icon} size={20} />
              </span>
              {errors.newPassword && touched.newPassword ? <p className="text-gray-700">{errors.newPassword}</p>:null}
              <input
                type={type}
                placeholder="Confirm Password"
                name="confirmPassword"
                className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                <Icon icon={icon} size={20} />
              </span>
              {errors.confirmPassword && touched.confirmPassword ? <p className="text-gray-700">{errors.confirmPassword}</p>:null}
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
      : ""}
    </>
  )
}

export default ResetPass