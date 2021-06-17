import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getAllMoviesByState } from '../../redux/actions/movieActions';
import { getMoviesSelector } from '../../redux/selectors/movieSelector';

function Movie() {
  const { state } = useParams();
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesByState({ state: state }));
  }, [dispatch, state]);

  if (state !== 'now-showing' && state !== 'coming-soon') {
    return <Redirect to="/movies/now-showing" />;
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {movies.map((movie, i) => {
          return (
            <div key={i} className="col">
              <div className="card shadow-sm">
                <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height={225}
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>{movie.title}</title>
                  <img src={movie.poster} width="100%" height="100%" alt="#" />
                </svg>
                <div className="card-body">
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{movie.running_time} mins</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movie;
