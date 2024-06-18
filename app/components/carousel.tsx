import "@/app/style/globelColor.css"

export const Carousel = () => {
    return (
        <>
            <section className=' mt-8 mb-8 mr-12 ml-12'>
                <div className="carousel-inner relative overflow-hidden w-full">


                    <input
                        className="carousel-open"
                        type="radio"
                        id="carousel-1"
                        name="carousel"
                        aria-hidden="true"
                        hidden
                        defaultChecked={true}
                    />
                    <div className="carousel-item absolute opacity-0" style={{ height: "50vh" }}>
                        <div
                            className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
                            style={{
                                backgroundImage: "url('https://marketplace.canva.com/EAFoiDA8RBw/1/0/1600w/canva-light-gray-modern-fashion-sale-photo-collage-banner-6NgZsd4f7_k.jpg')"
                            }}
                        >
                            <div className="container mx-auto">
                                <div
                                    className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
                                >
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <label
                        htmlFor="carousel-3"
                        className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                    >‹</label
                    >


                    <label
                        htmlFor="carousel-2"
                        className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                    >›</label
                    >

                    <input
                        className="carousel-open"
                        type="radio"
                        id="carousel-2"
                        name="carousel"
                        aria-hidden="true"
                        hidden
                    />
                    <div className="carousel-item absolute opacity-0 bg-cover bg-right" style={{ height: "50vh" }}>
                        <div
                            className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
                            style={{
                                backgroundImage: "url('https://marketplace.canva.com/EAFJr2Z9X3Q/1/0/1600w/canva-brown-minimalist-fashion-sale-banner-9d1uXL_N3pA.jpg')",
                          }}
                        >
                            <div className="container mx-auto">
                                <div
                                    className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
                                >
                                    
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <label
                        htmlFor="carousel-1"
                        className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                    >‹</label
                    >
                    <label
                        htmlFor="carousel-3"
                        className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                    >›</label
                    >





                    <input
                        className="carousel-open"
                        type="radio"
                        id="carousel-3"
                        name="carousel"
                        aria-hidden="true"
                        hidden
                    />
                    <div className="carousel-item absolute opacity-0" style={{ height: "50vh" }}>
                        <div
                            className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom"
                            style={{
                                backgroundImage: "url('https://marketplace.canva.com/EAF0XmkzgQA/1/0/1600w/canva-gray-minimalist-new-collection-banner-O7EU5YM_MGU.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "top"
                            }}
                        >
                            <div className="container mx-auto">
                                <div
                                    className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
                                >
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <label
                        htmlFor="carousel-2"
                        className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                    >‹</label
                    >
                    <label
                        htmlFor="carousel-1"
                        className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                    >›</label
                    >

                </div>

            </section>


        </>
    );
};


