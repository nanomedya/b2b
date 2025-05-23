"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Image, Skeleton } from "@nextui-org/react";
import { SliderProps } from "@/types";

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


interface Slider {
  images: SliderProps[];
}

const Slider: React.FC<Slider> = ({
  images = [],
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);


  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  
  if (images.length === 0) {
    return <>Yükleniyor</>;
  }

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.map((item, idx) => (
            <div
              className="keen-slider__slide"
              key={idx}
            >
              <Image
                height={500}
                className="object-cover w-full rounded-md"
                radius="none"
                alt={`${item.image}`}
                src={item.image}
              />

            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
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
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>


    </>
  );
};

const SliderSkeleton = () => {
  return (
      <Skeleton className="flex rounded-md w-full h-[500px] " />
  )
}

export default Slider;
export { SliderSkeleton }