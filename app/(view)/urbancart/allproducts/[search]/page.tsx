'use client'
import { GetAllProductAPI } from '@/app/services/apis/admin/products';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Product {
    productName: string;
    productBrand: string;
    productDescription: string;
    productFeature: string;
    productImg:string
}

const BySearch = () => {
    const { search }: any = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State to hold filtered products

    const getAllProducts = async () => {
        try {
            const response = await GetAllProductAPI();
            if (response?.status === 200) {
                setProducts(response?.data?.products);
                console.log(response?.data?.products)
                
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);


     
    useEffect(() => {
        if (search && products.length > 0) {
            
            const filteredProducts = products.filter((product) => {
                const { productName, productBrand, productDescription, productFeature } = product;
                const searchTerm = search.toLowerCase();
                return (
                    productName.toLowerCase().includes(searchTerm) ||
                    productBrand.toLowerCase().includes(searchTerm) ||
                    productDescription.toLowerCase().includes(searchTerm) ||
                    productFeature.toLowerCase().includes(searchTerm)
                );
            });
            setFilteredProducts(filteredProducts)
            console.log(filteredProducts)
        } else {
            setFilteredProducts([]); 
        }
    }, [search, products]); 

    return (
        <div className='mt-8 mb-8 mr-12 ml-12 bg-white'>  
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
    <section
        className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
        {filteredProducts.map((product, index) => (
        <section key={index} className="p-5 py-10   text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
            <Image src={product?.productImg[0]} width={400} height={300} alt=""/>
            <div className="space-x-1 flex justify-center mt-10">
                <svg className="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14">
                    <path
                        d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                    </path>
                </svg>
                <svg className="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14">
                    <path
                        d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                    </path>
                </svg>
                <svg className="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14">
                    <path
                        d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                    </path>
                </svg>
                <svg className="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14">
                    <path
                        d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                    </path>
                </svg>
                <svg className="w-4 h-4 mx-px fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14">
                    <path
                        d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                    </path>
                </svg>
            </div>
            <h1 className="text-3xl my-5">Soft Plushy Cushion Chair</h1>
            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt!</p>
            <h2 className="font-semibold mb-5">$29.99</h2>
            <button className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600">Add To Cart</button>
        </section>
          ))}
    </section>
</section>
        </div>
    );
};

export default BySearch;
