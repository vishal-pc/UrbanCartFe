
import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { getSubCateProductByIdAPI } from '@/app/services/apis/user/categories'
import 'swiper/css';
import Link from "next/link";
import { dashboardLinks, urbancartLinks } from "@/app/configs/authLinks";
import "@/app/style/style.css"


const Subcategory = ({ key, data }: any) => {
    const [subdata, setSubData] = useState<any>([]);
    const prevButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null); 

    let subCatId = data?._id;

    const fetchsubbyid = async () => {
        const response = await getSubCateProductByIdAPI(subCatId);
        if (response?.status === 200) {
            console.log(response?.data?.Products)
            setSubData(response?.data?.Products);
        }
    };
  
    useEffect(() => {
        fetchsubbyid();
    }, [subCatId]);

    return (
        <section className="py-2 relative" key={key}>
            <div className="p-2">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-y-2 mb-3">
                <h2 className="font-manrope font-bold text-2xl text-gray-900">{data?.subCategoryName}</h2>
                    <div className="flex justify-center items-center gap-x-8">
                        <button ref={prevButtonRef}
                            className="swiper-button-prev  items-center justify-center p-1.5  group transition-all duration-300  hover:bg-gray-100 rounded-full hover:text-black">
                            <svg className="stroke-black rounded-full transition-all duration-300 "
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M8.38449 15.1023L3.33337 10.0512M3.33337 10.0512L8.38449 5.00006M3.33337 10.0512H18.3333"
                                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button ref={nextButtonRef}
                            className="swiper-button-next  hover:bg-gray-100 rounded-full hover:text-black flex items-center justify-center p-1.5  group transition-all duration-300 ">
                            <svg className="stroke-black transition-all duration-300 "
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M11.6155 5.00006L16.6667 10.0512M16.6667 10.0512L11.6155 15.1023M16.6667 10.0512L1.66675 10.0512"
                                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Swiper
                className="swiper mySwiper mb-10 py-8"
                modules={[Navigation]}
                navigation={{
                    nextEl: nextButtonRef.current,
                    prevEl: prevButtonRef.current,
                }}
                slidesPerView={7}
                centeredSlides={false}
                loop
                spaceBetween={10}

            >




                {subdata && subdata.length > 0 ? subdata.map((subval: any, index: number) => (
                    <SwiperSlide key={index} className="flex flex-col px-2 items-center">
      <div className="group relative ">
        <div className=" w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:h-80">
          <img src={subval?.productImg[0]} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-700">
            <Link href={urbancartLinks.productsLink + '/' + subval?._id}>
                <span aria-hidden="true" className="absolute inset-0 font-bold text-md"></span>
                {subval?.productName[0].toUpperCase()+subval?.productName.slice(1)}
              </Link>
            </h3>
          </div>
        </div>
      </div>
      
      
{/*                         
                        <Link href={urbancartLinks.productsLink + '/' + subval?._id}>
                            <div className="w-[12rem] h-[14rem] mb-2">
                                <img src={subval?.productImg[0]} alt=""
                                    className="w-full  h-full object-cover" />
                            </div>
                        </Link>
                        <span className="text-sm text-gray-900 text-center px-2">{subval?.productName[0].toUpperCase()+subval?.productName.slice(1)}</span> */}
                    </SwiperSlide>
                ))
                    :
                    ("")
                }
            </Swiper>
        </section>
    );
};

export default Subcategory;
