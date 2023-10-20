import React from "react";
import banner1 from "../assets/RFC.png";
import banner2 from "../assets/TODO LO QUE NECESITAS.png";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";


const Carousel = () => {
  let [current, setCurrent] = useState(0);

  const slides = [banner1, banner2]

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div  className="flex justify-center bg-black">
    <div
      className="overflow-hidden container relative w-full"
      style={{ height: "800px" }}
    >
      <div
        className={`flex transition ease-out duration-40 h-full`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides?.map((s) => {
          return <img src={s}/>;
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides?.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>

    {/* <div className="flex justify-center bg-black">
    <div style={{height:"900px", width:"1800px"}} className="carousel">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={banner1} className="w-full h-full" />
      </div>
    </div>
  </div> */}
  </div>
  );
};

export default Carousel;
