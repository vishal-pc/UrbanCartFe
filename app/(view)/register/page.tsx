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
// import siteIcon from "@/public/images/4.svg";

const initialFormState = {
  fullName: "",
  email: "",
  password: ""
}

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   let errForm = validate(value);

  //   if (Object.keys(errForm).length !== 0) {
  //     setFormErrors(errForm);
  //   } else {
  //     setFormErrors({});
  //     setIsSubmit(true);
  //     const registerResp = await registerUserAPI(JSON.stringify(value));
  //     if (registerResp?.status == 201) {
  //       toast.success("Successfully registered.");
  //       setTimeout(() => {
  //         router.push("/login")
  //       }, 1000);
  //     } else if (registerResp.status == 400) {
  //       toast.error(registerResp?.message)
  //     }
  //   }
  // }

  // const validate = (values: any | {}) => {
  //   const errors: RegisterType | any = {};

  //   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   console.log("valuess", values, regex.test(values.email))

  //   if (!values.fullName) {
  //     errors.fullName = "FullName cannot be empty";
  //     toast.error("FullName cannot be empty");
  //   }
  //   if (!values.email) {
  //     errors.email = "Email cannot be empty.";
  //     toast.error("Email cannot be empty.");

  //   } else if (regex.test(values.email) == false) {
  //     errors.email = "Please enter a valid email address.";
  //     toast.error("Please enter a valid email address.");
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //     toast.error("Password is required");
  //   } else if (value.password.length < 8 || value.password.length > 10) {
  //     errors.password = "Password must be between 8 and 10 characters long";
  //     toast.error("Password must be between 8 and 10 characters long");
  //   }

  //   return errors;
  // }

  return (
    <>
      <ToastContainer autoClose={2000} />
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
          // onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              name="fullName"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
              value={value.fullName}
            // onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color "
              value={value.email}
            // onChange={handleChange}
            />
            <div className="w-full relative">
              <input
                type={type}
                placeholder="Password"
                name="password"
                className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
                value={value.password}
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
              {isSubmit ? "Loading......." : "Sign Up"}
            </button>
          </form>
          <Link href="/login" className="block text-center mt-4 custom-text-color">
            Login Account
          </Link>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;
