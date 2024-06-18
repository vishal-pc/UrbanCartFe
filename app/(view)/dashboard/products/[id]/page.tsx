/* eslint-disable react/jsx-key */
"use client"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products';
import { AddtoWishlistAPI, DeleteWishListAPI, addToCartAPI, getAllReviwAPI, getToCartAPI, getuserWishlistAPI } from '@/app/services/apis/user';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "../../style/subcateCard.css"
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardLinks } from '@/app/configs/authLinks';
import { getSubCateProductByIdAPI } from '@/app/services/apis/user/categories';
import { GoHeart, GoHeartFill } from 'react-icons/go';


const ProductById = ({ params }: { params: { id: any | string } }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [value, setValue] = useState()
  const [productData, setProductData] = useState<any>()
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [itemGet, setItemGet] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [length, setlength] = useState("")
  const [review, setreview] = useState<any>([])
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [subCatProduct, setSubCatProduct] = useState<any>([]);
  const [fill,setFill]=useState(false)
  const [wishlistId,setwishlistId]=useState("")
  const products = async () => {
    try {
      const res = await GetProductByIdAPI(params.id);
      if (res.status == 200 && res.message === "Product found successfully") {
        if (res.getProduct.productStockQuantity <= 10) {
          setQuantity(res.getProduct.productStockQuantity)
        }
        getData(res?.getProduct?.subCategoryId)
        getUserWishlist()
        setProductData(res.getProduct)
        setSelectedImage(res?.getProduct.productImg[0])

        const productData = {
          productId: res.getProduct._id,
          productImg: res?.getProduct.productImg[0],
          productName: res?.getProduct.productName,
        };

        const storedProducts = localStorage.getItem("products");
        let productArray: any[] = storedProducts ? JSON.parse(storedProducts) : [];

        const productIndex = productArray.findIndex((p: { productId: string; }) => p.productId === productData.productId);
        if (productIndex > -1) {
          productArray[productIndex] = productData;
        } else {
          productArray.push(productData);

          if (productArray.length > 10) {
            productArray.shift();
          }
        }

        localStorage.setItem("products", JSON.stringify(productArray))
      }
    } catch (error) {
      console.log("error products --", error);
    }
  }

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const ItemInCart = async () => {
    try {
      const resp = await getToCartAPI()
      if (resp.status == 200) {

        const datas = resp.data.cartItems.filter((data:{message:string})=>{
          if(data.message !== "Product not found"){
              return data
          }       
        })
  
        datas.map((e:{productDetails:{productId:string}})=>{
          if(e.productDetails.productId === params.id){
            setItemGet(true);
          }
        })       
      }
      
    } catch (error) {
      console.log("error ItemInCart --",error);
    }
  }
  const getUserWishlist=async()=>{
    const response=await getuserWishlistAPI()
    if(response?.status===200){
      console.log('setwishlistId==>',response.data)
      const find=response?.data.filter((el:{productId:{_id:string}})=>el?.productId?._id===params.id)      
      if(find?.length>0){
        setFill(true)
        console.log(find)
        setwishlistId(find[0]._id)
      }
    }
  }
  const handleAddToCart = async () => {
    try {
      const param = {
        "productId": productData._id,
        "productName": productData.productName
      }
      const resp = await addToCartAPI(param)
      if (resp.status == 201) {
        toast.success("Product Added to Cart")
        router.replace(dashboardLinks.cartsLink)
      } else if(resp.status===200){
        toast.success(resp.message)
      }
    } catch (error) {
      console.log("error handleAddToCart --",error);
    }
   
  }
 const AddtoWishlist=async(id:string)=>{
  const data={
    productId:id
  }
  const response=await AddtoWishlistAPI(data)
  if(response?.status===201){
    setFill(true)
    setwishlistId(response?.data?._id)
  }
  else{
    setFill(false)
    toast.error(response?.message)
  }
 }
  const handleGoToCart = async () => {
    router.replace(dashboardLinks.cartsLink)
  }
  const getAllreview = async () => {
    const response = await getAllReviwAPI(params.id)
    if (response?.status === 200) {
      setlength(response?.data?.length)
      setreview(response?.data)
    } else {
      // console.log("error")
    }
  }

  const DeleteWishListProduct=async(delId:string)=>{
    const response= await DeleteWishListAPI(delId)
    if(response?.status===200){
      setFill(false)
      getUserWishlist()
    }else{
      setFill(true)
      toast.error(response?.message)
    }
  }

  const getData = async (id: string) => {
    const resp = await getSubCateProductByIdAPI(id);
    setSubCatProduct(resp?.data?.Products.filter((el: {_id:string}) => el._id !== params.id))
  }
  useEffect(() => {
    ItemInCart()
    products()
    getAllreview()
    getUserWishlist()
  }, [])
  return (
    <>
    <div className=' bg-white py-4 mt-7 mb-7 mr-12 ml-12 '><section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image
                    className="h-full w-full max-w-full object-cover"
                    src={selectedImage}
                    alt="Product Image"
                    width={400}
                    height={300}
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                {productData?.productImg?.map((image: any, index: number) => (
                  <Image
                    key={index}
                    className={`cursor-pointer border ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    src={image}
                    alt={`Product Image ${index}`}
                    onClick={() => handleImageClick(image)}
                    width={100}
                    height={100}

                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <div className='flex justify-between items-center'>
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{productData?.productBrand[0].toUpperCase() + productData?.productBrand.slice(1)} -  {productData?.productName[0].toUpperCase() + productData?.productName?.slice(1)}</h1>
             <div >
              {
              fill===true ? <GoHeartFill onClick={()=>DeleteWishListProduct(wishlistId)}  className='w-10 cursor-pointer h-10'/> : 
              
             <GoHeart onClick={()=>AddtoWishlist(productData?._id)} className='w-10 cursor-pointer h-10'/>
            }
             </div>
             
            </div>
               
            {review && review?.length > 0 ? review.map((data: {rating:number}, index: number) => (
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
              {itemGet == false ?
              <button onClick={handleAddToCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to cart
              </button>
              : <button onClick={handleGoToCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Go to cart
            </button>}
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                </svg>
                Free shipping worldwide
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
            <div className='flex flex-col my-24 border border-gray-100 p-4'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl my-6 font-bold'>Reviews</h1>
              </div>
              {review && review?.length > 0 ? review.map((data: {userId:{profileImg:string,fullName:string},rating:number,comment:string}, index: number) => (
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
    <section className="px-2 bg-white py-4 mt-7 mb-7 mr-12 ml-12" >
        <div className="p-2">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-y-2 mb-3">
            <h2 className="font-manrope font-bold text-2xl text-gray-900">More like this</h2>
            <div className="flex justify-center items-center text-md gap-x-6">
              <button ref={prevButtonRef}
                className="swiper-button-prev  items-center justify-center p-1.5  group transition-all duration-300  hover:bg-gray-100 rounded-full hover:text-black">
                <svg className="stroke-black rounded-full transition-all duration-300 "
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8.38449 15.1023L3.33337 10.0512M3.33337 10.0512L8.38449 5.00006M3.33337 10.0512H18.3333"
                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button ref={nextButtonRef}
                className="swiper-button-next  hover:bg-gray-100 rounded-full hover:text-black flex items-center justify-center p-1.5  group transition-all duration-300 ">
                <svg className="stroke-black transition-all duration-300 "
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.6155 5.00006L16.6667 10.0512M16.6667 10.0512L11.6155 15.1023M16.6667 10.0512L1.66675 10.0512"
                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Swiper
          className="swiper mySwiper mb-10 py-8"
          modules={[Navigation]}
          navigation={{
            nextEl: nextButtonRef.current,
            prevEl: prevButtonRef.current,
          }}
          slidesPerView={5}
          centeredSlides={false}
          loop
          spaceBetween={10}

        >

          {subCatProduct && subCatProduct.length > 0 ? subCatProduct.map((subval: {productImg:string,productName:string,_id:string}, index: number) => (
            <SwiperSlide key={index} className="flex flex-col px-2 items-center">
              <div className="group relative ">
                <div className=" w-full overflow-hidden rounded-md bg-gray-100  group-hover:opacity-75 lg:h-80">
                  <Image
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    src={subval?.productImg[0]}
                    alt="Profile picture"
                    width={400}
                    height={300}
                  />                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-700">
                      <Link href={dashboardLinks.productsLink + '/' + subval?._id}>
                        <span aria-hidden="true" className="absolute inset-0 font-bold text-md"></span>
                        {subval?.productName[0].toUpperCase() + subval?.productName.slice(1)}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>

            </SwiperSlide>
          ))
            :
            ("")
          }
        </Swiper>
      </section>
    </>

  )
}

export default ProductById