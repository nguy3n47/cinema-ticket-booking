import React from 'react';
import { useParams } from 'react-router';

function MovieDetail(props) {
  const { slug } = useParams();

  return <div>{slug}</div>;
}

export default MovieDetail;
