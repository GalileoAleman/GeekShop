'use client'

import { Swiper as SwipeObj} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { useState } from 'react';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({images,title,className}: Props) => {

    console.log("images: " + images)

    const [thumbsSwiper, setThumbsSwiper] = useState<SwipeObj>();

    return (
        <div className={className}>
            <Swiper
                style={
                    {
                        '--swiper-navigation-color': '#e11d48',
                        '--swiper-pagination-color': '#e11d48',
                    } as React.CSSProperties
                }
                    spaceBetween={10}
                    navigation={true}
                    autoplay={{delay:3000}}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="mySwiper2">

                {
                    images.map((image) => (
                        <SwiperSlide key={image}>
                        <Image
                            width={1024}
                            height={800}
                            src={`/geek-products/${image}`}
                            alt={title}
                            className="rounded-lg object-fill"
                        />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper">

                {           
                    images.map((image) => (
                        <SwiperSlide key={image}>
                        <Image
                            width={300}
                            height={300}
                            src={`/geek-products/${image}`}
                            alt={title}
                            className="rounded-lg object-fill"
                        />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
      );
}
