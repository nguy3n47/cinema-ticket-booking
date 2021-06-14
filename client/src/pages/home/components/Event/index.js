import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.scss';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { Image } from 'react-bootstrap';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Event() {
  const events = [
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/n/9/n95_240x201_1.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/h/a/happy-new-year-240x201_1.png',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/o/doreamon_web_app_240x201.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-crm-team-chi-1-duoc-2-240x201_1.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv_79k_240x201_170920.png',
  ];

  return (
    <div className="text-center mt-3">
      <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_event.gif" alt="event" />
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
          {events.map((event, i) => (
            <SwiperSlide key={i}>
              <Image className="img-event" src={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="container w-75 px-0 mt-3 d-flex justify-content-between">
        <div>
          <Image thumbnail src="https://www.cgv.vn/media/wysiwyg/packages/214x245.jpg" />
        </div>
        <div>
          <Image thumbnail src="https://www.cgv.vn/media/wysiwyg/2021/U22_WEB_496x247.jpg" />
        </div>
        <div>
          <Image
            thumbnail
            src="https://www.cgv.vn/media/wysiwyg/2021/CGV-DIGITAL-HALL-RENTAL-214x245.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Event;
