import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './Main';

function Home(props) {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default Home;
