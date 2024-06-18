import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { dashboardLinks } from '@/app/configs/authLinks';
import { getAllCategoryAPI ,getSubCategoryByIdAPI} from '@/app/services/apis/user/categories';

interface Category {
    _id: string;
    categoryName: string;
  }
  
  interface SubCategory {
    _id: string;
    subCategoryName: string;
  }
 export const SubMenu = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [hoveredSubId, setHoveredSubId] = useState<string | null >(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllCategoryAPI();
            if (response?.status === 200) {
                setCategories(response?.data);
            }
        };
        fetchData();
    }, []);

    const fetchSubCategoriesById = async (id:string) => {
        const response = await getSubCategoryByIdAPI(id);
        if (response?.status === 200) {
            setSubCategories(response?.data?.subCategories);
        }
    };

    const handleMouseEnter = async (id:string ) => {
        await fetchSubCategoriesById(id);
        setHoveredSubId(id);
    };

    const handleMouseLeave = () => {
        setHoveredSubId(null);
    };

    return (
        <div onMouseLeave={handleMouseLeave} className='bg-gray-100 hidden  mt-8  mb-8 mr-12 ml-12 relative text-md font-semibold md:flex  lg:flex justify-center items-center md:gap-6 lg:gap-16 my-4 p-3'>
            {categories.map((category:{_id:string,categoryName:string}, index:number) => (
                <div key={index}>
                    <button
                        onMouseEnter={() => handleMouseEnter(category?._id)}
                        className='relative text-black content-fit justify-center flex gap-x-6 hover:underline cursor-pointer'
                        type="button"
                    >
                        {category?.categoryName}
                    </button>
                    {hoveredSubId === category?._id && (
                        <div className="absolute bg-gray-100  z-[100] top-[100%] p-2 divide-y divide-gray-200 rounded-lg shadow w-44">
                            {subCategories.map((subCategory:{_id:string,subCategoryName:string}, index:number) => (
                                <p key={index} className="px-4  py-2 cursor-pointer hover:bg-gray-300 hover:rounded-md">
                                   <Link href={dashboardLinks.subProductsLink+subCategory._id}>
                                    {subCategory?.subCategoryName}
                                   </Link>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <Link href={dashboardLinks.wishlistLink}>
            
        <div className="flex justify-center items-center gap-x-2">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            
          </svg>
          <p className="relative text-black content-fit justify-center flex gap-x-6 hover:underline cursor-pointer">
            Favourites
          </p>
        </div>
            </Link>
        </div>
    );
};


