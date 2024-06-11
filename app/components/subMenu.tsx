import React, { useEffect, useState } from 'react';
import { getAllCategoryAPI, getSubCategoryByIdAPI } from '../services/apis/user/categories';

 export const SubMenu = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [hoveredSubId, setHoveredSubId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllCategoryAPI();
            if (response?.status === 200) {
                setCategories(response?.data);
            }
        };
        fetchData();
    }, []);

    const fetchSubCategoriesById = async (id:any) => {
        const response = await getSubCategoryByIdAPI(id);
        if (response?.status === 200) {
            setSubCategories(response?.data?.subCategories);
        }
    };

    const handleMouseEnter = async (id:any) => {
        await fetchSubCategoriesById(id);
        setHoveredSubId(id);
    };

    const handleMouseLeave = () => {
        setHoveredSubId(null);
    };

    return (
        <div onMouseLeave={handleMouseLeave} className='bg-gray-100 hidden  mt-8  mb-8 mr-12 ml-12 relative text-md font-semibold md:flex  lg:flex justify-center items-center md:gap-6 lg:gap-16 my-4 p-3'>
            {categories.map((category:any, index:any) => (
                <div key={index}>
                    <button
                        onMouseEnter={() => handleMouseEnter(category?._id)}
                        className='relative content-fit justify-center flex gap-x-6 hover:underline cursor-pointer'
                        type="button"
                    >
                        {category?.categoryName}
                    </button>
                    {hoveredSubId === category?._id && (
                        <div className="absolute bg-gray-100  z-[100] top-[100%] p-2 divide-y divide-gray-200 rounded-lg shadow w-44">
                            {subCategories.map((subCategory:any, index:any) => (
                                <p key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-300 hover:rounded-md">
                                    {subCategory?.subCategoryName}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


