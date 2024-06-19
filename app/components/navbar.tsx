'use client'
import React, { useEffect, useState } from 'react';
import '@/app/style/globelColor.css';
import Link from 'next/link';
import HoverDropdown from './dropdown copy';
import { CiSearch } from "react-icons/ci";
import { GetAllProductAPI } from '../services/apis/admin/products';

interface Product {
    productName: string;
    productBrand: string;
    productDescription: string;
    productFeature: string;
}
export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search,setsearch]=useState("")
    const [products,setProducts]=useState<Product[]>([])

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const getAllProducts=async()=>{
        const response=await GetAllProductAPI()
        if(response?.status===200){
            setProducts(response?.data?.products)
            console.log(response?.data?.products)
        }
    }
    const handleSearch=(e?:any)=>{
        e.preventDefault()
        if(search){
            console.log(search)
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
            console.log(filteredProducts)
            
        }else{
            console.log("empty")
        }
        
    }
    useEffect(()=>{
      getAllProducts()
    },[])

    return (
        <>
            <nav id="header" className="w-full z-30 top-0 sticky   py-1 bg-white">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3 relative">
                    <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
                        <svg
                            className="fill-current custom-text-color"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </label>
                    <input className="hidden" type="checkbox" id="menu-toggle" />

                    <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                        <nav>
                            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                                <li>
                                    <Link className="inline-block font-semibold custom-link custom-text-color px-6" href={'/login'}>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-block font-semibold custom-link custom-text-color px-6" href={'/urbancart/about'}>
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="order-1 md:order-2 custom-link ">
                        <Link
                            className="flex items-center tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl "
                            href="/urbancart"
                        >
                            <svg
                                className="fill-current custom-text-color mr-2 "
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
                            </svg>
                            UrbanCart
                        </Link>
                    </div>
                    

                    <div className="order-2 md:order-3 gap-4 flex items-center" id="nav-content">
                    <div className="relative hidden rounded-lg bg-white border px-2 border-gray-300 sm:inline-block">
                        <form >
                            <div className='flex items-center'>
                            <input
                                type="text"
                                className="  py-2 outline-none  text-gray-900 w-full" // Set width to 50%
                                placeholder="Search..."
                                value={search}
                                onChange={(e)=>setsearch(e.target.value)}
                            />
                            <CiSearch type='submit' onClick={handleSearch} className='w-6 cursor-pointer h-6'/>
                            </div>
                        </form>
                        </div>
                        <Link href={'/urbancart/cart'} className="pl-3 flex items-center justify-center custom-link" >
                            <svg
                                className="fill-current custom-text-color "
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                                <circle cx="10.5" cy="18.5" r="1.5" />
                                <circle cx="17.5" cy="18.5" r="1.5" />
                            </svg>
                        </Link>
                        <HoverDropdown />
                    </div>

                </div>
            </nav>
        </>
    );
};