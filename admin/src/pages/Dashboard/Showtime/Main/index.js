import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesShowtimesSelector } from '../../../../redux/selectors/movieSelector';
import DataTable from './Tables/DataTable';
import { getAllMoviesShowtimes } from '../../../../redux/actions/movieActions';

function MainPage() {
  const movies = useSelector(getMoviesShowtimesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesShowtimes());
  }, [dispatch]);

  return <DataTable movies={movies} />;
}

export default MainPage;
