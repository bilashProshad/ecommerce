import "./Banner.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link to="/category/6429d5d646faac32270323b0">
            <img src="/images/women-fashion.png" alt="" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/6429d5c146faac32270323ac">
            <img src="/images/men-fashion.png" alt="" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/6429d5d646faac32270323b0">
            <img src="/images/women-fashion.png" alt="" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/6429d5e346faac32270323b4">
            <img src="/images/laptop.png" alt="" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
