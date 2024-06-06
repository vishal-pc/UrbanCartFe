"use client";
import Link from "next/link";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { loginUserAPI, UserRoleAPI } from "@/app/services/apis/user/index";
// import { useCookies } from "next-client-cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { UserType } from "@/app/types/userTypes";
// import authConfig from "@/app/configs/auth";
// import { jwtEncodeData } from "@/app/helpers";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "@/app/style/globelColor.css"
import { usePathname } from "next/navigation";
// import Image from "next/image";

const initialFormState = {
    email: "",
    password: "",
};

const Login = () => {
    // const cookies = useCookies();
    // const router = useRouter();
    const pathname = usePathname();

    // const dispatch = useDispatch();
    // const userData = useSelector((state: any) => {
    //     return state.user;
    // });

    // UserType
    const [formValue, setFormValue] = useState<any>(initialFormState);
    const [formErrors, setFormErrors] = useState<any>({});
    const [isSubmit, setIsSubmit] = useState<Boolean>(false);

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     let errForm: {} | "" = validate(formValue);

    //     if (Object.keys(errForm).length !== 0) {
    //         setFormErrors(errForm);
    //     } else {
    //         const check = await LoginChecker(formValue);

    //         if (check) {
    //             setIsSubmit(true);
    //             const userResp = await UserRoleAPI();

    //             if (userResp.status == 200) {
    //                 setIsSubmit(false);
    //                 const jwtencode = jwtEncodeData(userResp.userData.fullName);

    //                 const { role } = userResp.userData.role;
    //                 const jwtRole: any = jwtEncodeData(role);

    //                 if (role === "user") {
    //                     cookies.set(authConfig.storageRole, jwtRole);
    //                     localStorage.setItem(authConfig.storageRole, jwtRole);
    //                     router.push("/dashboard");
    //                 } else if (role === "admin") {
    //                     cookies.set(authConfig.storageRole, jwtRole);
    //                     localStorage.setItem(authConfig.storageRole, jwtRole);
    //                     router.push("/admin");
    //                 }
    //             } else {
    //                 toast.error("Server Error Please Wait!!");
    //             }
    //         }
    //     }
    // };

    // const LoginChecker = async (data: UserType) => {
    //     const isLoginData = await loginUserAPI(JSON.stringify(data));

    //     if (isLoginData?.status === 200) {
    //         cookies.set(authConfig.storageTokenKeyName, isLoginData.token);
    //         localStorage.setItem(authConfig.storageTokenKeyName, isLoginData.token);

    //         return isLoginData;
    //     } else {
    //         toast.error(isLoginData?.message);
    //         return false;
    //     }
    // };

    // const handleChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setFormValue((prevProps: any) => ({
    //         ...prevProps,
    //         [name]: value,
    //     }));
    // };

    // const validate = (values: any | {}) => {
    //     const errors: UserType | any = {};

    //     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //     console.log("regex email values", regex.test(values.email));
    //     if (!values.email) {
    //         errors.email = "Email cannot be empty.";
    //         toast.error("Email cannot be empty.");
    //     } else if (regex.test(values.email) == false) {
    //         errors.email = "Please enter a valid email address.";
    //         toast.error("Please enter a valid email address.");
    //     }

    //     if (!values.password) {
    //         errors.password = "Password is required";
    //         toast.error("Password is required");
    //     } else if (values.password.length < 8 || values.password.length > 10) {
    //         errors.password = "Password must be between 8 and 10 characters long";
    //         toast.error("Password must be between 8 and 10 characters long");
    //     }

    //     return errors;
    // };
    // const links = pathname.startsWith("/") ? "/" : "/admin";
    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className=" h-screen flex items-center justify-center font-poppins" style={{ backgroundImage: `url('/images/blackBackground.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="relative w-[850px] h-[500px] bg-slate-400 rounded-lg overflow-hidden flex ">
                    <div className="w-1/2  custom-text-color flex flex-col justify-center items-center p-10 custom-bg-color " >
                        <h1 className="mb-4">Welcome Back !</h1>
                        <p className="text-center mb-8">Enter Your Personal Details And Start Your Journey With Us !</p>
                        <Link href="/register" className="border border-amber-200 py-2 px-6 rounded-full custom-text-color">
                            Sign Up
                        </Link>
                    </div>
                    <div className="w-1/2 p-10 flex flex-col justify-center items-center">
                        <form className="flex flex-col items-center w-full">
                            {/*  onSubmit={handleSubmit} */}
                            <h1 className="custom-text-color mb-4 text-2xl">Login</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="w-full p-3 mb-3 bg-slate-700 border-none outline-none rounded-full"
                                value={formValue.email}
                            // onChange={handleChange}
                            />
                            <div className="w-full relative">
                                <input
                                    type={type}
                                    placeholder="Password"
                                    name="password"
                                    className="w-full p-3 mb-3 bg-slate-700 border-none outline-none rounded-full"
                                    value={formValue.password}
                                // onChange={handleChange}
                                />
                                <span className="absolute top-3 right-3 cursor-pointer" >
                                    {/* onClick={handleToggle} */}
                                    <Icon icon={icon} size={20} />
                                </span>
                            </div>
                            <button className="w-full py-3 mt-4 custom-bg-color custom-text-color font-bold rounded-full">{isSubmit ? "Loading......." : "Log In"}</button>
                        </form>
                        <button className="w-full py-3 mt-4 custom-bg-color custom-text-color font-bold rounded-full"><Link href="/forgot">
                            Forget Password
                        </Link></button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;
