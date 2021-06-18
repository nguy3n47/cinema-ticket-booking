import React from 'react';
import Banner from '../components/Banner';
import MovieSelection from '../components/MovieSelection';
import Event from '../components/Event';

function Main() {
  return (
    <main className="flex-shrink-0">
      <div className="container">
        <Banner />
        <MovieSelection />
        <Event />
      </div>
    </main>
  );
}

export default Main;
