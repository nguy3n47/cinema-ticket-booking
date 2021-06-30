import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.scss';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesSelector } from '../../../../redux/selectors/movieSelector';
import { getAllMoviesByStateAction } from '../../../../redux/actions/movieActions';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function MovieSelection() {
  const movies = useSelector(getMoviesSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMoviesByStateAction({ state: 'now-showing' }));

    return () => {
      dispatch({
        type: 'REMOVE_MOVIES',
      });
    };
  }, [dispatch]);

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
              <Link to={'/movies/detail/' + movie.slug}>
                <Image className="img-movie" src={movie.poster} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieSelection;
