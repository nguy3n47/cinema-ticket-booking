import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesSelector } from '../../../../redux/selectors/movieSelector';
import DataTable from './Tables/DataTable';
import { getAllMovies } from '../../../../redux/actions/movieActions';

function MainPage() {
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return <DataTable movies={movies} />;
}

export default MainPage;
