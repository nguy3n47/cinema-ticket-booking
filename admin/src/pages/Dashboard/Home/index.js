import React from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/selectors/authSelector';

function Home() {
  const currentUser = useSelector(getUserSelector);

  return (
    <div className="content">
      <h1 className="text-center mt-3">Home Page</h1>
      <h3 className="text-center mt-3">{currentUser.fullname}</h3>
    </div>
  );
}

export default Home;
