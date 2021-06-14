import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.scss';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { Image } from 'react-bootstrap';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function MovieSelection() {
  const movies = [
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/b/t/btdq_main_poster_1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/t/e/teaser_poster_1_1__1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/r/s/rsz_main_poster_cncc_1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/m/a/main-poster_ms1_1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster-the-last-warrior_1__1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/c/o/conan_24_-_main_poster_1__1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/b/o/boss_level_-_payoff_poster_1__1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/m/a/main_poster_mtb_1__1.jpg',
    'https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/m/a/main_poster_seobok_15_1.jpg',
  ];
  return (
    <div className="text-center mt-3">
      <img
        src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/h3_movie_selection.gif"
        alt="movie-selection"
      />
      <div className="container px-0 mt-3">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          slidesPerGroup={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}>
          {movies.map((movie, i) => (
            <SwiperSlide key={i}>
              <Image className="img-movie" src={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieSelection;
