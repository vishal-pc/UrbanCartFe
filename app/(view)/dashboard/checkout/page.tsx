"use client"
import React,{useState,useEffect} from 'react'
import { getToCartAPI,getItemInCartAPI } from '@/app/services/apis/user';
import { loadStripe } from '@stripe/stripe-js';
import { addressType } from '@/app/types/userTypes';
import { addAddressApi } from '@/app/services/apis/address';
import { toast,ToastContainer } from 'react-toastify';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import CheckoutForm from '../components/checkoutForm/checkoutForm';
import { useSelector } from "react-redux";
import { jwtDecodeData } from '@/app/helpers';
import authConfig from '@/app/configs/auth';
import Image from 'next/image';


const CheckoutPage = () => {

  const publishableKey:string|any =  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  // const stripePromise = loadStripe(publishableKey);

  const userSelectData = useSelector((states:any) => states.users)
  let userCartId:any
  if(userSelectData?.cartId?.data !== undefined){
      userCartId = jwtDecodeData(userSelectData?.cartId?.data)
  }


  const [getAllData, setGetAllData] = useState<any|[]>([])
  const [subTotal, setSubTotal]     = useState("")

  const [formValue, setFormValue] = useState<addressType | any>({
     streetAddress: "",
     nearByAddress: "",
     country: "",
     state: "",
     city: "",
     areaPincode:"",
     mobileNumber:""    
    })


  const getAllCart = async () => {
    const cart :any= localStorage.getItem(authConfig.storageCart);
    const localCartId = jwtDecodeData(cart);
    const multiple=localStorage.getItem("multiple")
    userCartId = userCartId ? userCartId : localCartId;
    if(userCartId !="" && multiple==="false"){
  
      const resp = await  getItemInCartAPI(userCartId)
      if (resp?.status == 200) {
          const datas = resp.data.cartItems.filter((data:any)=>{
            if(data.message !== "Product not found"){
                return data
            }
          })
          // console.log("datas",datas)
          setGetAllData(datas)
          setSubTotal(resp.data.totalCartAmount);
        }

    }else if(multiple==="true"){
      const resp = await getToCartAPI();
      if (resp?.status == 200) {
        const datas = resp.data.cartItems.filter((data:any)=>{
          if(data.message !== "Product not found"){
              return data
          }
        })
        // console.log("datas",datas)
        setGetAllData(datas)
        setSubTotal(resp.data.totalCartAmount);
      }
    }
    
  }

  useEffect(() => {
    getAllCart()
  }, [])


 
  

  return (
    <>
    <ToastContainer />
    <div className="mt-8 mb-8 mr-12 ml-12  bg-white">
      <div className="grid min-h-screen grid-cols-10">
      <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <CheckoutForm />
      </div>



      {/* products listing start */}
    
    <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
      <h2 className="text-white mb-4" style={{zIndex:9}}>Order summary</h2>

      <div>
        <Image width={400} height={300} src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800 to-gray-400 opacity-95"></div>
      </div>


      <div className="relative">

        <ul className="space-y-5">

        {getAllData && getAllData.length > 0 ? getAllData.map((data: {quantity:number,productDetails:{productId:string,productImage:string,productName:string,productPrice:number}}) => (
          <li className="flex justify-between" key={data?.productDetails?.productId}>
            <div className="inline-flex">
            <Image
                    className="max-h-16"
                    src={data?.productDetails.productImage[0]}                   
                     alt="Product Image"
                    width={80}
                    height={70}
                  />
              <div className="ml-3">
                <p className="text-base font-semibold text-white">{data?.productDetails?.productName}</p>
                <p className="text-sm font-medium text-white text-opacity-80"> Qty {data?.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-white">₹ {data?.productDetails?.productPrice}</p>
          </li>

        )):""}

        </ul>

        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div className="space-y-2">
          <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>₹ {subTotal!="" ? subTotal : ""}</span></p>
        </div>
      </div>

    </div>


  </div>
</div>

    </>
  )
}

export default CheckoutPage
