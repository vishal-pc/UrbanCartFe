"use client";
import React, { useEffect, useState } from "react";
import { getPaymentsById } from "@/app/services/apis/payment";
import FileDownloader from "../components/pdf";
import Link from "next/link";
import Image from "next/image";

const OrderByIdView = ({ params }: { params: { id: any | string } }) => {
  const [orderVal, setOrderVal] = useState<[] | any>("");
  const [dateTime, setDateTime] = useState("");

  const handlePaymentsId = async () => {
    const resp = await getPaymentsById(params.id);
    if (resp.status == 200) {
      setOrderVal(resp.payment);
      const date = new Date(resp.payment.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateTime(formattedDate);
    }
  };

  useEffect(() => {
    handlePaymentsId();
  }, []);

  return (
    <>
      {orderVal && orderVal !== "" ? (
        <section
          id="Projects"
          className="w-[93.5%] bg-white py-6 mx-auto mt-8 mb-8 mr-12 ml-12 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 "
        >
          {orderVal?.totalProduct.length > 0
            ? orderVal?.totalProduct.map(
              (
                data: {
                  productId: string;
                  productImageUrl: string;
                  productName: string;
                  productQuantity: number;
                  productPrice: number;
                },
                i: number
              ) => (
                <div
                  key={i}
                  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <Link href={`/dashboard/products/${data?.productId}`}>
                    <Image
                      className="h-80 w-72 object-cover rounded-t-xl"
                      src={data?.productImageUrl}
                      alt="Product Image"
                      width={400}
                      height={300}
                    />
                  </Link>
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      Brand
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {" "}
                      {data?.productName}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        {" "}
                        ₹{data?.productPrice}
                      </p>
                      <div className="ml-auto">
                        Qty {data?.productQuantity}
                      </div>
                    </div>
                    <Link href={`/dashboard/review/${data?.productId}`}>
                      <button className="text-md font-semibold bg-gray-200 ml-[4rem] rounded-md px-3 py-2 text-black">
                        Add Review
                      </button>
                    </Link>
                  </div>
                </div>
              )
            )
            : ""}

          <div className="card my-auto  mr-3" style={{ maxWidth: "540px" }}>
            <div className="card-body">
              {orderVal?.addressDetails.length > 0
                ? orderVal?.addressDetails.map(
                  (
                    address: {
                      areaPincode: number;
                      streetAddress: string;
                      nearByAddress: string;
                      stateName: string;
                      country: string;
                      cityName: string;
                    },
                    index: number
                  ) => (
                    <div key={index} className="flex flex-col" >
                      <p className="font-bold text-lg text-black my-2">
                        Shipping Address
                      </p>
                      <p>{address?.areaPincode} ,</p>
                      <p>
                        {address?.streetAddress} , {address?.nearByAddress},
                      </p>
                      <p>
                        {address?.cityName} , {address?.stateName},
                      </p>
                      <p>{address?.country}.</p>
                    </div>
                  )
                )
                : "Loading..."}

              {/* <h3 className="card-text"> Invoice Download</h3> */}
              <FileDownloader data={params} />
            </div>
          </div>
        </section>
      ) : (
        "Please wait.."
      )}
    </>
  );
};

export default OrderByIdView;
