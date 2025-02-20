'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({images,title,className}: Props) => {
    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '700px',
                    '--swiper-navigation-color': '#e11d48',
                    '--swiper-pagination-color': '#e11d48',
                } as React.CSSProperties}
                    pagination
                    navigation={true}
                    autoplay={{delay:3000}}
                    modules={[FreeMode, Autoplay, Pagination]}
                    className="mySwiper2">

                {
                    images.map((image) => (
                        <SwiperSlide key={image}>
                        <Image
                            width={600}
                            height={500}
                            src={`/geek-products/${image}`}
                            alt={title}
                            className="object-fill"
                        />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
      );
}
