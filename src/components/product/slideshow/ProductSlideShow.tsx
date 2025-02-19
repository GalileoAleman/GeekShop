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
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
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
                        '--swiper-navigation-color': '#000',
                        '--swiper-pagination-color': '#000',
                    } as React.CSSProperties
                }
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2">

                {
                    images.map((image) => (
                        <SwiperSlide key={image}>
                        <Image
                            width={1024}
                            height={800}
                            src={`/geek-products/${image}`}
                            alt={title}
                        />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
      );
}
