"use client";
import { dashboardLinks } from "@/app/configs/authLinks";
import {
  DeleteWishListAPI,
  getuserWishlistAPI,
} from "@/app/services/apis/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { DelIcon } from "@/public/svg/del";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [no, setno] = useState(false);

  const getUserWishlist = async () => {
    try {
      const response = await getuserWishlistAPI();
      if (response?.status === 200) {
        setWishlistData(response?.data);
        setLoading(false);
        setno(false);
      } else {
        setno(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error fetching wishlist");
    }
  };
  const RemoveWishlist = async (id: string) => {
    const response = await DeleteWishListAPI(id);
    if (response?.status === 200) {
      const updatedWishlist = wishlistData.filter(
        (item: {_id:string}) => item._id !== id
      );
      setWishlistData(updatedWishlist);
      getUserWishlist();
      toast.success("Product Removed from Wishlist !");
    } else {
      toast.error(response?.message);
    }
  };
  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <>
      <div className="bg-white py-8 mt-8 mb-8 mr-12 ml-12">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full  top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl"
                href="#"
              >
                Favourites
              </a>
            </div>
          </nav>
          {no && (
            <div className="ml-7">
              <p>Your wishlist is currently empty.</p>
              <p>Add items to your wishlist by browsing our collection.</p>
              <Link href={dashboardLinks.userHomeLink}>
                <button className="bg-gray-300 rounded-md px-3 py-2 my-2">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
          {loading && no === true ? (
            <p className="ml-7">Loading...</p>
          ) : (
            wishlistData.map((wishlistItem: {productId:{_id:string,productImg:string,productName:string,productPrice:number},_id:string}, index: number) => (
              <div
                key={index}
                className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
              >
                <Link
                  href={
                    dashboardLinks.productsLink +
                    "/" +
                    wishlistItem?.productId?._id
                  }
                >
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
                  <p className="">
                    {wishlistItem?.productId?.productName[0].toUpperCase() +
                      wishlistItem?.productId?.productName.slice(1)}
                  </p>
                  <button
                    onClick={() => RemoveWishlist(wishlistItem?._id)}
                    className="flex justify-center items-center "
                  >
                    <DelIcon />
                  </button>
                </div>
                <p className="pt-1 custom-text-color">
                  ₹ {wishlistItem?.productId?.productPrice}
                </p>
              </div>
            ))
          )}

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
      <ToastContainer />
    </>
  );
};

export default Wishlist;
