/* eslint-disable react/jsx-key */
"use client"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products';
import { getAllReviwAPI } from '@/app/services/apis/user';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import Image from 'next/image';

const ProductById = ({ params }: { params: { id: any | string } }) => {
  const router = useRouter();

  const [value, setValue] = useState()
  const [productData, setProductData] = useState<any>()
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [itemGet, setItemGet] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [length, setlength] = useState("")
  const [review, setreview] = useState<any>([])
  const products = async () => {
    try {
      const res = await GetProductByIdAPI(params.id);
      if (res.status == 200 && res.message === "Product found successfully") {
        if (res.getProduct.productStockQuantity <= 10) {
          setQuantity(res.getProduct.productStockQuantity)
        }
        setProductData(res.getProduct)
        setSelectedImage(res?.getProduct.productImg[0])

        const productData = {
          productId: res.getProduct._id,
          productImg: res?.getProduct.productImg[0],
          productName: res?.getProduct.productName,
        };
        const storedProducts = localStorage.getItem("cardproducts");
        let productArray: any[] = storedProducts ? JSON.parse(storedProducts) : [];

        const productIndex = productArray.findIndex((p: { productId: any; }) => p.productId === productData.productId);
        if (productIndex > -1) {
          productArray[productIndex] = productData;
        } else {
          productArray.push(productData);

          if (productArray.length > 10) {
            productArray.shift();
          }
        }

        localStorage.setItem("cardproducts", JSON.stringify(productArray))
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };


  const getAllreview = async () => {
    const response = await getAllReviwAPI(params.id)
    if (response?.status === 200) {
      console.log("review", response.data.length)
      setlength(response?.data?.length)
      setreview(response?.data)
    } else {
      console.log("error")
    }
  }


  const handleAddToCart = async () => {
    toast.error("Login first !")
    setTimeout(() => {
      router.replace('/login')
    }, 1000);

  }


  useEffect(() => {
    products()
    getAllreview()
  }, [])
  return (
    <div className=' bg-white mt-4 mb-4 '><section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image
                    className="h-full w-full max-w-full object-cover"
                    src={selectedImage}
                    alt=""
                    width={400}
                    height={300}
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                {productData?.productImg?.map((image: any, index: any) => (
                  <Image
                    key={index}
                    className={`cursor-pointer border ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    src={image}
                    alt={`Product Image ${index}`}
                    onClick={() => handleImageClick(image)}
                    width={400}
                    height={300}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{productData?.productBrand[0].toUpperCase() + productData?.productBrand.slice(1)} -  {productData?.productName[0].toUpperCase() + productData?.productName?.slice(1)}</h1>

            {review && review?.length > 0 ? review.map((data: any, index: any) => (
              <div className="mt-5 flex items-center">
                <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
                <p className="ml-2 text-sm font-medium text-gray-500">{length} Reviews</p>
              </div>
            )) : ""}


            <div className="mt-6  gap-1">
              <li className=" rounded-lg  py-2 font-bold">{productData?.productDescription}</li>
              <li className=" rounded-lg  py-2 font-bold">{productData?.productFeature}</li>
              <li className=" rounded-lg  py-2 font-bold">{productData?.productBrand}</li>

            </div>


            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">₹ {productData?.productPrice}</h1>

              </div>

              <button onClick={handleAddToCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to cart
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                </svg>
                Free shipping worldwide
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
            <div className='flex flex-col my-24 border border-gray-100 p-4'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl my-6 font-bold'>Reviews</h1>
                {/* <button className='text-yellow-600 font-bold text-xl bg-yellow-50 rounded-md px-2 py-1 hover:shadow-lg'>Add Review</button> */}
              </div>
              {review && review?.length > 0 ? review.map((data: any, index: any) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-block relative">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                          src={data?.userId?.profileImg}
                          alt="Profile picture"
                          width={400}
                          height={300}
                        />
                        <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                      </div>
                      <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="flex items-baseline">
                      <span className="text-gray-600 font-bold">{data?.userId?.fullName[0].toUpperCase() + data?.userId?.fullName.slice(1)}</span>
                      <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
                    </p>
                    <div className="flex items-center mt-1">
                      <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
                    </div>
                    <div className="flex items-center mt-4 text-gray-600">
                      <div className="flex items-center">
                        <span className="text-sm">Rating</span>
                        <div className="flex items-center ml-2">
                          <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
                        </div>
                      </div>

                    </div>
                    <div className="mt-3">
                      <span className="font-bold">Description</span>
                      <p className="mt-1">{data?.comment}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                      <button className="flex items-center">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" /></svg>
                        <span className="ml-2">Share</span>
                      </button>

                    </div>
                  </div>
                </div>
              )) : "No reviews !"}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <p title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </p>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
              <h1 className="mt-8 text-3xl font-bold">From {productData?.productBrand[0].toUpperCase() + productData?.productBrand.slice(1)}</h1>
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
              <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
      <ToastContainer />
    </div>
  )
}

export default ProductById