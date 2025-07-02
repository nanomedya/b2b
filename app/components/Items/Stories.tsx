"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";


import {Image} from "@heroui/image";
import {Skeleton} from "@heroui/skeleton";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import Link from "next/link"; 
import { StoriesProps } from "@/types";

// Arrow bileşeni için türler
interface ArrowProps {
    left?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const Arrow: React.FC<ArrowProps> = ({ left, onClick, disabled = false }) => {
    const arrowClass = `arrow ${left ? "arrow--left" : "arrow--right"} ${disabled ? " arrow--disabled" : ""
        }`;
    return (
        <svg
            onClick={onClick}
            className={arrowClass}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {left ? (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            ) : (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
};

// Slider bileşeni için türler


interface SliderProps {
    images: StoriesProps[];
}

const Stories: React.FC<SliderProps> = ({
    images = [],
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

   

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: false,
        mode: 'snap',
        slides: {
            origin: 'center',
            perView: 6,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        breakpoints: {
            '(min-width: 992px)': {
                loop: false,
                slides: {
                    perView: 6,
                },
            },
            '(max-width: 992px)': {
                loop: false,
                slides: {
                    perView: 4,
                },
            },
            '(max-width: 500px)': {
                loop: false,
                slides: {
                    perView: 2,
                },
            },
        },
    });
    
    if (images.length === 0) {
        return <>Yükleniyor</>;
    }
    
    return (
        <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
                {images.length && images.map((item, idx) => (
                    <div
                        className="keen-slider__slide"
                        key={idx}
                    >
                        <Link href={item.url} className='flex justify-center items-center flex-col w-[200px] h-[150px]'>
                            <Image
                                width={100}
                                height={100}
                                className="object-cover mx-auto"
                                alt={`Slide ${idx}`}
                                src={`/${item.image}`}
                            />
                            <div className="font-semibold text-center">{item.title}</div>
                        </Link>
                    </div>
                ))}
            </div>

            {loaded && images.length > 0 && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={() => instanceRef.current?.prev()}
                        disabled={currentSlide === 0}
                    />
                    <Arrow
                        onClick={() => instanceRef.current?.next()}
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details?.slides?.length - 1
                        }
                    />
                </>
            )}
        </div>
    );
};


const StoriesSkeleton = () => {
    return (
        <div className="flex gap-6 w-full justify-between items-center px-10">
            <div className="flex flex-wrap flex-col gap-2 justify-center items-center">
                <Skeleton className="flex rounded-full w-24 h-24" />
                <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
            <div className="flex flex-wrap flex-col gap-2 justify-center items-center">
                <Skeleton className="flex rounded-full w-24 h-24" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
            </div>
            <div className="flex flex-wrap flex-col gap-2 justify-center items-center">
                <Skeleton className="flex rounded-full w-24 h-24" />
                <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
            <div className="flex flex-wrap flex-col gap-2 justify-center items-center">
                <Skeleton className="flex rounded-full w-24 h-24" />
                <Skeleton className="h-3 w-3/5 rounded-lg" />
            </div>
            <div className="flex flex-wrap flex-col gap-2 justify-center items-center">
                <Skeleton className="flex rounded-full w-24 h-24" />
                <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
        </div>

    )
}

export default Stories;
export { StoriesSkeleton }