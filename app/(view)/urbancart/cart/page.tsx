"use client"
import React, { useEffect, useState, MouseEvent } from 'react'
import { getToCartAPI, updateCartItemAPI, delCartItemAPI, addToCartAPI, delCartQuantityAPI, stripeSessionAPI } from '@/app/services/apis/user'
import { useRouter } from "next/navigation"
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import EmptyCart from "@/public/images/bag.svg";
import Image from 'next/image';
import { dashboardLinks, urbancartLinks } from '@/app/configs/authLinks';
import "@/app/style/style.css"

  const UserCart = () => {

  const router = useRouter();

  const [getAllData, setGetAllData] = useState<any | []>([])
  const [subTotal, setSubTotal] = useState("")

  const handleClose = () => {
    router.replace(urbancartLinks.userHomeLink)
  }

  const ItemsInCart = () => {
    const data: any = localStorage.getItem("cartData");
    if (data) {
      const cartdata = JSON.parse(data);
      setGetAllData(cartdata);
    } else {
      setGetAllData([]);
    }
  };
  const handleAddToCart = async (productData: any) => {
    const param = {
      "productId": productData.productId,
      "productName": productData.productName
    }
   
  }

  const handleDelete = (id: string) => {
    const product: any = localStorage.getItem("cartData");
    if (product) {
      let data = JSON.parse(product);
      const find = data.filter((el: any) => el.id !== id);
      localStorage.setItem("cartData", JSON.stringify(find));
      ItemsInCart();
    }
  };
 const handleCheckout=()=>{
  router.replace("/login")
 }
  const handleDelCartQuantity = async (id: any) => {
      
  }

  const handleBuySingleCart =  () => {
   router.replace("/login")
  }


useEffect(()=>{
 ItemsInCart()

},[])
  return (
    <>

      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        </div>

         
        <div className="fixed inset-0 overflow-hidden">

          <div className="absolute inset-0 overflow-hidden">

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-xl">

                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">

                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={handleClose}>
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {getAllData && getAllData.length > 0 ? getAllData.map((data: any) => (


                            <div key={data?.id}>
                              <li className="flex py-6" >
                                <Link href={`/urbancart/products/${data?.id}`}>
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={data?.productImage} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                  </div>
                                </Link>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{data?.productName}</a>
                                      </h3>
                                      <p className="ml-4">₹ {data?.productPrice}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500 font-bold">
                                      <button data-action="decrement" className=" mr-1 bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-8 w-10 rounded-l cursor-pointer outline-none" disabled={data?.quantity === 1 ? true : false} onClick={() => handleDelCartQuantity(data._id)} >
                                        <span className="m-auto text-2xl font-thin">−</span>
                                      </button>

                                      Qty {data?.quantity}
                                      <button
                                        data-action="decrement"
                                        className="ml-1 bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-8 w-10 rounded-l cursor-pointer outline-none"
                                        onClick={() => handleAddToCart(data?.productQuantity)} // Pass parameters if needed
                                      >
                                        <span className="m-auto text-2xl font-thin">+</span>
                                      </button>
                                    </p>
                                    <div className="flex">
                                      <button type="button" onClick={()=>handleDelete(data?.id)} className="font-medium custom-text-color  mr-9">Remove</button>

                                      {getAllData && getAllData.length > 1 ?
                                        <button type="button" className="font-medium custom-text-color" onClick={ handleBuySingleCart}> Buy This Now</button>
                                        : ""}

                                    </div>
                                  </div>

                                </div>
                              </li>

                            </div>

                          )) :
                            <Image
                              priority
                              src={EmptyCart}
                              height={32}
                              width={32}
                              alt="Follow us on Twitter"
                            />
                          }
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      {subTotal != "" ? <p>₹ {subTotal}</p> : ""}

                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button type='submit' onClick={handleCheckout} className="flex bg-gray-700 items-center justify-center rounded-md border w-full border-transparent custom-bg-color px-6 py-3 text-base font-semibold text-white shadow-sm ">Checkout</button>
                    </div>
              
                  </div>
                
                  <div className="border-t border-gray-200 px-1 py-1 sm:px-1">
                    <div className="mt-6 flex justify-center text-center text-lg text-gray-500">
                      <p className='text-black font-semibold'>
                        or&nbsp;
                        <Link href="/urbancart" className="font-medium custom-text-color ">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </Link>
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </>
  )
}

export default UserCart