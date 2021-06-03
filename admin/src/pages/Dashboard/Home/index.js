import React from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/selectors/authSelector';

function Home() {
  const currentUser = useSelector(getUserSelector);

  return (
    <div className="content">
      <h1>Home Page</h1>
      <h3>{currentUser.fullname}</h3>
    </div>
  );
}

export default Home;
