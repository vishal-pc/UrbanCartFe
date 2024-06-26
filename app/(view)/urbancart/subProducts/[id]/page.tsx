"use client";
import { getSubCateProductByIdAPI } from "@/app/services/apis/user/categories";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urbancartLinks } from "@/app/configs/authLinks";

const SubProducts = ({ params }: { params: { id: string } }) => {
  const [subCatProduct, setSubCatProduct] = useState([]);
  const [name, setname] = useState("");

  const getData = async () => {
    const resp = await getSubCateProductByIdAPI(params.id);
    setSubCatProduct(resp.data.Products);
    setname(resp?.data?.categoryName);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white py-8 mt-8 mb-8 mr-12 ml-12">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl"
              href="#"
            >
              {name}
            </a>
          </div>
        </nav>

        {subCatProduct?.map(
          (
            data: {
              _id: string;
              productImg: string;
              productName: string;
              productPrice: number;
            },
            index: number
          ) => (
            <div
              key={index}
              className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
            >
              <Link  href={urbancartLinks.productsLink + "/" + data._id}>
                <Image
                  className="hover:grow hover:shadow-lg fixed-dimensions"
                  src={data?.productImg[0]}
                  alt="Product Image"
                  width={400}
                  height={400}
                  priority
                />
              </Link>
              <div className="pt-3 font-bold text-lg flex items-center justify-between custom-text-color">
                <p className="">
                  {data?.productName[0].toUpperCase() +
                    data?.productName.slice(1)}
                </p>
                <Link href={"/login"}>
                  <svg
                    className="h-6 w-6 fill-current custom-text-color"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                  </svg>
                </Link>
              </div>
              <p className="pt-1 custom-text-color">₹ {data?.productPrice}</p>
            </div>
          )
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
  );
};

export default SubProducts;
