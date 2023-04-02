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
          <Link to="/category/63f6348bbd7ac9c66172f73d">
            <img
              src="https://images.pexels.com/photos/14930425/pexels-photo-14930425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/63f6316ebd7ac9c66172f738">
            <img
              src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/63f7cb68c3cbb0526ab547ee">
            <img
              src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/63f7cc0cc3cbb0526ab547f5">
            <img
              src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
