import React from 'react';
import { Image } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/core';
import './styles.scss';

SwiperCore.use([Autoplay, Pagination, Navigation, Keyboard]);

function Home() {
  const banners = [
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/x/e/xem_phim_web_980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-tarot-series-2-980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-digital-team-diy-980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-production-team-midnite-streetfood-980x448_3.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_1__10.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_18_.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/u/du_an_phim_ngan_cj.jpg',
    'https://www.cgv.vn/media/wysiwyg/2021/U22_WEB_496x247.jpg',
  ];

  return (
    <div className="content">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper">
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <Image src={banner}></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Home;
