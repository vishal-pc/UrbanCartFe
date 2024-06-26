"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  const router = useRouter();

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(window?.location?.search ?? "");
  const searchQuery = searchParams?.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // console.log(searchQuery);
    fetchProducts(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const fetchProducts = async (searchQuery: any, page: number) => {
    try {
      const response = await fetch(
        `http://112.196.76.179:5000/api/v1/admin/get-all-products?searchQuery=${searchQuery}&page=${page}`
      );
      const data = await response.json();
      setProducts(data.data.products);
      setTotalPages(data?.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  const handlePreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className=" bg-white mt-8 mb-8 mr-12 ml-12  px-4 py-8">
      <h1 className="text-2xl text-black font-bold mb-4">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products?.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg"
              >
                <Link href={`/dashboard/products/${product._id}`}>
                  <Image
                    width={400}
                    height={300}
                    src={product.productImg[0]}
                    alt={product.productName}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold">
                    {product.productName}
                  </h2>
                  <p className="text-gray-700">${product.productPrice}</p>
                  <p className="text-gray-600">
                    {product.productShortDescription}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-2 mt-4 items-center gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 ${
                  currentPage === index + 1 ? "bg-gray-900/10" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {index + 1}
                </span>
              </button>
            ))}

            <button
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...........</p>
      )}
    </div>
  );
};

export default Search;
