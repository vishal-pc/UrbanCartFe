'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import MultiCardCarousel from './slider';

import Subcategory from './slider';
import { Getallsubcategory } from '@/app/services/apis/admin/products';



const photos = [
    'https://images.pexels.com/photos/7469387/pexels-photo-7469387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/7469289/pexels-photo-7469289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6213729/pexels-photo-6213729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6213739/pexels-photo-6213739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export const RecentViewCard = () => {
   
    const [sub, setsub] = useState<any>([])

    const getallSubcategories = async () => {
      const response = await Getallsubcategory();
      if (response?.status === 200) {
        setsub(response?.data)
      }
    };
  
    useEffect(() => {
      getallSubcategories();
    }, []);
  
    
    return (
        <>
        <section className="bg-zinc-300 py-8 mt-8 mb-8 mr-12 ml-12">
            <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
                <h1 className="uppercase tracking-wide no-underline hover:no-underline font-bold custom-text-color text-xl text-center">
                    Recent Views
                </h1>
                <Swiper
                    modules={[EffectCoverflow, Pagination]}
                    effect={'coverflow'}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={3}
                    pagination={{
                        clickable: true,
                    }}
                    centeredSlides={true}
                    grabCursor={true}
                    coverflowEffect={{
                        rotate: 0,
                        slideShadows: false,
                    }}
                    className="coverflow"
                >
                    {photos.map((p, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                className="hover:grow hover:shadow-lg fixed-dimensions"
                                src="/DIMG/camera.avif"
                                alt="Product Image"
                                width={400}
                                height={400}
                                priority
                            />
                            <p className="">Product Name</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
        {sub.map((data: any, index: any) => (
            <section key={index} className="shadow-lg  py-4 mt-7 mb-7 mr-12 ml-12">
              <Subcategory key={index} data={data}/>
              </section>
          ))}
      
        </>
    );
}