"use client"
import { dashboardLinks } from '@/app/configs/authLinks';
import { DeleteWishListAPI, getuserWishlistAPI } from '@/app/services/apis/user'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image';

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getUserWishlist = async () => {
    try {
      const response = await getuserWishlistAPI();
      if (response?.status === 200) {
        console.log(response?.data)
        setWishlistData(response?.data);
        setLoading(false);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Error fetching wishlist");
    }
  };
const RemoveWishlist=async(id:any)=>{
  const response= await DeleteWishListAPI(id)
  if(response?.status===200){
 toast.success("Product Removed from Wishlist !")
    getUserWishlist() 
  }else{
    toast.error(response?.message)
  }
}
  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <>
      <div className='bg-white py-8 mt-8 mb-8 mr-12 ml-12'>
    
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                        <a
                            className="uppercase tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl"
                            href="#"
                        >
                         Wishlist
                        </a>
                    
                    </div>
                </nav>
            {loading ? (
              <p>Loading...</p>
            ) : (
                wishlistData.map((wishlistItem: any, index: number) => (
                <div key={index} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                    <Link href={dashboardLinks.productsLink+"/"+wishlistItem?.productId?._id}>
                        <Image
                            className="hover:grow hover:shadow-lg fixed-dimensions"
                            src={wishlistItem?.productId?.productImg[0]}
                            alt="Product Image"
                            width={400}
                            height={400}
                            priority
                        />
                    </Link>
                        <div className="pt-3 font-bold text-lg flex items-center justify-between custom-text-color">
                            <p className="">{wishlistItem?.productId?.productName[0].toUpperCase()+wishlistItem?.productId?.productName.slice(1)}</p>
                            <button onClick={()=>RemoveWishlist(wishlistItem?._id)} className='flex justify-center items-center text-white bg-gray-600 px-2 py-1 rounded-md'>Remove</button>
                        </div>
                        <p className="pt-1 custom-text-color">₹ {wishlistItem?.productId?.productPrice}</p>     
                </div>
              )))}
            
             
                <style>
                    {`
                    .fixed-dimensions {
                        width: 400px;
                        height: 300px;
                        object-fit: cover;
                        }
                    `}
                </style>
            </div>
        </div>
   <ToastContainer/>
    </>
  );
};

export default Wishlist;
