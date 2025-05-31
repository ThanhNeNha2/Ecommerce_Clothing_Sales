import React, { useRef, useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const SliceProduct = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    {
      src: "https://i.pinimg.com/736x/70/c3/a1/70c3a153726cbfc616b0690c4ab8d8bf.jpg",
      title: "Christian Dior Resort 2022 Collection",
      subtitle: "DIOR",
    },
    {
      src: "https://i.pinimg.com/736x/be/df/b3/bedfb3ff34506abaa62570b6362ae20d.jpg",
      title: "Chanel Fall 2025 Ready-to-Wear Collection",
      subtitle: "Chanel",
    },
    {
      src: "https://i.pinimg.com/736x/b9/79/e6/b979e67a6131bf6661591c8e7a4f59d7.jpg",
      title: "Louis Vuitton Women‘s Spring-Summer 2025 ",
      subtitle: "Louis Vuitton (LV)",
    },
    {
      src: "https://i.pinimg.com/736x/86/0c/f2/860cf20552ec51776f0c7fb247e0decc.jpg",
      title: "Gucci RTW Spring 2024",
      subtitle: "Gucci",
    },

    {
      src: "https://i.pinimg.com/736x/22/2e/8c/222e8cbd2cc968c6423ba37ac0327e3a.jpg",
      title: "Balenciaga Fall 2025",
      subtitle: "Balenciaga",
    },

    {
      src: "https://i.pinimg.com/736x/99/dc/86/99dc86b16d0791a94902f4e0bb7c8ddb.jpg",
      title: "Versace Fall 2025 ",
      subtitle: "Versace",
    },
    {
      src: "https://i.pinimg.com/736x/14/d5/02/14d502e66dcd52ccd0d371f35f9d8fce.jpg",
      title: "Hermès, P/E 2020 ",
      subtitle: "Hermès",
    },
  ];

  const totalSlides = images.length;
  const slideWidth = 380;

  const scrollToSlide = (slideIndex) => {
    if (sliderRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const scrollPosition = slideIndex * slideWidth;
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentSlide(slideIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const changeMainImage = (direction) => {
    setIsTransitioning(true);

    let nextSlideIndex;

    if (direction === "next") {
      nextSlideIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    } else {
      nextSlideIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    }

    // Update main image to match the next slide position
    setMainImage(nextSlideIndex);

    // Scroll to the next slide
    scrollToSlide(nextSlideIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const scrollLeft = () => {
    changeMainImage("prev");
  };

  const scrollRight = () => {
    changeMainImage("next");
  };

  const goToSlide = (slideIndex) => {
    setMainImage(slideIndex);
    scrollToSlide(Math.min(slideIndex, totalSlides - 1));
  };

  const handleImageClick = (imageIndex) => {
    if (!isTransitioning) {
      setMainImage(imageIndex);
    }
  };

  return (
    <div
      className="pl-16 bg-red-500 flex h-[600px] mt-16 transition-all duration-300"
      style={{ background: "#FCF8F3" }}
    >
      <div className="w-[calc(100%/3)] flex flex-col pr-8 gap-3 items-center justify-center">
        <div className="space-y-4">
          <span className="font-bold text-[32px] leading-[120%] text-gray-800 block">
            Những thiết kế biểu tượng từ các thương hiệu nổi tiếng toàn cầu
          </span>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi tuyển chọn những sản phẩm ấn tượng từ các nhãn hàng thời
            trang hàng đầu thế giới nhằm mang đến cho bạn nguồn cảm hứng sáng
            tạo và phong cách riêng biệt.
          </p>
        </div>
        <div className="w-full"></div>
      </div>

      <div className="w-[calc(100%/3)] p-7">
        <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl group">
          <img
            src={images[mainImage].src}
            alt={images[mainImage].title}
            className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            key={mainImage} // Force re-render for smooth transition
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-5 left-5 w-[100%] h-[120px] flex items-end">
            <div className="bg-white/90 backdrop-blur-sm w-[55%] h-full p-7 flex flex-col justify-center gap-3 rounded-lg shadow-lg transition-all duration-300">
              <span className="text-orange-600 font-medium text-sm tracking-wider">
                {images[mainImage].subtitle}
              </span>
              <p className="font-semibold text-base text-gray-800">
                {images[mainImage].title}
              </p>
            </div>
            <div className="ml-4">
              <button className="px-4 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transform hover:scale-110 transition-all duration-200 shadow-lg">
                <GoArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-[calc(100%/3)] py-7 overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={isTransitioning}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-3xl text-orange-600 px-2 py-2 rounded-full hover:bg-gray-50 z-10 shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-xl"
        >
          <MdOutlineChevronLeft />
        </button>

        {/* Image Container */}
        <div
          ref={sliderRef}
          className="w-full h-[90%] flex gap-4 overflow-hidden scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[364px] h-full shrink-0 rounded-xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 ${
                mainImage === index
                  ? "ring-4 ring-orange-400 ring-opacity-60 scale-105"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {mainImage === index && (
                <div className="absolute inset-0 bg-orange-400 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                    <span className="text-orange-600 font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={isTransitioning}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-3xl text-orange-600 px-2 py-2 rounded-full hover:bg-gray-50 z-10 shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-xl"
        >
          <MdOutlineChevronRight />
        </button>

        {/* Dot Indicators */}
        <div className="mt-6 flex gap-3 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`group p-1 transition-all duration-200 ${
                mainImage === index ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  mainImage === index
                    ? "bg-orange-600 ring-2 ring-orange-200 ring-offset-2"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliceProduct;
