"use client";
import { getSubCateProductByIdAPI } from "@/app/services/apis/user/categories";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { dashboardLinks } from "@/app/configs/authLinks";

const SubProducts = ({ params }: { params: { id: any | string } }) => {
  const [subCatProduct, setSubCatProduct] = useState([]);
  const [name, setname] = useState<string>("");

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

        {subCatProduct?.map((data: {_id:string,productImg:string,productName:string,productPrice:number}, index: number) => (
          <div
            key={index}
            className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
          >
            <Link href={dashboardLinks.productsLink + "/" + data._id}>
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
            </div>
            <p className="pt-1 custom-text-color">₹ {data?.productPrice}</p>
          </div>
        ))}

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
