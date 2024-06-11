"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authConfig from "@/app/configs/auth";
import { jwtEncodeData } from "@/app/helpers";
import { Icon } from "react-icons-kit";
import Image from 'next/image';
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "@/app/style/globelColor.css"
import { usePathname } from "next/navigation";
import { useFormik } from "formik";
import  * as Yup from "yup"
import { UserType } from "@/app/types/userTypes";
import { UserRoleAPI, loginUserAPI } from "@/app/services/apis/user";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";


const Login = () => {
    const cookies = useCookies();
    const router = useRouter();
    const pathname = usePathname();
    
    // const dispatch = useDispatch();
    // const userData = useSelector((state: any) => {
    //         return state.user;
    //     });
        
        // UserType
        // const [formValue, setFormValue] = useState<any>(initialFormState);
        const [formErrors, setFormErrors] = useState<any>({});
        const [isSubmit, setIsSubmit] = useState<Boolean>(false);
        
        const [type, setType] = useState("password");
        const [icon, setIcon] = useState(eyeOff);
        
        const val = {
            email: "",
            password: "",
        };
        const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };
    
    const login=Yup.object({
           email:Yup.string().email("Invalid email").required("Please enter email"),
           password:Yup.string().required('Password is required')

    })

    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
               initialValues:val,
               validationSchema:login,
               onSubmit:async(values,action)=>{
                console.log(values)
                const check = await LoginChecker(values);
                        if (check) {
                            setIsSubmit(true);
                            const userResp = await UserRoleAPI();
            
                            if (userResp.status == 200) {
                                setIsSubmit(false);
                                
                                const { role } = userResp.userData.role;
                                const jwtRole: any = jwtEncodeData(role);
            
                                if (role === "user") {
                                    cookies.set(authConfig.storageRole, jwtRole);
                                    localStorage.setItem(authConfig.storageRole, jwtRole);
                                    router.push("/dashboard");
                                } else if (role === "admin") {
                                    cookies.set(authConfig.storageRole, jwtRole);
                                    localStorage.setItem(authConfig.storageRole, jwtRole);
                                    router.push("/admin");
                                }
                            } else {
                                toast.error("Server Error Please Wait!!");
                            }
               }
    }})
 

    const LoginChecker = async (data: UserType) => {
        const isLoginData = await loginUserAPI(JSON.stringify(data));

        if (isLoginData?.status === 200) {
            cookies.set(authConfig.storageTokenKeyName, isLoginData.token);
            localStorage.setItem(authConfig.storageTokenKeyName, isLoginData.token);

            return isLoginData;
        } else {
            toast.error(isLoginData?.message);
            return false;
        }
    };

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
                        <p>Home / Login</p>
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center custom-text-color background-color">
                    <h1 className="text-3xl text-center mb-4">Login</h1>
                    <form className="flex flex-col items-center w-full max-w-md "
                    onSubmit={handleSubmit}
                    >
                        <div className="w-full my-2 relative">

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color "
                            value={values.email}
                            onBlur={handleBlur}
                           onChange={handleChange}
                           />
                           {errors.email && touched.email ? <p className="text-gray-700">{errors.email}</p> : null}
                        </div>
                        <div className="w-full relative">
                            <input
                                type={type}
                                placeholder="Password"
                                name="password"
                                className="w-full p-3 mb-3 bg-gray-800 border border-black rounded background-color"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                            {isSubmit ? "Loading......." : "Sign In"}
                        </button>
                    </form>
                    <Link href="/forgot" className="block text-center mt-4 custom-text-color ">
                        Forgot Your Password?
                    </Link>
                    <Link href="/register" className="block text-center mt-4 custom-text-color">
                        Create Account
                    </Link>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default Login;
