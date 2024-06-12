'use client'
import React, { useState } from 'react';
import '@/app/style/globelColor.css';
import { Dropdown } from './dropdown';
import Link from 'next/link';

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <nav id="header" className="w-full z-30 top-0  py-1 bg-white">
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
                                    <a className="inline-block font-semibold  no-underline custom-text-color hover:underline py-2 px-4" href="#">
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block font-semibold no-underline custom-text-color hover:underline py-2 px-4" href="#">
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="order-1 md:order-2">
                        <Link
                            className="flex items-center tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl"
                            href={"/urbancart"}
                        >
                            <svg
                                className="fill-current custom-text-color mr-2"
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
                    <div className="order-2 md:order-3 flex items-center md:gap-x-4 justify-center" id="nav-content">
                    <div className="relative hidden  sm:inline-block">
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 text-gray-900 w-full" // Set width to 50%
                                placeholder="Search..."
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-current text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                                />
                            </svg>
                        </div>
                       <div className="relative inline-block">
                            <button className="no-underline custom-text-color"  onClick={toggleDropdown}>
                                <svg
                                    className="fill-current custom-text-color"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <circle fill="none" cx="12" cy="7" r="3" />
                                    <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                                </svg>
                            </button>
                            <Dropdown isOpen={dropdownOpen} />
                       
                        </div>
                        <Link className="pl-3 inline-block mb-1 no-underline custom-text-color" href={'/urbancart/cart'}>
                            <svg
                                className="fill-current custom-text-color"
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
                    </div>

                </div>
            </nav>
        </>
    );
};
