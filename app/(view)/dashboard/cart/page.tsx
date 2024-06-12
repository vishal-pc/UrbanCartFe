"use client"
import React, { useEffect, useState, MouseEvent } from 'react'
import { getToCartAPI, updateCartItemAPI, delCartItemAPI, addToCartAPI, delCartQuantityAPI, stripeSessionAPI } from '@/app/services/apis/user'
import { useRouter } from "next/navigation"
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import EmptyCart from "@/public/images/bag.svg";
import Image from 'next/image';
import { dashboardLinks } from '@/app/configs/authLinks';
import "@/app/style/style.css"

const UserCart = () => {

  const router = useRouter();

  const [getAllData, setGetAllData] = useState<any | []>([])
  const [subTotal, setSubTotal] = useState("")

  const getAllCart = async () => {
    const resp = await getToCartAPI();
    if (resp?.status === 200) {
      const datas = resp.data.cartItems.filter((data: any) => {
        if (data.message !== "Product not found") {
          return data
        }
      })
      // console.log("datas",datas)
      setGetAllData(datas)
      setSubTotal(resp.data.totalCartAmount);
      // console.log("all get cart", resp.data,datas)
    }
  }

  const handleUpdateCartItem = () => {
    updateCartItemAPI();
  }


  useEffect(() => {
    getAllCart()
  }, [])

  const handleClose = () => {
    router.replace(dashboardLinks.userHomeLink)
  }

  const handleDelCartItem = async (id: string) => {

    // console.log("remove cart--",id)
    const resp = await delCartItemAPI(id);
    if (resp.status == 200) {
      getAllCart();
      // console.log("res del item--",resp)
    }
  }

  const handleAddToCart = async (productData: any) => {
    // console.log("Sdfsdf09u889789798",productData)
    const param = {
      "productId": productData.productId,
      "productName": productData.productName
    }
    const resp = await addToCartAPI(param)
    // console.log("Increments--------", resp)
    if (resp.status == 200) {
      getAllCart();
      // console.log("Increments-----", resp)
      // router.replace("/dashboard/cart")
    }
  }


  const handleDelCartQuantity = async (id: any) => {

    const resp = await delCartQuantityAPI(id)
    if (resp.status == 200) {
      getAllCart();
    }

  }

  const handleGoToCart = async () => {
    router.replace("/dashboard/cart")
  }


  const handleBuySingleCart = async (id: string) => {
    router.replace(`/dashboard/cart/${id}`)
  }

  const publishableKey: string | any = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {

    // console.log("getAllData",getAllData)
    router.push(dashboardLinks.checkoutLinks);

  };
  const checkout = () => {
    localStorage.setItem("multiple", "true")
    router.push(getAllData.length > 0 ? dashboardLinks.checkoutLinks : dashboardLinks.productsLink)

  }

  return (
    <>

      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className='bg-white mt-8 mb-8 mr-12 ml-12'>
	<div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 opacity-75 h-full">
			<div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
				<a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
					<img src="https://images.unsplash.com/photo-1542062700-9b61ccbc1696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJlbmRzfGVufDB8fDB8fHww" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
					<div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
					<h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">New Trends</h3>
				</a>
			</div>
			<div className="col-span-2 sm:col-span-1 md:col-span-2  opacity-75">
				<a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
					<img src="https://plus.unsplash.com/premium_photo-1673502751768-586478eb3fcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmZXJzfGVufDB8fDB8fHww" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
					<div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
					<h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Offers</h3>
				</a>
				<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
					<a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
						<img src="https://plus.unsplash.com/premium_photo-1664201889896-6a42c19e953a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
						<div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
						<h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Deal of the Day</h3>
					</a>
					
				</div>
			</div>

		</div>
	</div>
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


                            <div key={data?.productDetails?.productId}>
                              <li className="flex py-6" >
                                <Link href={`/dashboard/products/${data?.productDetails?.productId}`}>
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={data?.productDetails.productImage[0]} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                  </div>
                                </Link>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{data?.productDetails?.productName}</a>
                                      </h3>
                                      <p className="ml-4">₹ {data?.productDetails?.productPrice}</p>
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
                                        onClick={() => handleAddToCart(data?.productDetails)} // Pass parameters if needed
                                      >
                                        <span className="m-auto text-2xl font-thin">+</span>
                                      </button>
                                    </p>
                                    <div className="flex">
                                      <button type="button" className="font-medium custom-text-color  mr-9" onClick={(e) => handleDelCartItem(data?._id)}>Remove</button>

                                      {getAllData && getAllData.length > 1 ?
                                        <button type="button" className="font-medium custom-text-color" onClick={(e) => handleBuySingleCart(data?._id)}> Buy This Now</button>
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
                      <button onClick={() => checkout()} type='submit' className="flex bg-gray-700 items-center justify-center rounded-md border w-full border-transparent custom-bg-color px-6 py-3 text-base font-semibold text-white shadow-sm ">Checkout</button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-1 py-1 sm:px-1">
                    <div className="mt-6 flex justify-center text-center text-lg text-gray-500">
                      <p className='text-black font-semibold'>
                        or&nbsp;
                        <Link href="/dashboard" className="font-medium custom-text-color ">
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