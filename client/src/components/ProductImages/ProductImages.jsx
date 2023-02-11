import "./ProductImages.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useState } from "react";

export default function ProductImages() {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  return (
    <div className="product-images">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" /> */}
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/headphone.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
