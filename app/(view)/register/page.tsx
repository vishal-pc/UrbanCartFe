"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { registerUserAPI } from "@/app/services/apis/user";
// import { RegisterType } from "@/app/types/userTypes";
import "@/app/style/globelColor.css"
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { useFormik } from "formik";
import * as Yup from "yup"
import { registerUserAPI } from "@/app/services/apis/user";

const val= {
  fullName: "",
  email: "",
  password: ""
}

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmit, setIsSubmit] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const register=Yup.object({
    fullName:Yup.string().max(40).required("Please enter your name"),
    email:Yup.string().email("Invalid email").required("Please enter email"),
    password:Yup.string().required('Password is required')
           .min(8, 'Password must be at least 8 characters long')
           .matches(
             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+-]).{8,}$/,
             'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)'
           )
  })
  const {values,touched,errors,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:val,
    validationSchema:register,
    onSubmit:async(values,action)=>{
      console.log(values)
      setIsSubmit(true);
          const registerResp = await registerUserAPI(JSON.stringify(values));
          if (registerResp?.status == 201) {
            toast.success("Successfully registered.");
            action.resetForm()
            setTimeout(() => {
              router.push("/login")
            }, 1000);
          } else if (registerResp.status == 400) {
            // action.resetForm()
            setIsSubmit(false)
            toast.error(registerResp?.message)
          }
    }
  })


  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar/>
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
            <p>Home / Create Account</p>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center custom-text-color background-color">
          <h1 className="text-3xl text-center mb-4">Register</h1>
          <form className="flex flex-col items-center w-full max-w-md "
          onSubmit={handleSubmit}
          >
            <div className="w-full relative mb-2">
            <input
              type="text"
              placeholder="Name"
              name="fullName"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
              value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.fullName && touched.fullName ? <p className="text-gray-700">{errors.fullName}</p> : null}
            </div>
            <div className="w-full relative mb-2">

            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color "
              value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {errors.email && touched.email ? <p className="text-gray-700">{errors.email}</p> : null}
            </div>
            <div className="w-full relative mb-2">
              <input
                type={type}
                placeholder="Password"
                name="password"
                className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
                value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              />

              <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                <Icon icon={icon} size={20} />
              </span>
              {errors.password && touched.password ? <p className="text-gray-700">{errors.password}</p> : null}
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gray-700 text-white font-bold rounded "
            >
              {isSubmit ? "Loading......." : "Sign Up"}
            </button>
          </form>
          <Link href="/login" className="block text-center mt-4 custom-text-color">
            Login Account
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default RegisterPage;
