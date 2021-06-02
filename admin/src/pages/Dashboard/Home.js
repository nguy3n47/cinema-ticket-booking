import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { getUserSelector } from '../../redux/selectors/authSelector';

function Home() {
  const currentUser = useSelector(getUserSelector);
  const dispatch = useDispatch();

  if (!currentUser) {
    return <Redirect to="/auth/login" />;
  }

  const onSubmitLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <h3>{currentUser.fullname}</h3>
      <Button onClick={onSubmitLogout} variant="link">
        Logout
      </Button>
    </div>
  );
}

export default Home;
